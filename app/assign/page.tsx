
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";
import TableAssign from "./TableAssign";
import { AssignSearchFrom } from "./AssignSearchFrom";

interface SessionUser {
    email?: string | null;
    firstName?: string | null;
    token?: string | null;
}

interface Session {
    user?: SessionUser;
    [key: string]: unknown;
}


export default async function AssignPage() {
        const cookieStore = await cookies();
        const cookie = cookieStore.get("serve_session");
        if (!cookie) return redirect("/");

        let session: Session;
        
        try {
            session = JSON.parse(Buffer.from(cookie.value, "base64").toString("utf-8")) as Session;
        } catch {
            return redirect("/");
        }
        const token = session?.token as string;
        console.log("token in AssignPage : ", token);
        return (
            <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
                <Navbar />
                <div className="mx-auto p-4">
                    <div className="flex items-center gap-2">
                    <Link href="/menu" passHref>  
                        <ArrowLeftCircleIcon className="w-10 h-10 cursor-pointer text-amber-500" />
                    </Link>
                    <h1>Assign Report</h1>
                    </div>
                    <div className="mt-4">
                    <AssignSearchFrom token={token} />
                    <TableAssign token={token} />
                    </div>
            </div>
        </div>
    );
}
