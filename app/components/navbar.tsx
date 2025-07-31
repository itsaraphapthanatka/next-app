"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Badge, Space } from "antd";
import { useCountdownTime } from "@/app/components/CountdownTime";

export function Navbar() {
  const countdown = useCountdownTime();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white p-4 border-b border-gray-200 ">
      <nav className="flex items-center justify-between font-prompt">
        <div className="text-xl font-semibold text-primary">SERVE</div>
        <div className="relative">
          <Space size="middle">
            {/* แสดง Badge เฉพาะเมื่อ client โหลดแล้ว */}
            <Badge count={mounted ? (countdown === 0 ? "--" : countdown) : undefined}>
              <Clock className="w-6 h-6 text-muted-foreground" />
            </Badge>
          </Space>
        </div>
      </nav>
    </div>
  );
}
