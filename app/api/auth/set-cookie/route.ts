import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties if needed
}

// In-memory session store (for demonstration only, not for production)
const sessionStore = new Map<string, { user: User; token: string; createdAt: number }>();

function createSessionData(user: User, token: string) {
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
    createdAt: Date.now(),
  };
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Fetch user info
    const googleRes = await fetch("https://api.serve.co.th/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!googleRes.ok) {
      console.error("❌ Failed to fetch Google user info");
      return NextResponse.json(
        { error: "Failed to fetch user info from Google" },
        { status: 401 }
      );
    }

    const user: User = await googleRes.json();

    // Generate a session ID (for demonstration, use a random string)
    const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Store session in memory (not persistent, not for production)
    sessionStore.set(sessionId, createSessionData(user, token));

    // Redirect with sessionId as a query parameter (or you could use other mechanisms)
    const redirectUrl = new URL("/menu", req.url);
    redirectUrl.searchParams.set("sessionId", sessionId);

    return NextResponse.redirect(redirectUrl);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";

    console.error("❌ API /auth/set-cookie ERROR:", errorMessage);

    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
