"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const SESSION_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT_MS || 30 * 60 * 1000); // fallback 30 นาที

function getRemainingMinutes(): number {
  if (typeof document === "undefined") return 0;
  const match = document.cookie.match(/session_created_at=([^;]+)/);
  if (!match) return 0;

  const createdAt = Number(match[1]);
  const expiresAt = createdAt + SESSION_TIMEOUT_MS;
  const remaining = Math.max(0, expiresAt - Date.now());
  return Math.floor(remaining / 60000);
}

export function useCountdownTime(): number {
  const [remainingMinutes, setRemainingMinutes] = useState(getRemainingMinutes());
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const mins = getRemainingMinutes();
      setRemainingMinutes(mins);

      if (mins <= 0) {
        console.log("🔒 Session expired, logging out...");
        await fetch("/api/auth/logout", { method: "POST" });

        // Clear cookies
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "session_created_at=; path=/; max-age=0";
        document.cookie = "serve_session=; path=/; max-age=0";

        router.push("/"); // Redirect to login
      }
    }, 60 * 1000); // ✅ ทุก 1 นาที ก็พอ

    return () => clearInterval(interval);
  }, [router]);

  return remainingMinutes;
}
