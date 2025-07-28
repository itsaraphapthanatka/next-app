"use client";

import { Clock } from "lucide-react";
import { Badge, Space } from "antd";
import { CountdownTime } from "@/app/components/CountdownTime";

export function Navbar() {

  const countdown = CountdownTime();

  return (
    <div className="bg-white p-4 border-b border-gray-200 ">
      <nav className="flex items-center justify-between font-prompt">
        <div className="text-xl font-semibold text-primary">SERVE</div>
        <div className="relative">
          {/* แสดง Badge antd เวลานับถอยหลัง Cookie */}
          <Space size="middle">
            <Badge count={countdown}>
              <Clock className="w-6 h-6 text-muted-foreground" />
            </Badge>
          </Space>
        </div>
      </nav>
    </div>
  );
}
