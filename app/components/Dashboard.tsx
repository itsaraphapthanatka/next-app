"use client";
import { Building2, FileText, ClipboardList, FolderOpen, BarChart3, Users, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ProfileHeader } from "./ProfileHeader";
import { MenuCard } from "./MenuCard";
import { toast } from "sonner";

const menuItems = [
  { title: "Property", icon: Building2, href: "/property" },
  { title: "Request Report", icon: FileText, href: "/request" },
  { title: "Assigned Report", icon: ClipboardList, href: "/assign" },
  { title: "Project", icon: FolderOpen, href: "/project" },
  { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { title: "Leads Management", icon: Users, href: "/leads-management" },
];

export function Dashboard() {

  const handleMenuClick = (itemTitle: string) => {
    toast(
      `เมนู ${itemTitle}\nคลิกเมนู ${itemTitle} เรียบร้อยแล้ว`
    );
  };

  const handleLogout = async () => {
    toast(
      "ออกจากระบบ\nกำลังออกจากระบบ...",
      { className: "bg-red-50 text-red-700" }
    );

    // Clear session cookie by calling API endpoint to remove cookie
    await fetch("/api/auth/session", {
      method: "DELETE",
      credentials: "include",
    });

    // Optionally, clear client-side session if needed (for next-auth)
    signOut({ callbackUrl: "/" });
  };
  const { data: session } = useSession();

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