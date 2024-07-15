"use client";
import { useUser } from "@clerk/nextjs";
import JobListing from "@/components/job-listing";
import { fetchProfile, fetchJobsRecruiter } from "@/actions";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id]);

  useEffect(() => {
    const loadJobs = async () => {
      if (profileInfo?.role === "recruiter") {
        const fetchedJobs = await fetchJobsRecruiter(user.id);
        setJobs(fetchedJobs?.data);
      }
    };

    loadJobs();
  }, [profileInfo]);

  console.log(jobs, "jobs");
  return <JobListing profileInfo={profileInfo} user={user} jobs={jobs} />;
}
