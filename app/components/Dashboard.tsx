"use client";
import { Building2, FileText, ClipboardList, FolderOpen, BarChart3, Users, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
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

  // Optimized sign out: clear session data in-memory and redirect, not using cookies
  const handleLogout = async () => {
    toast(
      "ออกจากระบบ\nกำลังออกจากระบบ...",
      { className: "bg-red-50 text-red-700" }
    );

    // Remove session data from memory (if any)
    if (typeof window !== "undefined") {
      // Remove any session data stored in localStorage/sessionStorage
      localStorage.removeItem("serve_session");
      sessionStorage.removeItem("serve_session");
    }

    // Redirect to home page after clearing session data
    window.location.href = "/";
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