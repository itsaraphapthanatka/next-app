// /app/test-session/page.tsx
import { cookies } from "next/headers";

export default async function TestSessionPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("serve_session");

  if (!cookie) return <div>No cookie</div>;

  let session = null;
  try {
    session = JSON.parse(Buffer.from(cookie.value, "base64").toString("utf-8"));
  } catch (err) {
    return <div>Invalid session: {String(err)}</div>;
  }

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
