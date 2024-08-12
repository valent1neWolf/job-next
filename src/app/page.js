import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions";
import HomePageButton from "@/components/home-page-button";
import HomePageImage from "@/components/home-page-image";
import Slideshow from "@/components/slideshow";
import HomeRecruiterButton from "@/components/home-recruiter-button";
import HomeMobileImage from "@/components/home-mobile-images";

export default async function Home() {
  const user = await currentUser();
  // console.log(user, "user");

  const profileInfo = await fetchProfile(user?.id);

  if (user && !profileInfo?.data?._id) {
    // console.log(profileInfo, "profileInfo");
    redirect("/onboard");
  }

  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="relative w-full">
        <div className="min-h-screen space-y-16">
          <div className="m-auto p-0 flex items-center">
            <div className="flex items-center flex-wrap  lg:gap-0">
              <div className="lg:hidden w-full relative">
                <HomeMobileImage
                  alt={"home people image"}
                  src={"/home-image.svg"}
                />
                {/* <img
                  className="absolute top-0 left-1/2 transform -translate-x-1/2  w-2/5"
                  src="/images/kondor-vector-navy2.png"
                  alt="logo"
                /> */}
              </div>
              <div className="lg:w-5/12 lg:space-y-8">
                <span className="text-4xl lg:text-5xl font-bold ">
                  Job that makes your future
                </span>
                <p className="text-lg text-gray-600 text-justify">
                  We at Kondor are here to help you find the best job that suits
                  your skills, preferences and experience. We have a wide range
                  of job listings from various industries and sectors.
                </p>
                <HomePageButton />
              </div>

              <HomePageImage />
            </div>
          </div>
          <div className="m-auto p-0 flex items-center">
            <div className="flex items-center flex-wrap  lg:gap-0">
              <div className="lg:hidden w-full relative">
                <HomeMobileImage
                  src={"/images/resume-image.png"}
                  alt={"resume image"}
                />
              </div>

              <div className="hidden relative lg:flex lg:items-center lg:justify-center lg:w-7/12">
                <img
                  className="relative ml-auto"
                  src="/job-hunt.svg"
                  alt="job hunt image"
                />
              </div>
              <div className="lg:w-5/12 lg:space-y-8">
                <span className="text-4xl lg:text-5xl font-bold ">
                  Reach a broader audience
                </span>
                <p className="text-lg text-gray-600 text-justify">
                  If you are an employer looking for the best talent, you are in
                  the right place. It has never been easier to find the right
                  person for the job, thanks to Kondor's straightforward
                  solutions. Post your job listing today.
                </p>
                <HomeRecruiterButton />
              </div>
            </div>
          </div>
          <div className="mt-10 mb-20">
            <Slideshow />
          </div>
        </div>
      </div>
    </section>
  );
}
