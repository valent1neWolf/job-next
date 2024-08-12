"use client";

import JobListing from "@/components/job-listing";
import {
  fetchJobsRecruiter,
  fetchJobsCandidate,
  fetchApplicationsCandidate,
  fetchApplicationsRecruiter,
  fetchBookmarks,
  fetchRecruiterJobCount,
} from "@/actions";
import { useEffect, useState, useMemo } from "react";
import { defaultJobAccordionFilters, LoadingSpinner } from "@/utils";
import React, { useRef } from "react";

export default function Jobs({ profileInfo, user }) {
  const [jobs, setJobs] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [applicationList, setApplicationList] = useState([]);
  const [choosenFilters, setChoosenFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFilters = sessionStorage.getItem("choosenFilters");
      return savedFilters
        ? JSON.parse(savedFilters)
        : defaultJobAccordionFilters.map((filter) => ({
            trigger: filter.trigger,
            name: filter.name,
            content: [],
          }));
    } else {
      return defaultJobAccordionFilters.map((filter) => ({
        trigger: filter.trigger,
        name: filter.name,
        content: [],
      }));
    }
  });
  const [bookmarkList, setBookmarkList] = useState([]);
  const [jobToBookmark, setJobToBookmark] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  //--------------------------------------------

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
        const fetchedJobsCount = await fetchRecruiterJobCount(user?.id);
        setJobs(fetchedJobs?.data.reverse());
        setJobsCount(fetchedJobsCount?.data);
      } else if (profileInfo?.role === "candidate") {
        const fetchedJobs = await fetchJobsCandidate(memoizedChoosenFilters);
        setJobs(fetchedJobs?.data.reverse());
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

  //--------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("choosenFilters", JSON.stringify(choosenFilters));
    }
  }, [choosenFilters]);

  //--------------------------------------------
  if (!isClient) {
    return (
      <div className="w-500px h-500px flex justify-center items-center">
        <LoadingSpinner className="text-gray-200 text-2xl" />
      </div>
    );
  }

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
      jobsCount={jobsCount}
      setJobsCount={setJobsCount}
    />
  );
}
