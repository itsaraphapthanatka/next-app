import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/", req.url));

  const userRes = await fetch("https://api.serve.co.th/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!userRes.ok) return NextResponse.redirect(new URL("/", req.url));

  const user = await userRes.json();
  const session = {
    user: {
      id: user.id,
      firstName: user.firstName,
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
    maxAge: 60 * 60 * 24, // 1 วัน
  });
  return response;
}
