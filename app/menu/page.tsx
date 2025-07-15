"use client";
import { Dashboard } from "../components/Dashboard";
import { useSession } from "next-auth/react";

export default function MenuPage() {
  // Ensure useSession is only called on the client
  if (typeof window === "undefined") {
    // Return null or a fallback if rendering on the server
    return null;
  }

  const sessionResult = useSession();
  console.log(sessionResult);

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}