"use client";
import PostNewJob from "../post-new-job";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import JobCards from "../job-cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { jobAccordionFilters } from "@/utils";

export default function JobListing({ profileInfo, user, jobs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [openedFilters, setOpenedFilters] = useState([]);

  const handleAccordionTrigger = (trigger) => {
    if (openedFilters.includes(trigger)) {
      setOpenedFilters(openedFilters.filter((t) => t !== trigger));
    } else {
      setOpenedFilters([...openedFilters, trigger]);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-12">
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
        <div className="grid grid-cols-1 gap-x-3 md:grid-cols-3">
          <div className="md:col-span-2">
            {isLoading && (
              <div className="space-y-2 pt-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}{" "}
            <JobCards
              jobs={jobs}
              hovered={hovered}
              setHovered={setHovered}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="bg-gray-200 mt-3 rounded-md md:col-span-1">
            <div className="mx-auto w-11/12 my-3">
              {jobAccordionFilters.map((filter, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  value={
                    !openedFilters.includes(filter.trigger)
                      ? filter.trigger
                      : null
                  }
                >
                  <AccordionItem value={filter.trigger}>
                    <AccordionTrigger
                      className="hover:no-underline font-bold"
                      onClick={() => handleAccordionTrigger(filter.trigger)}
                    >
                      {filter.trigger}
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.content.map((contentItem, contentIndex) => (
                        <div key={contentIndex}>
                          <Label
                            htmlFor={`${filter.trigger}-${contentIndex}`}
                            className="flex items-center py-1"
                          >
                            <Checkbox
                              id={`${filter.trigger}-${contentIndex}`}
                              name={filter.trigger}
                              value={contentItem}
                              className="mr-2"
                            />
                            {contentItem}
                          </Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
