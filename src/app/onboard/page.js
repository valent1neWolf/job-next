"use client";

import { useEffect, useState } from "react";
import OnBoard from "@/components/on-board";
import { useUser } from "@clerk/nextjs";
import { fetchProfile } from "@/actions";
import { useRouter } from "next/navigation";
function OnBoardPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id]);

  useEffect(() => {
    // This effect listens for changes in profileInfo and navigates accordingly
    if (profileInfo) {
      if (profileInfo.role === "recruiter" && !profileInfo.isPremiumUser) {
        router.push("/membership");
      } else {
        // Navigate to a different page if conditions are different
        router.push("/");
      }
    }
  }, [profileInfo, router]);

  return <OnBoard />;
}

export default OnBoardPage;
