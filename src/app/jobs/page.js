"use client";
import { useUser } from "@clerk/nextjs";
import JobListing from "@/components/job-listing";
import { fetchProfile } from "@/actions";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id]);

  return <JobListing profileInfo={profileInfo} user={user} />;
}
