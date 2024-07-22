"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  recruiterOnBoardFormControls,
  initialRecruiterFormData,
  initialCandidateFormData,
  candidateOnBoardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default function OnBoard({ setLoading }) {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log("candidateFormData", candidateFormData);
  }, [candidateFormData]);

  const currenAuthUser = useUser();
  console.log("currenAuthUser", currenAuthUser);
  const { user } = currenAuthUser;
  console.log("user_email", user?.primaryEmailAddress?.emailAddress);
  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUploadedPdfToSupabase() {
    // URL-encode the file name to handle special characters

    const { data, error } = await supabaseClient.storage
      .from("job-board") // bucket name
      .upload(`public/${user?.primaryEmailAddress?.emailAddress}`, file, {
        cacheControl: "3600", // 1 hour
        upsert: true, // Update the file if it already exists
      });

    console.log(data, error);

    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  useEffect(() => {
    if (file) {
      console.log("file", file);
      handleUploadedPdfToSupabase();
    }
  }, [file]);
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
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfile(data, "/onboard");
    await setLoading(true);
  }

  function handleCandidateFormvalid() {
    return (
      candidateFormData &&
      candidateFormData.name.trim() !== "" &&
      candidateFormData.skills.trim() !== "" &&
      candidateFormData.country.trim() !== "" &&
      candidateFormData.phone.trim() !== "" &&
      candidateFormData.resume.trim() !== ""
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
            handleFileChange={handleFileChange}
            action={createProfileAction}
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
