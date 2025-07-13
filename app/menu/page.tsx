"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { ProfileHeader } from "../components/ProfileHeader";
import { Dashboard } from "../components/Dashboard";

export default function MenuPage() {
  return (
    <SessionProvider>
      <MenuContent />
    </SessionProvider>
  );
}

function MenuContent() {
  const { data: session } = useSession();
  return (
    <>
      <div className="bg-gray-100 max-w-md mx-auto p-4">
        <Dashboard />
      </div>
    </>
  );
}