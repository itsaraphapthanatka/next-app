"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

function getRemainingMinutes(): number {
  if (typeof document === "undefined") return 0;
  const match = document.cookie.match(/session_created_at=([^;]+)/);
  if (!match) return 0;
  const createdAt = Number(match[1]);
  const expiresAt = createdAt + SESSION_TIMEOUT_MS;
  const remaining = Math.max(0, expiresAt - Date.now());
  return Math.floor(remaining / 60000); // คำนวณเป็น "นาที"
}

export function CountdownTime() {
  const [remainingMinutes, setRemainingMinutes] = useState(getRemainingMinutes());
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const mins = getRemainingMinutes();
      setRemainingMinutes(mins);
      if (mins === 0) router.push("/");
    }, 60 * 1000); // Update ทุก 1 นาที

    return () => clearInterval(interval);
  }, [router]);

  if (remainingMinutes === 0) {
    return "--";
  }

  return remainingMinutes;
}
