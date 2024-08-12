"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { redirect } from "next/navigation";
import Link from "next/link";

export default function PostNewJob({ profileInfo, user, jobsCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  const { toast } = useToast();

  useEffect(() => {
    setJobFormData((currentFormData) => ({
      ...currentFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    }));
  }, [profileInfo]);

  function handleAddNewJob() {
    if (!profileInfo?.isPremiumUser && jobsCount >= 5) {
      toast({
        variant: "destructive",
        title: "On the free plan you can only 5 active jobs. ",
        description: "Upgrade to premium to post more jobs.",
      });
    } else {
      setIsOpen(true);
    }
  }

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
    const { success, message } = await postNewJobAction(
      { ...jobFormData, recruiterId: user?.id, applicants: [] }
      // "/jobs"
    );
    redirect("/jobs");
  }

  return (
    <>
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 flex h-11 items-center bg-transparent rounded-full hover:bg-transparent justify-center p-2 ml-2 md:bg-black md:text-white md:rounded-md md:shadow-md md:font-semibold md:py-2 md:px-4 md:mt-0 md:ml-4 md:hover:bg-gray-800"
      >
        <span className="md:block hidden">Create Job</span>
        <img className="md:hidden block w-6" src="/plus.svg" />
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
