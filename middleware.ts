import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "serve_session";
const SESSION_TIMEOUT_MS = 1 * 60 * 1000; // 1 นาที
// const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 นาที

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);

  if (!cookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const base64 = cookie.value;
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const session = JSON.parse(json);

    // ตรวจสอบ session timeout
    if (!session?.createdAt || Date.now() - session.createdAt > SESSION_TIMEOUT_MS) {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.delete(SESSION_COOKIE_NAME);
      return res;
    }

    // ✅ ต่ออายุ session
    const updatedSession = {
      ...session,
      createdAt: Date.now(),
    };

    const res = NextResponse.next();
    res.cookies.set(SESSION_COOKIE_NAME, Buffer.from(JSON.stringify(updatedSession)).toString("base64"), {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60, // keep 1 minute ddd
      // maxAge: 60 * 60 * 24, // keep 1 day
    });

    return res;
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}



export const config = {
  matcher: [
    "/menu",
    "/property",
    "/request",
    "/assign",
    "/dashboard",
    "/leads-management",
    // เพิ่ม path อื่นๆ ที่ต้องการป้องกันไว้
  ],
};

