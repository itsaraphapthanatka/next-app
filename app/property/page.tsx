
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import { ArrowBigLeftIcon } from "lucide-react";
import Link from "next/link";

interface SessionUser {
  firstName?: string;
  [key: string]: unknown;
}

interface Session {
  user?: SessionUser;
  [key: string]: unknown;
}

export default async function PropertyPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("serve_session");
  if (!cookie) return redirect("/");

  let session: Session;
  
  try {
    session = JSON.parse(Buffer.from(cookie.value, "base64").toString("utf-8")) as Session;
  } catch {
    return redirect("/");
  }

  const userName = session?.user?.firstName || "User";

  return (
    <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center gap-2">
          <Link href="/menu" passHref>
            <ArrowBigLeftIcon
              className="w-6 h-6 cursor-pointer"
              aria-label="Back to menu"
            />
          </Link>
          <h1>Property Management by {userName}</h1>
        </div>
      </div>
    </div>
  );
}
