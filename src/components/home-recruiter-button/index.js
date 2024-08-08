"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomeRecruiterButton() {
  const router = useRouter();
  return (
    <div className="sm:block sm:space-x-6 flex flex-wrap justify-around gap-3 mt-3">
      <Button
        className="text-lg  flex-1 bg-blue-500 hover:bg-blue-700 shadow-md hover:shadow-lg"
        onClick={() => router.push("/sign-up")}
      >
        Register as Recruiter
      </Button>
    </div>
  );
}
