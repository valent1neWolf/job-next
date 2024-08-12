"use client";
import {
  fetchSingleJob,
  fetchProfile,
  fetchApplicationsCandidate,
  fetchApplicationsRecruiter,
  createJobApplication,
  fetchSingleBookmark,
  bookmarkJobAction,
} from "@/actions";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [recruiterProfile, setRecruiterProfile] = useState(null);
  const [applicationList, setApplicationList] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [bookmark, setBookmark] = useState(null);
  const router = useRouter();

  //--------------------------------------------
  useEffect(() => {
    async function fetchData() {
      if (typeof user?.id !== "undefined") {
        const { data } = await fetchSingleJob(params.details);

        setJob(data);
      }
    }
    fetchData();
  }, [user?.id]);

  //--------------------------------------------
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id]);

  //--------------------------------------------
  //hogy a recruiternek az adatiat mindenképp megszerezzük
  useEffect(() => {
    async function fetchRecruiterProfile() {
      if (job && job.recruiterId) {
        const { data } = await fetchProfile(job.recruiterId);
        setRecruiterProfile(data);
      }
    }
    fetchRecruiterProfile();
  }, [job?.recruiterId]);

  // console.log(job, "job");
  // console.log(recruiterProfile, "recruiter data");

  //--------------------------------------------
  useEffect(() => {
    const loadApplications = async () => {
      if (profileInfo?.role === "candidate") {
        const result = await fetchApplicationsCandidate(user?.id);
        if (result.success) {
          setApplicationList(result.data);
        }
      } else if (profileInfo?.role === "recruiter") {
        const result = await fetchApplicationsRecruiter(user?.id);
        if (result.success) {
          setApplicationList(result.data);
        }
      }
    };

    loadApplications();
  }, [profileInfo]);

  //--------------------------------------------
  async function handleJobApply() {
    if (profileInfo && profileInfo.role == "candidate" && job.recruiterId) {
      const data = {
        name: profileInfo.candidateInfo.name,
        email: profileInfo.email,
        jobId: job._id,
        candidateUserId: profileInfo.userId,
        recruiterUserId: job.recruiterId,
        status: ["applied"],
        jobAppliedDate: new Date().toISOString(),
      };
      const result = await createJobApplication(data, `/jobs/${job._id}`);
      console.log(result);
    } else {
      console.log("data has not been loaded yet...");
    }
  }

  useEffect(() => {
    const loadBookmark = async () => {
      if (user?.id && job?._id) {
        const result = await fetchSingleBookmark(job._id, user?.id);
        if (result.success) {
          setBookmark(result.data);
        }
      }
    };

    loadBookmark();
  }, [job]);

  async function handleBookmarkAction(job) {
    // console.log("bookmarking job", job);
    if (profileInfo?.role === "candidate") {
      const existingBookmark =
        bookmark?.jobId === job?._id && bookmark?.candidateUserId === user?.id;
      // console.log("existingBookmark", existingBookmark);

      if (!existingBookmark) {
        const data = {
          name: profileInfo.candidateInfo.name,
          email: profileInfo.email,
          candidateUserId: user?.id || profileInfo.userId,
          jobId: job._id,
          jobSaveDate: new Date().toISOString(),
        };

        const result = await bookmarkJobAction(data);
        if (result.success) {
          setBookmark(result.data);
        }
      }
    }
  }

  //--------------------------------------------
  return (
    <div className="grid grid-cols-1 gap-x-3 md:grid-cols-4">
      <div className="col-span-4 md:col-span-3">
        <div className="bg-gray-100 rounded-md border border-gray-300 p-4">
          <h1 className="text-3xl font-semibold  mb-2">{job?.title}</h1>
          <p>
            {job?.remote} · {job?.type} ·{" "}
            {job?.recruiterId ? (
              job?.applicants > 1 ? (
                `${job?.applicants} people have applied`
              ) : job?.applicants === 1 ? (
                <span className="text-green-700">1 person has applied</span>
              ) : (
                <span className="text-green-700">
                  Be the first one to apply
                </span>
              )
            ) : null}
          </p>
          <p className="flex items-center pt-1 text-lg">
            <img src="/building.svg" alt="building-svg" className="mr-2 w-5" />
            {job?.companyName}
          </p>
          <p className="flex items-center pt-1 text-lg">
            <img src="/location.svg" alt="location-svg" className="mr-2 w-5" />
            {job?.location}
          </p>
          <p className="flex items-center pt-1 text-lg">
            <img src="/people.svg" alt="people-svg" className="mr-2 w-5" />
            {recruiterProfile?.recruiterInfo?.companySize} employees work here
          </p>
          {profileInfo?.role === "candidate" ? (
            <div>
              <Button
                className="bg-blue-700 text-lg   rounded-xl py-1 mt-4 px-5 hover:bg-blue-600 mr-3"
                onClick={handleJobApply}
                disabled={
                  applicationList.findIndex((app) => app.jobId === job?._id) !==
                  -1
                    ? true
                    : false
                }
              >
                Apply
              </Button>
              <Button
                className="disabled:opacity-65 bg-white text-lg border border-blue-700 text-blue-700 rounded-xl py-1 mt-4 px-5 hover:bg-blue-100"
                onClick={() => handleBookmarkAction(job)}
                disabled={
                  bookmark?.jobId === job?._id &&
                  bookmark?.candidateUserId === user?.id
                    ? true
                    : false
                }
              >
                Save
              </Button>
            </div>
          ) : null}
        </div>
        <div className="bg-gray-100 rounded-md border border-gray-300 p-4 mt-4">
          <h1 className="text-xl font-semibold mt-6">About the company</h1>
          <p className="mt-2">{recruiterProfile?.recruiterInfo?.description}</p>
          <h1 className="text-xl font-semibold mt-6">Job Description</h1>
          <p className="mt-2">{job?.description}</p>
          {job && job.skills && (
            <>
              <h1 className="text-xl font-semibold mt-6">What you will need</h1>
              <p className="mt-2">{job?.skills}</p>
            </>
          )}
          {job && job.weOffer && (
            <>
              <h1 className="text-xl font-semibold mt-6">What we offer</h1>
              <p className="mt-2">{job?.weOffer}</p>
            </>
          )}
        </div>
      </div>
      <div className="hidden md:col-span-1 md:block">
        <div className="bg-gray-100 rounded-md border border-gray-300 px-4 pt-4 pb-2 flex flex-col">
          <p className="font-semibold mb-1">Job search based on your profile</p>
          <p className="text-justify lg:text-start">
            With Premium you can get access to jobs that match your profile.
            This is a great way to get a job that you would love.
          </p>
          <Button
            className="bg-yellow-400 text-lg  text-black rounded-2xl py-6 mt-4 px-5 border border-yellow-500  hover:bg-yellow-500"
            onClick={() => {
              router.push("/membership");
            }}
          >
            <span className="hidden lg:inline">Upgrade to </span>&#8203; Premium
          </Button>
          <p className="mt-3 text-xs ">Try 7 day free trial</p>
        </div>
      </div>
    </div>
  );
}
