import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/onboard(.*)",
  "/jobs(.*)",
  "/account(.*)",
  "/membership(.*)",
]);

export default clerkMiddleware((auth, req) => {
  console.log("Request Path:", req.url);
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
