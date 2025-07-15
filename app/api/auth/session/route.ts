import { NextRequest, NextResponse } from "next/server";

// This is a simple session endpoint that reads the session cookie and returns user info if present.
// In a real app, you would verify the cookie and fetch user data from a database or session store.

export async function GET(req: NextRequest) {
  // Read the session cookie (e.g., "serve_session")
  const cookie = req.cookies.get("serve_session");

  if (!cookie) {
    // No session cookie, return null session
    return NextResponse.json(null, { status: 200 });
  }

  try {
    // For demonstration, assume the cookie is a JWT or JSON string with user info
    // In production, you should verify and decode the cookie securely!
    const base64 = cookie.value;
    // Try to decode as base64-encoded JSON
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const session = JSON.parse(json);

    // Return the session object (should contain at least a user property)
    return NextResponse.json(session, { status: 200 });
  } catch (_err) {
    // Invalid cookie format
    return NextResponse.json(null, { status: 200 });
  }
}
