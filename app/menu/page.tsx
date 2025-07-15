"use client";
import { Dashboard } from "../components/Dashboard";
import { useSession } from "next-auth/react";

export default function MenuPage() {
  const sessionResult = useSession();
  console.log(sessionResult);

  // Optionally, you can check for window here if you need to render a fallback
  // But do not call hooks conditionally
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}