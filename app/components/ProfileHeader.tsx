"use client";
import { useState, useEffect } from "react";
import { Badge, Space } from "antd";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useCountdownTime } from "@/app/components/CountdownTime";

interface ProfileHeaderProps {
  userName?: string;
  userEmail?: string;
}

export function ProfileHeader({ userName = "คุณ, ตัวอย่าง สมมติ", userEmail = "ตัวอย่าง@gmail.com" }: ProfileHeaderProps) {
  const countdown = useCountdownTime();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white rounded-xl p-4 mb-6 shadow-sm">
      <div className="text-right">
        <Space size="middle">
          {/* แสดง Badge เฉพาะเมื่อ client โหลดเสร็จ */}
          <Badge count={mounted ? (countdown === 0 ? "--" : countdown) : undefined}>
            <Clock className="w-6 h-6 text-muted-foreground" />
          </Badge>
        </Space>
      </div>
      <div className="w-12 h-12 bg-profile-bg rounded-full flex items-center justify-between">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-lg font-semibold text-black font-prompt">สวัสดี {userName}!</h2>
            <p className="text-sm text-text-greeting font-prompt">{userEmail}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
