"use client";
import { Dashboard } from "../components/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// If you are using next-auth, import useSession safely:
let useSession: any;
try {
  // Dynamically require to avoid SSR issues or undefined errors
  // @ts-ignore
  useSession = require("next-auth/react").useSession;
} catch {
  useSession = undefined;
}

export default function MenuPage() {
  const router = useRouter();

  // Defensive: If useSession is not available, treat as not authenticated
  if (!useSession) {
    useEffect(() => {
      router.push("/");
    }, [router]);
    return <div>Loading...</div>;
  }

  // Always destructure with fallback to empty object to avoid TypeError
  const { data: session, status } = useSession() || {};

  useEffect(() => {
    if (status === "unauthenticated" || (!session && status !== "loading")) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}