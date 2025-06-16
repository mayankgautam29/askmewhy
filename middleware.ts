// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Only log for debugging — remove in production
  console.log("[middleware] visiting:", pathname, "token:", token ? "✅" : "❌");

  // List of exactly protected paths
  const protectedExact = ["/profile", "/questions/add", "/answer/add"];

  // Paths with dynamic segments (e.g. /questions/123)
  const protectedDynamic = pathname.startsWith("/questions/") && pathname !== "/questions";

  if ((protectedExact.includes(pathname) || protectedDynamic) && !token) {
    const loginUrl = new URL("/login", request.url);
    // Optional: track intended path
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Run middleware only on these routes
export const config = {
  matcher: [
    "/profile",
    "/ask",
  ],
};
