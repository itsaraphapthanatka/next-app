// /app/api/auth/set-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL("/menu", req.url));

  response.headers.set(
    "Set-Cookie",
    serialize("serve_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 วัน
    })
  );

  return response;
}
