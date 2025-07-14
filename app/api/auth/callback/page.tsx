// /app/api/auth/callback/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login?error=missing_token");
      return;
    }

    // ✅ Redirect ไปหา server-side API route ที่จัดการ cookie ให้
    window.location.href = `/api/auth/set-cookie?token=${encodeURIComponent(token)}`;
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto mb-4 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
        <p className="text-gray-700 text-lg">กำลังเข้าสู่ระบบ...</p>
      </div>
    </div>
  );
}
