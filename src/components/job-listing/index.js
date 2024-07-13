"use client";
import PostNewJob from "../post-new-job";

export default function JobListing({ profileInfo, user }) {
  //   console.log("jobs profile:", profileInfo);
  //   console.log("jobs user:", user);
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Jobs for you"
              : "Jobs Dashboard "}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "candidate" ? <p>Filter</p> : <PostNewJob />}
          </div>
        </div>
        <div>Job List</div>
      </div>
    </div>
  );
}
