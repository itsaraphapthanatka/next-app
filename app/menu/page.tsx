"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Dashboard } from "../components/Dashboard";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  return (
    <SessionProvider>
      <MenuContent />
    </SessionProvider>
  );
}

function MenuContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Or a loading spinner, since redirect is happening
  }

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}