"use client";

import { Clock } from "lucide-react";
import { useState } from "react";

export function Navbar() {
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
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
      </nav>
    </div>
  );
}
