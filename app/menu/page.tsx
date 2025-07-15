"use client";
import { Dashboard } from "../components/Dashboard";
import { useSession } from "next-auth/react";

export default function MenuPage() {
  const sessionResult = useSession();
  console.log(sessionResult);

  // Handle the case where useSession might be undefined


 


  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto p-4">
      <Dashboard />
    </div>
  );
}