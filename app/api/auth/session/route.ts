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
    const base64 = cookie.value;
    const json = Buffer.from(base64, "base64").toString("utf-8");
    console.log("Decoded cookie:", json);
    const session = JSON.parse(json);
    return NextResponse.json(session, { status: 200 });
  } catch (err) {
    console.error("Session decoding error:", err);
    return NextResponse.json(null, { status: 200 });
  }
  
}
