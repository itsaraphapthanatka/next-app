import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Dashboard } from "../components/Dashboard";

export default async function MenuPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("serve_session");

  if (!sessionCookie) {
    redirect("/");
  }

  const json = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
  const session = JSON.parse(json);
  console.log(session);

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}
