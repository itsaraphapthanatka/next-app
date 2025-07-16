"use client";
import { Bell, Clock } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  userName?: string;
  userRole?: string;
}

export function ProfileHeader({ userName = "คุณ, ตัวอย่าง สมมติ", userRole = "ขอให้ทำงานอย่างมีความสุข" }: ProfileHeaderProps) {
  return (
    <header className="bg-white rounded-xl p-4 mb-6 shadow-sm">
       <div className="text-right">
          <button className="p-1 hover:bg-secondary rounded-full transition-colors">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-secondary rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
       <div className="w-12 h-12 bg-profile-bg rounded-full flex items-center justify-between">
       
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
         
          <div>
            <h2 className="text-lg font-semibold text-foreground font-prompt">สวัสดี {userName}!</h2>
            <p className="text-sm text-text-greeting font-prompt">{userRole}</p>
          </div>
        </div>
        
        
      </div>
    </header>
  );
}