import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req:any) => {
  const { nextUrl } = req;
  const session = req.auth;

  // Not logged in
  if (!session) {
    return NextResponse.redirect(
      new URL("/login", nextUrl)
    );
  }

  const role = session.user.role;

  // Doctor routes
  if (
    nextUrl.pathname.startsWith("/doctor") &&
    role !== "doctor"
  ) {
    return NextResponse.redirect(
      new URL("/", nextUrl)
    );
  }

  // ASHA routes
  if (
    nextUrl.pathname.startsWith("/asha") &&
    role !== "asha"
  ) {
    return NextResponse.redirect(
      new URL("/", nextUrl)
    );
  }

  // Patient routes
  if (
    nextUrl.pathname.startsWith("/patient") &&
    role !== "patient"
  ) {
    return NextResponse.redirect(
      new URL("/", nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/doctor/:path*",
    "/asha/:path*",
    "/patient/:path*",
  ],
};