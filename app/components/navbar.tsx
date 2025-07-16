"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { ArrowBigLeftIcon } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionUser {
  firstName?: string;
  [key: string]: unknown;
}

interface Session {
  user?: SessionUser;
  [key: string]: unknown;
}

export async function Navbar() {
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
  const [showNotifications, setShowNotifications] = useState(false);
  

  const notifications = [
    { id: 1, message: "You have a new report request." },
    { id: 2, message: "Assignment updated successfully." },
  ];

  return (
    <div className="bg-white p-4 border-b border-gray-200 ">
      <nav className="flex items-center justify-between font-prompt">
        <div className="text-xl font-semibold text-primary">SERVE</div>
        <div className="relative">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-primary" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-3 border-b font-medium text-gray-700">Notifications</div>
              <ul>
                {notifications.map((n) => (
                  <li key={n.id} className="p-3 hover:bg-gray-50 text-sm text-gray-700">
                    {n.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
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
