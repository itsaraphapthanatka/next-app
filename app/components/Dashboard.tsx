"use client";
import { Building2, FileText, ClipboardList, FolderOpen, BarChart3, Users, LogOut } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { MenuCard } from "./MenuCard";
import { toast } from "sonner";
import { useEffect, useState } from "react";

// Session management using only localStorage/sessionStorage (no cookies)
const SESSION_KEY = "serve_session";

// Utility to get session from storage
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return sessionStr ? JSON.parse(sessionStr) : null;
  } catch {
    return null;
  }
}

// Utility to set session in storage
function setSession(session: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // fallback to sessionStorage if localStorage fails
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
  }
}

// Utility to clear session from storage
function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

const menuItems = [
  { title: "Property", icon: Building2, href: "/property" },
  { title: "Request Report", icon: FileText, href: "/request" },
  { title: "Assigned Report", icon: ClipboardList, href: "/assign" },
  { title: "Project", icon: FolderOpen, href: "/project" },
  { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { title: "Leads Management", icon: Users, href: "/leads-management" },
];

export function Dashboard() {
  const [session, setSessionState] = useState<any>(null);

  // Load session from storage on mount
  useEffect(() => {
    setSessionState(getSession());
  }, []);

  // Listen for session changes in other tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === SESSION_KEY) {
        setSessionState(getSession());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleMenuClick = (itemTitle: string) => {
    toast(
      `เมนู ${itemTitle}\nคลิกเมนู ${itemTitle} เรียบร้อยแล้ว`
    );
  };

  // Sign out: clear session from storage and redirect
  const handleLogout = async () => {
    toast(
      "ออกจากระบบ\nกำลังออกจากระบบ...",
      { className: "bg-red-50 text-red-700" }
    );
    clearSession();
    setSessionState(null);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg font-prompt">
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-3">
          <ProfileHeader userName={session?.user?.name ?? undefined} />

          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={() => handleMenuClick(item.title)}
              href={item.href}
            />
          ))}

          <MenuCard
            title="Log Out"
            icon={LogOut}
            onClick={handleLogout}
            className="bg-white border-red-200 hover:bg-red-50 hover:border-red-300"
          />
        </div>
      </div>
    </div>
  );
}