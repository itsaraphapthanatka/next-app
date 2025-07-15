"use client";
import { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check session by reading the cookie
    async function checkSession() {
      try {
        // Try to fetch session info from an API route or check cookie
        // For demonstration, we'll check for the presence of the cookie
        const res = await fetch("/api/auth/session", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.user) {
            setSession(data);
          } else {
            setSession(null);
          }
        } else {
          setSession(null);
        }
      } catch (err) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  if (loading) {
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