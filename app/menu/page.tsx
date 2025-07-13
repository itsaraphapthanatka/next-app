"use client";
import { SessionProvider } from "next-auth/react";
import { Dashboard } from "../components/Dashboard";

export default function MenuPage() {
  return (
    <SessionProvider>
      <MenuContent />
    </SessionProvider>
  );
}

function MenuContent() {
  return (
    <>
      <div className="bg-gray-100 max-w-md mx-auto p-4">
        <Dashboard />
      </div>
    </>
  );
}