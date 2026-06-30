// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_EXACT = ["/profile", "/ask", "/questions/add", "/answer/add"];

function isProtected(pathname: string): boolean {
  if (PROTECTED_EXACT.includes(pathname)) return true;
  return pathname.startsWith("/questions/") && pathname !== "/questions";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (isProtected(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/ask", "/questions/:path*", "/answer/:path*"],
};
