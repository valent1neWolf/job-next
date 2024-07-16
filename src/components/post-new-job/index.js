"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import CommonForm from "../common-form";
import "../component_style.css";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";

export default function PostNewJob({ profileInfo, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  useEffect(() => {
    setJobFormData((currentFormData) => ({
      ...currentFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    }));
  }, [profileInfo]);

  function handleJobFormValid() {
    return (
      jobFormData &&
      jobFormData.title.trim() !== "" &&
      jobFormData.location.trim() !== "" &&
      jobFormData.experience.trim() !== "" &&
      jobFormData.remote.trim() !== "" &&
      jobFormData.description.trim() !== "" &&
      jobFormData.type.trim() !== "" &&
      jobFormData.companyName.trim() !== ""
    );
  }

  async function createJobAction() {
    await postNewJobAction(
      { ...jobFormData, recruiterId: user?.id, applicants: [] },
      "/jobs"
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Create Job
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="max-h-full w-full md:max-w-[800px] md:max-h-[80vh] overflow-scroll pl-7">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new job listing.
            </DialogDescription>
            <div className="grid gap-4 py-2">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                formControls={postNewJobFormControls}
                setFormData={setJobFormData}
                isBtnDisabled={!handleJobFormValid()}
                action={createJobAction}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
