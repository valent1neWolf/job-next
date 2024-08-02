"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchProfile,
  fetchBookmarks,
  fetchBookmarkedJobs,
  deleteBookmark,
} from "@/actions";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  candidateOnBoardFormControls,
  recruiterOnBoardFormControls,
  costumeRecruiterOnBoardFormControls,
} from "@/utils";
import { Label } from "@/components/ui/label";
import EditButton from "@/components/profile-edit";
import { Button } from "@/components/ui/button";
import { handleCreationTime, capitalize } from "@/utils";

export default function Page() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  //--------------------------------------------
  useEffect(() => {
    const loadProfile = async () => {
      // Only proceed if user.id is truthy and profileInfo is not already set or needs update
      if (user?.id && (!profileInfo || profileInfo.userId !== user.id)) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id, profileInfo]);
  console.log("profileInfo", profileInfo);
  console.log("user", user);
  console.log("bookmarkList", bookmarkList);
  //--------------------------------------------
  function changeProlifePicture() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    // Ideiglenesen hozzáadjuk a file inputot a DOM-hoz, hogy a felhasználó kiválaszthassa a képet
    document.body.appendChild(fileInput);

    fileInput.onchange = function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64Image = e.target.result;

          user.setProfileImage({
            file: base64Image,
          });

          document.body.removeChild(fileInput);
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  }
  //--------------------------------------------
  useEffect(() => {
    if (profileInfo?.role === "candidate" && user.id) {
      const loadBookmarkList = async () => {
        const fetchedBookmarkList = await fetchBookmarks(user.id);
        setBookmarkList(fetchedBookmarkList?.data);
      };

      loadBookmarkList();
    }
  }, [profileInfo]);
  //--------------------------------------------
  useEffect(() => {
    const loadBookmarkedJobs = async () => {
      console.log("bookmarkList in the jobs", bookmarkList);
      const data = bookmarkList.map((bookmark) => bookmark.jobId);
      console.log("data", data);
      const fetchedBookmarkedJobs = await fetchBookmarkedJobs(data);
      setBookmarkedJobs(fetchedBookmarkedJobs?.data);
    };
    loadBookmarkedJobs();
  }, [bookmarkList]);
  console.log("bookmarkedJobs", bookmarkedJobs);
  //--------------------------------------------
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
      }
    }
  }
  //--------------------------------------------
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Account</h1>
      <hr className="border-2 border-[#F1F5F9] rounded-r-lg" />
      <Tabs defaultValue="account" className=" mx-auto">
        <TabsList className="rounded-t-none">
          <TabsTrigger value="account">Personal</TabsTrigger>
          {
            // Only show tabs if user is a candidate
            profileInfo?.role === "candidate" && (
              <>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </>
            )
          }
        </TabsList>

        <TabsContent value="account" className="mt-5 ml-1">
          <div className="flex items-start justify-center md:justify-start">
            <img
              src={user?.imageUrl}
              className="rounded-full mb-5 w-40 h-40  md:w-52 md:h-52  object-fill  "
              style={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)" }}
            />
            <img
              src="/edit.svg"
              alt="edit button"
              className=" rounded-sm p-0.5 hover:bg-gray-100"
              onClick={() => changeProlifePicture()}
            />
          </div>
          {profileInfo?.role === "candidate" ? (
            <div className="my-3 px-3 py-2 rounded-md bg-[#F1F5F9] shadow-sm md:w-3/4 ">
              <div className="flex justify-between items-start">
                <Label
                  htmlFor="email"
                  className="text-xl font-semibold text-gray-800"
                >
                  Email
                </Label>
                <EditButton
                  profileInfo={profileInfo}
                  user={user}
                  formControls={candidateOnBoardFormControls}
                />
              </div>
              <p id="email" className="text-md text-gray-600">
                {user?.primaryEmailAddress?.emailAddress}
              </p>

              <hr className="border-[1px] border-gray-300 my-2" />
              {candidateOnBoardFormControls.map((control, index) => (
                <div key={control.name}>
                  <Label
                    key={control.name}
                    htmlFor={control.name}
                    className="text-xl font-semibold text-gray-800"
                  >
                    {control.label}
                  </Label>

                  <p id={control.name} className="text-md text-gray-600">
                    {profileInfo?.candidateInfo[control.name] || "None"}
                  </p>
                  {index !== candidateOnBoardFormControls.length - 1 ? (
                    <hr className="border-[1px] border-gray-300 my-2" />
                  ) : null}
                </div>
              ))}
            </div>
          ) : profileInfo?.role === "recruiter" ? (
            <div className="my-3 px-3 py-2 rounded-md bg-[#F1F5F9] shadow-sm md:w-3/4 ">
              <div className="flex justify-between items-start">
                <Label
                  htmlFor="email"
                  className="text-xl font-semibold text-gray-800"
                >
                  Email
                </Label>
                <EditButton
                  profileInfo={profileInfo}
                  user={user}
                  formControls={costumeRecruiterOnBoardFormControls}
                />
              </div>
              <p id="email" className="text-md text-gray-600">
                {user?.primaryEmailAddress?.emailAddress}
              </p>

              <hr className="border-[1px] border-gray-300 my-2" />
              {recruiterOnBoardFormControls.map((control, index) => (
                <div key={control.name}>
                  <Label
                    key={control.name}
                    htmlFor={control.name}
                    className="text-xl font-semibold text-gray-800"
                  >
                    {control.label}
                  </Label>

                  <p id={control.name} className="text-md text-gray-600">
                    {profileInfo?.recruiterInfo[control.name] || "None"}
                  </p>
                  {index !== recruiterOnBoardFormControls.length - 1 ? (
                    <hr className="border-[1px] border-gray-300 my-2" />
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </TabsContent>
        {
          // Only show tabs if user is a candidate
          profileInfo?.role === "candidate" && (
            <TabsContent value="applied">
              Jobs that you have applied for come here.
            </TabsContent>
          )
        }
        {
          // Only show tabs if user is a candidate
          profileInfo?.role === "candidate" && (
            <TabsContent value="saved">
              {bookmarkedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gray-100 p-2 rounded-md mt-3 relative"
                >
                  <h1 className="font-bold text-xl">
                    {capitalize(job?.title)}
                  </h1>
                  <p className="flex items-center pt-1">
                    <img
                      src="/building.svg"
                      alt="building-svg"
                      className="mr-2"
                    />
                    {job?.companyName}
                  </p>
                  <p className="flex items-center pt-1">
                    <img
                      src="/location.svg"
                      alt="location-svg"
                      className="mr-2"
                    />
                    {job?.location}
                  </p>
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        className="mt-2 px-4"
                        onClick={() => window.open(`/jobs/${job._id}`)}
                      >
                        View{" "}
                        <span className="hidden md:inline">&#8203; Job</span>
                      </Button>
                      <Button
                        className={`mt-2 bg-transparent border border-black ${
                          bookmarkList.find((item) => item.jobId === job?._id)
                            ? "bg-black"
                            : "bg-transparent"
                        }`}
                        onClick={() => handleBookmarkAction(job)}
                      >
                        {bookmarkList.find(
                          (item) => item.jobId === job?._id
                        ) ? (
                          <img src="/saved.svg" alt="bookmarked" />
                        ) : (
                          <img src="/not-saved.svg" alt="not bookmark" />
                        )}
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm ">
                        {handleCreationTime(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          )
        }
      </Tabs>
    </div>
  );
}
