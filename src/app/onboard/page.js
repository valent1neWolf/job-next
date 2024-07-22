"use client";

import { useEffect, useState } from "react";
import OnBoard from "@/components/on-board";
import { useUser } from "@clerk/nextjs";
import { fetchProfile } from "@/actions";
import { useRouter } from "next/navigation";
function OnBoardPage() {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(profileInfo, "profileInfo");
  }, [profileInfo]);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        console.log("Loading profile for user ID:", user.id);
        const fetchedProfile = await fetchProfile(user.id);
        console.log("Profile fetched:", fetchedProfile?.data);
        setProfileInfo(fetchedProfile?.data);
      }
    };

    loadProfile();
  }, [user?.id, loading]);

  useEffect(() => {
    console.log("ProfileInfo useEffect triggered:", profileInfo);
    if (profileInfo) {
      console.log("Redirecting based on profileInfo:", profileInfo);
      if (profileInfo.role === "recruiter" && !profileInfo.isPremiumUser) {
        router.push("/membership");
      } else {
        router.push("/");
      }
    }
  }, [profileInfo]);

  return <OnBoard setLoading={setLoading} />;
}

export default OnBoardPage;
