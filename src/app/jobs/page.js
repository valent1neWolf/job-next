import Jobs from "@/components/jobs";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions";
import { redirect } from "next/navigation";

export default async function JobsPage() {
  const user = await currentUser();

  const profileResponse = await fetchProfile(user?.id);
  const profileInfo = profileResponse?.data;

  // if (user && !profileInfo?.data?._id) {
  //   console.log(profileInfo, "profileInfo");
  //   redirect("/onboard");
  // }
  if (!profileResponse?.data) {
    redirect("/onboard");
  }
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
  const plainProfileInfo = profileInfo
    ? JSON.parse(JSON.stringify(profileInfo))
    : null;
  return (
    <div>
      <Jobs profileInfo={plainProfileInfo} user={plainUser} />
    </div>
  );
}
