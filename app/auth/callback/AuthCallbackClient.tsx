"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login?error=missing_token");
      return;
    }

    window.location.href = `/api/auth/set-cookie?token=${encodeURIComponent(token)}`;
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto mb-4 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
        <p className="text-gray-700 text-lg">กำลังเข้าสู่ระบบ...</p>
      </div>
    </div>
  );
}
