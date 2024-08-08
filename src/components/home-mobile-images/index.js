"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeMobileImage({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return isLoading ? (
    <Skeleton className="w-full h-[400px] md:h-[550px]" />
  ) : (
    <img className="relative ml-auto" src={src} alt={alt} />
  );
}
