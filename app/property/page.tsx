// app/property/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";

export default async function PropertyPage() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("serve_session");
  if (!cookie) redirect("/");

  let session = null;

  try {
    const json = Buffer.from(cookie.value, "base64").toString("utf-8");
    session = JSON.parse(json);
  } catch {
    redirect("/");
  }

  return (
    <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1>Property Management {session?.user?.name}</h1>
      </div>
    </div>
  );
}
