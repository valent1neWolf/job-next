"use client";
import { useUser } from "@clerk/nextjs";
import JobListing from "@/components/job-listing";
import {
  fetchProfile,
  fetchJobsRecruiter,
  fetchJobsCandidate,
} from "@/actions";
import { useEffect, useState, useMemo } from "react";
import { defaultJobAccordionFilters } from "@/utils";
import React, { useRef } from "react";

export default function JobsPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [choosenFilters, setChoosenFilters] = useState(
    defaultJobAccordionFilters.map((filter) => ({
      trigger: filter.trigger,
      name: filter.name,
      content: [],
    }))
  );

  //--------------------------------------------
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id]);

  //--------------------------------------------
  const memoizedChoosenFilters = useMemo(
    () => choosenFilters,
    [JSON.stringify(choosenFilters)]
  );

  //--------------------------------------------
  useEffect(() => {
    const loadJobs = async () => {
      if (profileInfo?.role === "recruiter") {
        const fetchedJobs = await fetchJobsRecruiter(
          user?.id,
          memoizedChoosenFilters
        );
        setJobs(fetchedJobs?.data);
      } else if (profileInfo?.role === "candidate") {
        const fetchedJobs = await fetchJobsCandidate(memoizedChoosenFilters);
        setJobs(fetchedJobs?.data);
      }
    };

    loadJobs();
  }, [profileInfo, memoizedChoosenFilters]);

  console.log(jobs, "jobs");

  //--------------------------------------------
  return (
    <JobListing
      profileInfo={profileInfo}
      user={user}
      jobs={jobs}
      choosenFilters={choosenFilters}
      setChoosenFilters={setChoosenFilters}
      setJobs={setJobs}
    />
  );
}
