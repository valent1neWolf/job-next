"use client";
import { useUser } from "@clerk/nextjs";
import JobListing from "@/components/job-listing";
import {
  fetchProfile,
  fetchJobsRecruiter,
  fetchJobsCandidate,
  fetchApplicationsCandidate,
  fetchApplicationsRecruiter,
  fetchBookmarks,
} from "@/actions";
import { useEffect, useState, useMemo } from "react";
import { defaultJobAccordionFilters } from "@/utils";
import React, { useRef } from "react";

export default function JobsPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [choosenFilters, setChoosenFilters] = useState(
    defaultJobAccordionFilters.map((filter) => ({
      trigger: filter.trigger,
      name: filter.name,
      content: [],
    }))
  );
  const [bookmarkList, setBookmarkList] = useState([]);
  const [jobToBookmark, setJobToBookmark] = useState(null);
  console.log(bookmarkList, "bookmarkList");
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

    const loadApplications = async () => {
      if (profileInfo?.role === "candidate") {
        const result = await fetchApplicationsCandidate(user?.id);
        if (result.success) {
          setApplicationList(result.data);
        }
      } else if (profileInfo?.role === "recruiter") {
        const result = await fetchApplicationsRecruiter(user?.id);
        if (result.success) {
          setApplicationList(result.data);
        }
      }
    };

    const loadBookmarkList = async () => {
      if (user?.id) {
        const result = await fetchBookmarks(user?.id);
        if (result.success) {
          console.log(result.message, "result.message");
          setBookmarkList(result.data);
        }
      }
    };

    loadJobs();
    loadApplications();
    loadBookmarkList();
  }, [profileInfo, memoizedChoosenFilters]);

  // console.log(jobs, "jobs");

  //--------------------------------------------
  return (
    <JobListing
      profileInfo={profileInfo}
      user={user}
      jobs={jobs}
      choosenFilters={choosenFilters}
      setChoosenFilters={setChoosenFilters}
      setJobs={setJobs}
      applicationList={applicationList}
      bookmarkList={bookmarkList}
      setBookmarkList={setBookmarkList}
      jobToBookmark={jobToBookmark}
      setJobToBookmark={setJobToBookmark}
    />
  );
}
