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
import { useState } from "react";
import CommonForm from "../common-form";
import "../component_style.css";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
export default function PostNewJob() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState(initialPostNewJobFormData);

  function handleJobFormValid() {
    return (
      jobFormData &&
      jobFormData.title.trim() !== "" &&
      jobFormData.location.trim() !== "" &&
      jobFormData.description.trim() !== "" &&
      jobFormData.type.trim() !== "" &&
      jobFormData.companyName.trim() !== ""
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
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="max-h-full w-full md:max-w-[800px] md:max-h-[80vh] overflow-scroll pl-7">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new job listing.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                formControls={postNewJobFormControls}
                setFormData={setJobFormData}
                isBtnDisabled={!handleJobFormValid()}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
