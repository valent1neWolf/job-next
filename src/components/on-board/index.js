"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";
import {
  recruiterOnBoardFormControls,
  initialRecruiterFormData,
  initialCandidateFormData,
  candidateOnBoardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";

export default function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const currenAuthUser = useUser();
  console.log("currenAuthUser", currenAuthUser);
  const { user } = currenAuthUser;

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  // console.log("recruiterFormData", recruiterFormData);
  // console.log("candidateFormData", candidateFormData);

  function handleRecruiterFormvalid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companySize.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== "" &&
      recruiterFormData.description.trim() !== ""
    );
  }

  async function createProfileAction() {
    const data = {
      recruiterInfo: recruiterFormData,
      role: "recruiter",
      isPremiumUser: false,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    };
    await createProfile(data, "/onboard");
  }

  function handleCandidateFormvalid() {
    return (
      candidateFormData &&
      candidateFormData.name.trim() !== "" &&
      candidateFormData.skills.trim() !== "" &&
      candidateFormData.country.trim() !== ""
    );
  }
  return (
    <div className="w-full">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight  text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnBoardFormControls}
            buttonText={"Onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            isBtnDisabled={!handleCandidateFormvalid()}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnBoardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormvalid()}
            action={createProfileAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
