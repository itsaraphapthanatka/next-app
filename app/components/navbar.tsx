"use client";

import { Clock } from "lucide-react";

export function Navbar() {

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
