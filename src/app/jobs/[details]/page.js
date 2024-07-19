"use client";
import { fetchSingleJob, fetchProfile } from "@/actions";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function Page({ params }) {
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [recruiterProfile, setRecruiterProfile] = useState(null);
  useEffect(() => {
    async function fetchData() {
      if (typeof user?.id !== "undefined") {
        const { data } = await fetchSingleJob(params.details);

        setJob(data);
      }
    }
    fetchData();
  }, [user?.id]);

  useEffect(() => {
    async function fetchRecruiterProfile() {
      if (job && job.recruiterId) {
        const { data } = await fetchProfile(job.recruiterId);
        setRecruiterProfile(data);
      }
    }
    fetchRecruiterProfile();
  }, [job?.recruiterId]);

  console.log(job, "job");
  console.log(recruiterProfile, "recruiter data");

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
          <div>
            <Button className="bg-blue-700 text-lg   rounded-3xl py-1 mt-4 px-5 hover:bg-blue-600 mr-3">
              Apply
            </Button>
            <Button className="bg-white text-lg border border-blue-700 text-blue-700 rounded-3xl py-1 mt-4 px-5 hover:bg-blue-100">
              Save
            </Button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md border border-gray-300 p-4 mt-4">
          <h1 className="text-2xl font-semibold mt-6">Job Description</h1>
          <p className="mt-2">{job?.description}</p>
        </div>
      </div>
      <div className="hidden md:col-span-1 md:block">
        <div className="bg-gray-100 rounded-md border border-gray-300 px-4 pt-4 pb-2 flex flex-col">
          <p className="font-semibold">Job search based on your profile</p>
          <p>
            With Premium you can get access to jobs that match your profile.
            This is a great way to get a job that you would love.
          </p>
          <Button className="bg-yellow-400 text-lg  text-black rounded-2xl py-6 mt-4 px-5 border border-yellow-500  hover:bg-yellow-500">
            <span className="hidden lg:inline">Upgrade to </span>&#8203; Premium
          </Button>
          <p className="mt-3 text-xs">Try 7 day free trial</p>
        </div>
      </div>
    </div>
  );
}
