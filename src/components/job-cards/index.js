"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJob, bookmarkJobAction, deleteBookmark } from "@/actions";
import { useRouter } from "next/navigation";
import JobAplicants from "../job-aplicants";
import { handleCreationTime, capitalize } from "@/utils";

export default function JobCards({
  jobs,
  hovered,
  setHovered,
  isLoading,
  setIsLoading,
  choosenFilters,
  user,
  jobToDelete,
  setJobToDelete,
  setJobs,
  profileInfo,
  applicationList,
  drawerHeight,
  bookmarkList,
  setBookmarkList,
  jobToBookmark,
  setJobToBookmark,
}) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [showCurrentCandidateDetails, setShowCurrentCandidateDetails] =
    useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null); //pluszba még létre kell hozni egy state-et, ami tárolja a kiválasztott álláshirdetés ID-jét, hogy csak annak az értékét küldje tovább amire a felasznló rákattintott
  const router = useRouter();
  //----------------------------------------------------------
  useEffect(() => {
    setIsLoading(false);
  }, [jobs]);
  // console.log(user, "user");
  // console.log(bookmarkList, "bookmarkList in job-cards");
  //----------------------------------------------------------
  const noJobsFound = choosenFilters.some((filter) => filter.content.length);
  // console.log(noJobsFound, "noJobsFound");
  //----------------------------------------------------------

  //----------------------------------------------------------

  async function deleteJobAction(id) {
    console.log("deleting job", id);
    await deleteJob(id);
    // lehet, hogy ezt nem szabadna csinálni, de legalább látszatra megoldja a problémát (más megoldás nem jut eszembe)
    setJobs((currentJobs) => currentJobs.filter((job) => job._id !== id));
  }
  //----------------------------------------------------------
  async function handleBookmarkAction(job) {
    console.log("bookmarking job", job);
    if (profileInfo?.role === "candidate") {
      const candidateUserId = user.id || profileInfo.userId;
      const existingBookmark = bookmarkList.find(
        (bookmark) =>
          bookmark.jobId === job._id &&
          bookmark.candidateUserId === candidateUserId
      );
      console.log("existingBookmark", existingBookmark);
      if (existingBookmark) {
        const result = await deleteBookmark(existingBookmark._id);
        if (result.success) {
          setBookmarkList((currentBookmarks) =>
            currentBookmarks.filter((bookmark) => bookmark.jobId !== job._id)
          );
        }
      } else {
        console.log("User object:", user); // Log user object
        console.log("Profile Info:", profileInfo); // Log profile info

        const data = {
          name: profileInfo.candidateInfo.name,
          email: profileInfo.email,
          candidateUserId,
          jobId: job._id,
          jobSaveDate: new Date().toISOString(),
        };

        console.log("Data to be sent:", data); // Log data object

        const result = await bookmarkJobAction(data);
        if (result.success) {
          setBookmarkList((currentBookmarks) => [
            ...currentBookmarks,
            result.data,
          ]);
        }
        console.log("Result from bookmarkJobAction:", result); // Log result
      }
    }
  }
  return (
    <div className={`${isLoading ? "hidden" : ""}`}>
      {jobs && jobs.length > 0 && !isLoading ? (
        jobs.map((job) => (
          <div
            key={job?._id}
            className="bg-gray-100 p-2 rounded-md mt-3 relative"
          >
            {user?.id === job.recruiterId && (
              <div className="absolute top-0 right-0 p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-12">
                    <DropdownMenuItem
                      onClick={() => {
                        deleteJobAction(job._id);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <div>
              <h1 className=" font-bold  text-xl">{capitalize(job?.title)}</h1>
              <p className="flex items-center pt-1">
                <img src="/building.svg" alt="building-svg" className="mr-2" />
                {job?.companyName}
              </p>
              <p className="flex items-center pt-1">
                <img src="/location.svg" alt="location-svg" className="mr-2" />
                {job?.location}
              </p>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    className="mt-2 px-4"
                    onClick={() => window.open(`/jobs/${job._id}`)}
                  >
                    View <span className="hidden md:inline">&#8203; Job</span>
                  </Button>
                  {profileInfo?.role === "candidate" && (
                    <Button
                      className={`mt-2 bg-transparent border border-black ${
                        bookmarkList.find((item) => item.jobId === job?._id)
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                      onMouseEnter={() => setHovered(job._id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleBookmarkAction(job)}
                    >
                      {hovered === job?._id ||
                      bookmarkList.find((item) => item.jobId === job?._id) ? (
                        <img src="/saved.svg" alt="bookmarked" />
                      ) : (
                        <img src="/not-saved.svg" alt="not bookmark" />
                      )}
                    </Button>
                  )}
                  {job?.recruiterId === user?.id && (
                    <Button
                      onClick={() => {
                        setShowApplicantsDrawer(true);
                        setSelectedJobId(job._id); // kattintásnál beállítjuk a kiválasztott álláshirdetés ID-jét
                      }}
                      className="mt-2 px-4 bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-gray-200 max-w-40"
                      disabled={
                        applicationList.filter((app) => app.jobId === job?._id)
                          .length === 0
                      }
                    >
                      {applicationList.filter((app) => app.jobId === job?._id)
                        .length > 0 ? (
                        <p>
                          <span className="hidden md:inline">View </span>
                          {
                            applicationList.filter(
                              (app) => app.jobId === job?._id
                            ).length
                          }{" "}
                          applicants
                        </p>
                      ) : (
                        <p>
                          {" "}
                          No applicants{" "}
                          <span className="hidden md:inline">yet</span>
                        </p>
                      )}
                    </Button>
                  )}
                </div>
                <div>
                  <p className="text-sm ">
                    {handleCreationTime(job?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            {showApplicantsDrawer && selectedJobId === job._id && (
              <JobAplicants
                showApplicantsDrawer={showApplicantsDrawer}
                setShowApplicantsDrawer={setShowApplicantsDrawer}
                showCurrentCandidateDetails={showCurrentCandidateDetails}
                setShowCurrentCandidateDetails={setShowCurrentCandidateDetails}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                job={job}
                drawerHeight={drawerHeight}
                applicationList={applicationList.filter(
                  (app) => app.jobId === job._id
                )}
              />
            )}
          </div>
        ))
      ) : noJobsFound ? (
        <div className="text-center mt-4">
          <p>No jobs found</p>
        </div>
      ) : null}
    </div>
  );
}
