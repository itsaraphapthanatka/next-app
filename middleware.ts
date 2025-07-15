import { NextRequest, NextResponse } from "next/server";

// Optimization: Use session endpoint instead of directly reading cookie
export async function middleware(req: NextRequest) {
  // Call the session API route to check for a valid session
  const sessionRes = await fetch(new URL("/api/auth/session", req.url), {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const session = await sessionRes.json();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu"],
};
