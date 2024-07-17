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

import { Label } from "@/components/ui/label";
import { defaultJobAccordionFilters } from "@/utils";

export default function JobListing({
  profileInfo,
  user,
  jobs,
  choosenFilters,
  setChoosenFilters,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [openedFilters, setOpenedFilters] = useState([]);
  const [jobAccordionFilters, setJobAccordionFilters] = useState(
    defaultJobAccordionFilters
  );

  useEffect(() => {
    // kiszedjük a létező helyeket a az állásokból
    const locations = [...new Set(jobs.map((job) => job.location))];

    // a kiszedet helykkel feltöltjük a Location contentjét
    const updatedFilters = jobAccordionFilters.map((filter) => {
      if (filter.trigger === "Location") {
        return { ...filter, content: locations };
      }
      return filter;
    });

    setJobAccordionFilters(updatedFilters);
  }, [jobs]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(name, value, checked);
    setChoosenFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (f) => f.trigger === name
      );
      let updatedFilters = [...prevFilters];

      if (existingFilterIndex >= 0) {
        // Filter exists, update its content
        if (checked) {
          // Add value if checked
          const updatedContent = new Set([
            ...updatedFilters[existingFilterIndex].content,
            value,
          ]);
          updatedFilters[existingFilterIndex].content =
            Array.from(updatedContent);
        } else {
          // Remove value if unchecked
          updatedFilters[existingFilterIndex].content = updatedFilters[
            existingFilterIndex
          ].content.filter((item) => item !== value);
        }
      } else if (checked) {
        // Filter does not exist and checkbox is checked, add new filter
        updatedFilters.push({ trigger: name, content: [value] });
      }

      return updatedFilters;
    });
  };

  const handleAccordionTrigger = (trigger) => {
    if (openedFilters.includes(trigger)) {
      setOpenedFilters(openedFilters.filter((t) => t !== trigger));
    } else {
      setOpenedFilters([...openedFilters, trigger]);
    }
  };
  useEffect(() => {
    console.log(choosenFilters);
  }, [choosenFilters]);

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
              choosenFilters={choosenFilters}
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
                            <input
                              type="checkbox"
                              id={`${filter.trigger}-${contentIndex}`}
                              name={filter.trigger}
                              value={contentItem}
                              checked={choosenFilters.some(
                                (f) =>
                                  f.trigger === filter.trigger &&
                                  f.content.includes(contentItem)
                              )}
                              onChange={handleCheckboxChange}
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
