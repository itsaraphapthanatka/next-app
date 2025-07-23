
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import { RequestSearchFrom } from "./RequestSearchFrom";
import { TableRequest } from "./TableRequest";


interface SessionUser {
  firstName?: string;
  token?: string;
  [key: string]: unknown;
}

interface Session {
  user?: SessionUser;
  [key: string]: unknown;
}

export default async function RequestContent() {
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
  console.log(userName);
  const token = session?.token || "";
  console.log("RequestPage token",token);
  return (
    <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
      <Navbar />
      <div className="mx-auto p-4">
        <div className="flex items-center gap-2">
          <Link href="/menu" passHref>  
            <ArrowLeftCircleIcon className="w-10 h-10 cursor-pointer text-amber-500" />
          </Link>
          <h1>Request Report</h1>
        </div>
        <div className="mt-4">
          <RequestSearchFrom token={token as string}/>
          <TableRequest token={token as string} />
        </div>
      </div>
    </div>
  );
}
