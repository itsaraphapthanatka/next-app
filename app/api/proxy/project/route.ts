import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { page, size, search } = await req.json();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken");
  const token = cookie?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/filters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      page: { current: page, size },
      search: search ?? "",
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), { status: res.status });
  }

  return Response.json(await res.json());
}
