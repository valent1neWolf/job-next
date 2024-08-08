"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/actions";
import { useRouter } from "next/navigation";
import { membershipPlans } from "@/utils";
export default function Membership() {
  const router = useRouter();
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  console.log(user);
  useEffect(() => {
    const loadProfile = async () => {
      // Only proceed if user.id is truthy and profileInfo is not already set or needs update
      if (user?.id && (!profileInfo || profileInfo.userId !== user.id)) {
        const fetchedProfile = await fetchProfile(user.id);
        setProfileInfo(fetchedProfile?.data);

        // Redirect to onboard if profile is not found
        if (!fetchedProfile?.data) {
          router.push("/onboard");
        }
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user?.id]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Choose a plan that fits you the most
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:mx-32 lg:mx-0 lg:grid-cols-3">
            {membershipPlans.map((plan) => (
              <div key={plan.type} className="border rounded-md ">
                <div className="flex justify-center items-center py-4">
                  <h2 className="text-3xl font-bold">{plan.heading}</h2>
                </div>
                <p className="text-2xl">{plan.price} &euro;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
