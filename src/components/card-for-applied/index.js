import { Button } from "@/components/ui/button";
import { capitalize, handleCreationTime } from "@/utils";
import { useState, useEffect } from "react";

export default function CardForApplied({ key, job }) {
  return (
    <div key={key} className="bg-gray-100 p-2 rounded-md mt-3 relative">
      <h1 className="font-bold text-xl">{capitalize(job?.title)}</h1>
      <p className="flex items-center pt-1">
        <img src="/building.svg" alt="building-svg" className="mr-2" />
        {job?.companyName}
      </p>
      <p className="flex items-center pt-1">
        <img src="/location.svg" alt="location-svg" className="mr-2" />
        {job?.location}
      </p>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <Button
            className="mt-2 px-4"
            onClick={() => window.open(`/jobs/${job._id}`)}
          >
            View <span className="hidden md:inline">&#8203; Job</span>
          </Button>
        </div>
        <div>
          <p className="text-sm ">{handleCreationTime(job?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
