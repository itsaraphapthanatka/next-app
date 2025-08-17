import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import DashboardClient from "./DashboardClient";    

interface SessionUser {
  firstName?: string;
  [key: string]: unknown;
}

interface Session {
  user?: SessionUser;
  [key: string]: unknown;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("serve_session");
  if (!cookie) return redirect("/");

  let session: Session;
  try {
    session = JSON.parse(
      Buffer.from(cookie.value, "base64").toString("utf-8")
    ) as Session;
  } catch {
    return redirect("/");
  }

  return (
    <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
      <Navbar />
      <DashboardClient session={session} />
    </div>
  );
}
