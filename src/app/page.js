import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions";

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
      Main Content
    </section>
  );
}
