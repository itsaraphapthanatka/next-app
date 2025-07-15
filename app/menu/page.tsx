"use client";
import { Dashboard } from "../components/Dashboard";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);

  if (typeof window === "undefined" || loading) {
    return null;
  }

  // Optionally, you can use session data here or pass it to Dashboard
  // console.log(session);

  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard/>
    </div>
  );
}