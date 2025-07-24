"use client";

import { Building2, FileText, ClipboardList, FolderOpen, BarChart3, Users, LogOut } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { MenuCard } from "./MenuCard";
import { toast } from "sonner";


type DashboardProps = {
  session: {
    user?: {
      firstName?: string;
      email?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

const menuItems = [
  { title: "Property", icon: Building2, href: "/property" },
  { title: "Request Report", icon: FileText, href: "/request" },
  { title: "Assigned Report", icon: ClipboardList, href: "/assign" },
  { title: "Project", icon: FolderOpen, href: "/project" },
  { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { title: "Leads Management", icon: Users, href: "/leads-management" },
];

export function Dashboard({ session }: DashboardProps) {
  const handleMenuClick = (itemTitle: string) => {
    toast(`เมนู ${itemTitle}\nคลิกเมนู ${itemTitle} เรียบร้อยแล้ว`);
  };

  const handleLogout = async () => {
    const ip = window.location.hostname
    const userAgent = navigator.userAgent
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/logs`, { method: "POST", body: JSON.stringify({ email: session?.user?.email, status: "logout" ,ip: ip, userAgent: userAgent}) });
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };





  return (
    <div className="min-h-screen bg-dashboard-bg font-prompt">
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-3">
          <ProfileHeader userName={session?.user?.firstName ?? "Guest"} />

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
            onClick={() => {
              handleLogout();
            }}
            className="bg-white border-red-200 hover:bg-red-50 hover:border-red-300"
          />
        </div>
      </div>
    </div>
  );
}
