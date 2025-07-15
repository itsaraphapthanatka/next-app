import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Dashboard } from "@/app/components/Dashboard";

export default async function MenuPage() {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const sessionCookie = cookieStore.get("serve_session");
  console.log("sessionCookie", sessionCookie);

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const json = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    const session = JSON.parse(json);

    console.log("session in menu", session);
    return (
      <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
        <Dashboard session={session} />
      </div>
    );
  } catch {
    redirect("/");
  }
}
