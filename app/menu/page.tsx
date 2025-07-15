"use client";
import { Dashboard } from "../components/Dashboard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MenuPage() {
  const router = useRouter();
  const sessionResult = useSession();
  console.log(sessionResult);

  // Handle the case where useSession might be undefined
  const status = sessionResult?.status;
  const session = sessionResult?.data;

  if (status === "loading") {
    return <div>Loading...</div>;
  }



  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}