import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isOnboarding = req.nextUrl.pathname.startsWith("/onboarding");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if ((isDashboard || isOnboarding) && !isLoggedIn) {
    const callbackUrl = req.nextUrl.pathname;
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/auth/:path*"],
  runtime: "nodejs",
};
