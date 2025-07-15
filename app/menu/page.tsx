import { redirect } from "next/navigation";
import { Dashboard } from "../components/Dashboard";
import { getSession } from "../lib/session"; // Assume you have a session utility

export default async function MenuPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  console.log(session);

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}
