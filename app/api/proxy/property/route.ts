// app/api/proxy/property/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("body", body);
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken");
  const token = cookie?.value;
  console.log("froxy token", token);
  const response = await fetch("https://api.serve.co.th/properties/gets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
