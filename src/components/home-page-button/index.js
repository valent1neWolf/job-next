"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePageButton() {
  const router = useRouter();
  return (
    <div className="space-x-6">
      <Button className="text-lg" onClick={() => router.push("/jobs")}>
        Get Started
      </Button>
      <Button className="text-lg" onClick={() => router.push("/membership")}>
        Try Premium
      </Button>
    </div>
  );
}
