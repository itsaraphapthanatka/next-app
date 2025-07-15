"use client";
import { Dashboard } from "../components/Dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Session = Record<string, unknown> | null;

export default function MenuPage() {
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setSession(data);
        if (data === null) {
          router.push("/");
        }
      } catch {
        setSession(null);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);

  if (typeof window === "undefined" || loading) {
    return null;
  }



  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard/>
    </div>
  );
}