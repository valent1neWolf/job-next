import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions";
import HomePageButton from "@/components/home-page-button";

export default async function Home() {
  const user = await currentUser();
  // console.log(user, "user");

  const profileInfo = await fetchProfile(user?.id);

  if (user && !profileInfo?.data?._id) {
    console.log(profileInfo, "profileInfo");
    redirect("/onboard");
  }

  return (
    <section className="flex flex-col items-center justify-center h-full  ">
      <div className="relative w-full">
        <div className=" min-h-screen">
          <div className="container m-auto p-0">
            <div className="flex items-center flex-wrap gap-12 lg:gap-0">
              <div className="lg:w-5/12 space-y-8">
                <span className="text-4xl font-bold text-gray-800">
                  Job that makes your future
                </span>
                <p className="text-lg text-gray-600">
                  We at Kondor are here to help you find the best job that suits
                  your skills, preferences and experience. We have a wide range
                  of job listings from various industries and sectors.
                </p>
                <HomePageButton />
              </div>
              <div className="hidden relative md:block lg:w-7/12 ">
                <img
                  className="relatice ml-auto"
                  src="https://shorturl.at/msw07"
                  alt="home people image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
