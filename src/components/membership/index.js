"use client";

import { useEffect } from "react";
import {
  createPriceIdAction,
  createStripePaymentAction,
  editProfileInfo,
} from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { membershipPlans } from "@/utils";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import "dotenv/config";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Membership({ profileInfo, user }) {
  const router = useRouter();

  const pathName = useSearchParams();

  async function hanlePayment(getCurrentPlan) {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });
    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });

      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );
    const monthsToAdd =
      fetchCurrentPlanFromSessionStorage?.type === "basic"
        ? 1
        : fetchCurrentPlanFromSessionStorage?.type === "teams"
        ? 3
        : 6;
    const result = await editProfileInfo(
      profileInfo._id,
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toISOString(),
        memberShipEndDate: new Date(
          new Date().setMonth(new Date().getMonth() + monthsToAdd)
        ).toISOString(),
      },
      "/membership"
    );

    if (result.success) {
      router.push("/membership");
    }
  }

  useEffect(() => {
    console.log("Pathname status:", pathName.get("status"));
    if (pathName.get("status") === "success" && profileInfo) {
      console.log("Updating profile...");
      updateProfile();
    }
  }, [pathName, profileInfo]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <div className="flex justify-between items-center text-4xl font-bold tracking-tight text-gray-900 w-full">
          {profileInfo?.isPremiumUser ? (
            <>
              Premium User
              <Button className=" border shadow-md select-none text-xl">
                {profileInfo?.memberShipType.toUpperCase()}
              </Button>
            </>
          ) : (
            "Membership Plans"
          )}
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:mx-32 lg:mx-0 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.type}
                className="border rounded-md shadow-sm bg-gray-100 hover:bg-white hover:shadow-lg p-8"
              >
                <div className="flex justify-center items-center py-4">
                  <h2 className="text-3xl font-bold">{plan.heading}</h2>
                </div>

                <p className="text-lg text-gray-800 font-semibold mt-3 tracking-wider">
                  {plan.type.toUpperCase()}
                </p>
                <p className="text-lg text-gray-800 mt-3 lg:h-28">
                  {plan.description}
                </p>
                <div className="h-14">
                  <p className="text-2xl mt-5 font-semibold ">
                    {plan.price} &euro;/month{" "}
                  </p>
                  {plan?.extra && (
                    <p className="text-red-600 font-semibold">
                      (+ extra {plan?.extra})
                    </p>
                  )}
                </div>
                {profileInfo?.memberShipType === "enterprise" ||
                  (profileInfo?.memberShipType === "basic" && index === 0) ||
                  (profileInfo?.memberShipType === "teams" &&
                  index >= 0 &&
                  index < 2 ? null : (
                    <Button className="mt-5" onClick={() => hanlePayment(plan)}>
                      {profileInfo?.memberShipType === "basic" ||
                      profileInfo?.memberShipType === "teams"
                        ? "Upgrade"
                        : "Subscribe"}
                    </Button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
