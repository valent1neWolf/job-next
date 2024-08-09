import Membership from "@/components/membership";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions";
import { redirect } from "next/navigation";
export default async function MembershipPage() {
  const user = await currentUser();
  console.log(user, "user from current user");

  const profileResponse = await fetchProfile(user?.id);
  const profileInfo = profileResponse?.data;
  console.log(profileInfo, "profileInfo from fetchProfile");

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
      <Membership profileInfo={plainProfileInfo} user={plainUser} />
    </div>
  );
}
