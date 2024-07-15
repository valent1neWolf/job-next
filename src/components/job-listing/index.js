"use client";
import PostNewJob from "../post-new-job";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JobListing({ profileInfo, user, jobs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    setIsLoading(false);
  }, [jobs]);

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

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
            {profileInfo?.role === "candidate" ? (
              <p>Filter</p>
            ) : (
              <PostNewJob profileInfo={profileInfo} user={user} />
            )}
          </div>
        </div>
        <>
          {isLoading && (
            <div className="space-y-2 pt-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}{" "}
          <div className={`${isLoading ? "hidden" : ""}`}>
            {jobs.map((job) => (
              <div
                key={job?._id}
                className="bg-gray-100 p-2 rounded-md mt-3 relative"
              >
                <div className="absolute top-0 right-0 p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-12">
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <h1 className="lg:text-2xl font-bold  text-4xl">
                    {capitalize(job?.title)}
                  </h1>
                  <p>{job?.companyName}</p>
                  <div className="flex items-center gap-3">
                    <Button className="mt-2">View Job</Button>
                    <Button
                      className="mt-2 bg-transparent border border-black"
                      onMouseEnter={() => setHovered(job._id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {hovered === job?._id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="text-black "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}
