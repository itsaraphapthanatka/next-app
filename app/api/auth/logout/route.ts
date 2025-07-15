import { NextResponse } from "next/server";

export async function POST() {
  // ล้าง cookie serve_session โดยตั้งค่า cookie ให้หมดอายุทันที
  const response = NextResponse.json({ message: "Logged out" });
  
  response.cookies.set({
    name: "serve_session",
    value: "",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0, // หมดอายุทันที
  });

  return response;
}
