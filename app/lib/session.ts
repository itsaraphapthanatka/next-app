import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("serve_session")?.value;
  if (!session) return null;
  return { session };
}
