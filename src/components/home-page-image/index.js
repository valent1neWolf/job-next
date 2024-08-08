"use client";
import { useState, useEffect } from "react";

export default function HomePageImage() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = "/job-oportunity.svg";
  //   img.onload = () => setIsLoading(false);
  // }, []);

  return (
    <div className="hidden relative lg:flex lg:items-center lg:justify-center lg:w-7/12">
      {/* <Skeleton className="lg:w-[700px] lg:h-[700px] ml-auto pl-2" /> */}

      <img
        className="relative ml-auto"
        src="/job-oportunity.svg"
        alt="home people image"
      />
    </div>
  );
}
