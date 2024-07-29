"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "../component_style.css";
import CommonForm from "@/components/common-form";
import { editProfileInfo } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditButton({ profileInfo, user, formControls }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    profileInfo.role === "candidate"
      ? profileInfo.candidateInfo
      : profileInfo.role === "recruiter"
      ? profileInfo.recruiterInfo
      : null
  );
  const [file, setFile] = useState(null);

  //--------------------------------------------
  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUploadedPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("job-board-public") // bucket name
      .upload(`public/${user?.primaryEmailAddress?.emailAddress}`, file, {
        cacheControl: "3600", // 1 hour
        upsert: true, // Update the file if it already exists
      });

    console.log(data, error);

    if (data) {
      setFormData({
        ...formData,
        resume: data.path,
      });
    }
  }
  //--------------------------------------------
  useEffect(() => {
    if (file) {
      console.log("file", file);
      handleUploadedPdfToSupabase();
    }
  }, [file]);

  //--------------------------------------------
  async function updateProfileAction() {
    const data =
      profileInfo.role === "candidate"
        ? {
            candidateInfo: formData,
          }
        : profileInfo.role === "recruiter"
        ? {
            recruiterInfo: formData,
          }
        : null;
    const result = await editProfileInfo(profileInfo._id, data);
    if (result.success) {
      redirect("/account");
    }
  }
  //--------------------------------------------

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <img
        src="/edit.svg"
        alt="edit button"
        className=" rounded-sm p-0.5 hover:bg-gray-200"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-full w-full md:max-w-[800px] md:max-h-[80vh] overflow-scroll pl-7">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <CommonForm
              formControls={formControls}
              buttonText={"Apply changes"}
              formData={formData}
              setFormData={setFormData}
              handleFileChange={handleFileChange}
              action={updateProfileAction}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
