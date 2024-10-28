import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/chat(.*)", "/projects(.*)", "/payments(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)","/","/pricing"]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (!isPublicRoute(req)) {
    auth().protect();
  }

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};