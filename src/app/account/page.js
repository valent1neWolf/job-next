"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProfile } from "@/actions";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  candidateOnBoardFormControls,
  recruiterOnBoardFormControls,
  costumeRecruiterOnBoardFormControls,
} from "@/utils";
import { Label } from "@/components/ui/label";
import EditButton from "@/components/profile-edit";

export default function Page() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);

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

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Account</h1>
      <hr className="border-2 border-[#F1F5F9] rounded-r-lg" />
      <Tabs defaultValue="account" className=" mx-auto">
        <TabsList className="rounded-t-none">
          <TabsTrigger value="account">Personal</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
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
        <TabsContent value="applied">
          Jobs that you have applied for come here.
        </TabsContent>
        <TabsContent value="saved">Saved jobs come here.</TabsContent>
      </Tabs>
    </div>
  );
}
