// app/api/proxy/unittype/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken");
  const token = cookie?.value;
  const response = await fetch("https://api.serve.co.th/unittypes/gets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}