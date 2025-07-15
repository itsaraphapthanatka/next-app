"use client";
import { SessionProvider } from "next-auth/react";
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


  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("serve_token");
    if (token) {
      router.push("/api/auth/set-cookie");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("serve_token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
        <Dashboard />
      </div>
    </>
  );
}