import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions";

async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  return (
    <div className="h-screen flex flex-col">
      {/* header component */}
      <Header
        profileInfo={profileInfo?.data}
        user={JSON.parse(JSON.stringify(user))}
      />
      <div className="mx-auto w-full max-w-7xl p-6 lg:px-8">
        {/* main content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

export default CommonLayout;

//az egész projekt layout-ját foglalja össze
