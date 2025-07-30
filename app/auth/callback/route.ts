import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/", req.url));
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!userRes.ok) return NextResponse.redirect(new URL("/", req.url));

  const user = await userRes.json();
  const session = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
    createdAt: Date.now(),
  };

  const encoded = Buffer.from(JSON.stringify(session)).toString("base64");
 

  const response = NextResponse.redirect(new URL("/menu", req.url));
  response.cookies.set("serve_session", encoded, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    // maxAge: 60 * 60, // 1 ชม.
  });
  response.cookies.set("accessToken", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    // maxAge: 60 * 60, // 1 ชม.
  });
  response.cookies.set("session_created_at", Date.now().toString(), {
    httpOnly: false, // ✅ ให้ client-side อ่านได้
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

// ✅ log login
const baseUrl = new URL(req.url).origin
const ip =
  req.headers.get("x-forwarded-for") ||
  req.headers.get("x-real-ip") ||
  req.headers.get("x-client-ip") ||
  "unknown";

await fetch(`${baseUrl}/api/auth/logs`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: user.email,
    status: "login",
    ip,
    userAgent: req.headers.get("user-agent"),
  }),
});
  return response;
}
