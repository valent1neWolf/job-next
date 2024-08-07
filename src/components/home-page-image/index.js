"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageImage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "https://shorturl.at/msw07";
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <div className="hidden relative md:flex md:items-center md:justify-center lg:w-7/12">
      {isLoading ? (
        <Skeleton className="lg:w-[700px] lg:h-[700px] ml-auto pl-2" />
      ) : (
        <img
          className="relative ml-auto"
          src="https://shorturl.at/msw07"
          alt="home people image"
        />
      )}
    </div>
  );
}
