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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { defaultJobAccordionFilters } from "@/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import { set } from "mongoose";

export default function JobListing({
  profileInfo,
  user,
  jobs,
  choosenFilters,
  setChoosenFilters,
  setJobs,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [openedFilters, setOpenedFilters] = useState([]);
  const [locations, setLocations] = useState([
    ...new Set(jobs.map((job) => job.location)),
  ]); //ez lehet feleslegesen maradt itt
  const [jobAccordionFilters, setJobAccordionFilters] = useState(
    defaultJobAccordionFilters
  );
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  //biztonság kedvéért mégegyszer majd átnézni ---
  const noJobsFound = choosenFilters.some((filter) => filter.content.length);
  console.log("noJobsFound", noJobsFound);

  useEffect(() => {
    if (!noJobsFound && jobs.length > 0) {
      const updatedLocations = [...new Set(jobs.map((job) => job.location))];
      setLocations(updatedLocations);
      console.log(updatedLocations, "updatedLocations");

      const updatedFilters = jobAccordionFilters.map((filter) => {
        if (filter.trigger === "Location") {
          return { ...filter, content: updatedLocations };
        }
        return filter;
      });

      setJobAccordionFilters(updatedFilters);
    }
  }, [jobs]);
  //--------------------------------------------
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

  //--------------------------------------------
  //csak így lehet megszerezni a window objektumot client oldalon
  React.useEffect(() => {
    // window is accessible here.
    console.log("window.innerHeight", window.innerHeight);
  }, []);

  useEffect(() => {
    setDrawerHeight(window.innerHeight * 0.75);
    console.log(drawerHeight, "drawerHeight");
  }, [drawerHeight]);
  //--------------------------------------------
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
            <img
              src="/filter.svg"
              className="md:hidden w-6"
              onClick={() => setShowFiltersDrawer(true)}
            />
            {profileInfo?.role === "recruiter" ? (
              <PostNewJob
                profileInfo={profileInfo}
                user={user}
                setJobs={setJobs}
              />
            ) : null}
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
              user={user}
              jobToDelete={jobToDelete}
              setJobToDelete={setJobToDelete}
              setJobs={setJobs}
            />
          </div>
          <div className=" hidden bg-gray-200 mt-3 rounded-md md:block md:col-span-1 h-max">
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
          <div>
            <Drawer
              open={showFiltersDrawer}
              onOpenChange={setShowFiltersDrawer}
            >
              <DrawerContent>
                <ScrollArea
                  style={{ maxHeight: `${drawerHeight}px` }}
                  className="overflow-auto"
                >
                  <DrawerHeader>
                    <DrawerTitle>Set filters</DrawerTitle>
                  </DrawerHeader>
                  <DrawerFooter>
                    <div>
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
                                onClick={() =>
                                  handleAccordionTrigger(filter.trigger)
                                }
                              >
                                {filter.trigger}
                              </AccordionTrigger>
                              <AccordionContent>
                                {filter.content.map(
                                  (contentItem, contentIndex) => (
                                    <div key={contentIndex}>
                                      <Label
                                        htmlFor={`${filter.trigger}-${contentIndex}`}
                                        className="flex items-center py-1 text-lg"
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
                                          className="mr-2 h-5 w-5"
                                        />
                                        {contentItem}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </div>
                  </DrawerFooter>
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
