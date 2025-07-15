import { NextRequest, NextResponse } from "next/server";

// Optimization: Use session from in-memory or header, not cookie
// This endpoint expects the client to send session data via Authorization header or custom header

export async function GET(req: NextRequest) {
  // Try to get session from Authorization header (e.g., Bearer <base64>)
  const authHeader = req.headers.get("authorization");
  let session = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const base64 = authHeader.replace("Bearer ", "");
    try {
      const json = Buffer.from(base64, "base64").toString("utf-8");
      session = JSON.parse(json);
    } catch (err) {
      console.error("Session decoding error from Authorization header:", err);
      session = null;
    }
  } else {
    // Optionally, try a custom header (e.g., x-serve-session)
    const base64 = req.headers.get("x-serve-session");
    if (base64) {
      try {
        const json = Buffer.from(base64, "base64").toString("utf-8");
        session = JSON.parse(json);
      } catch (err) {
        console.error("Session decoding error from x-serve-session header:", err);
        session = null;
      }
    }
  }

  // If no session found, return null
  if (!session) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(session, { status: 200 });
}
