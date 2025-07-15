import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("serve_session");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/dashboard", "/property", "/assign"], // เส้นทางที่ต้อง login
};
