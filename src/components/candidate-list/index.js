"use client";

import { Fragment, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCandidateDetailsByIDAction } from "@/actions";
import { Label } from "@/components/ui/label";

export default function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  applicationList,
  showCurrentCandidateDetails,
  setShowCurrentCandidateDetails,
  job,
}) {
  //   console.log("Rendering CandidateList for job:", job?.title);
  //------------------------------------------
  async function handleFetchCandidateDetails(candidateId) {
    const result = await getCandidateDetailsByIDAction(candidateId);
    if (result.success) {
      setCurrentCandidateDetails(result.data);
    }
  }
  //------------------------------------------
  useEffect(() => {
    if (currentCandidateDetails) {
      console.log(currentCandidateDetails, "currentCandidateDetails");
    }
  }, [currentCandidateDetails]);

  useEffect(() => {
    if (!showCurrentCandidateDetails) {
      setCurrentCandidateDetails(null);
    }
  }, [showCurrentCandidateDetails]);
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 py-3 md:grid-cols-2 lg:grid-cols-3">
        {applicationList && applicationList.length > 0 ? (
          applicationList.map((application) => {
            return (
              <div
                className="bg-white shadow-lg w-full max-w-xl rounded-lg overflow-hidden mx-auto mt-4 border-[1px] border-gray-200"
                key={application?._id}
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold pr-2">
                    {application?.name}
                  </h3>
                  <Button
                    onClick={() => {
                      setShowCurrentCandidateDetails(true);
                      handleFetchCandidateDetails(application?.candidateUserId);
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No applications found.</p>
        )}
      </div>
      <Dialog
        open={showCurrentCandidateDetails}
        onOpenChange={setShowCurrentCandidateDetails}
      >
        <DialogContent className="max-h-[70vh] overflow-scroll w-5/6 md:w-full">
          <DialogHeader>
            <DialogTitle>
              {currentCandidateDetails?.candidateInfo?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-3">
            <Label htmlFor="email" className="font-semibold ">
              Email
            </Label>
            <p id="email">{currentCandidateDetails?.email || "N/A"}</p>
          </div>
          <div className="mt-3">
            <Label htmlFor="country" className="font-semibold ">
              Country
            </Label>
            <p id="country">
              {currentCandidateDetails?.candidateInfo?.country || "N/A"}
            </p>
          </div>
          <div className="mt-3">
            <Label htmlFor="skills" className="font-semibold ">
              Skills
            </Label>
            <div id="skills" className="flex  items-center mt-2">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <div
                    className="p-2 bg-gray-800 w-max mr-2 rounded-sm "
                    key={skillItem}
                  >
                    <span className="text-white">{skillItem}</span>
                  </div>
                )) || "N/A"}
            </div>
          </div>
          <div className="">
            <Label htmlFor="resume" className="font-semibold ">
              Resume
            </Label>
            <p id="resume">
              {currentCandidateDetails?.candidateInfo?.resume || "N/A"}
            </p>
          </div>
          <div className="mt-3">
            <Label htmlFor="phone" className="font-semibold ">
              Phone Number
            </Label>
            <p id="phone">
              {currentCandidateDetails?.candidateInfo?.phone || "N/A"}
            </p>
          </div>
          <div className="mt-3">
            <Label htmlFor="salary" className="font-semibold ">
              Expected Salary
            </Label>
            <p id="salary">
              {currentCandidateDetails?.candidateInfo?.salary || "N/A"}
            </p>
          </div>
          <div className="mt-3">
            <Label htmlFor="letter" className="font-semibold ">
              Expected Salary
            </Label>
            <p id="letter">
              {currentCandidateDetails?.candidateInfo?.coverLetter || "N/A"}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button className="bg-trasnsparent border-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md font-semibold">
              Reject
            </Button>
            <Button className="bg-trasnsparent border-2 text-green-600 border-green-600 hover:bg-green-600 hover:text-white hover:shadow-md font-semibold">
              Select
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
