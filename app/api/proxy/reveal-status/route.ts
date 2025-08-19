import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const id = await req.json();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken");
  const token = cookie?.value;

  const url = `https://api.serve.co.th/properties/reveal-status/${id}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "accept": "text/plain",
      "Authorization": `Bearer ${token}`,
    },
    body: "",
  });

  const data = await response.text();

  return new Response(data, { status: response.status, headers: { "Content-Type": "text/plain" } });
}
