import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties if needed
}

// Simple session utility (for demonstration, not production-ready)
function createSessionData(user: User, token: string) {
  // You might want to store only necessary user info
  return JSON.stringify({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
    createdAt: Date.now(),
  });
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
    console.log("✅ Google User Info:", user);

    // Create session data
    const sessionData = createSessionData(user, token);

    // Set session cookie
    // const response = NextResponse.redirect(new URL("/menu", req.url));
    // response.cookies.set({
    //   name: "serve_session",
    //   value: Buffer.from(sessionData).toString("base64"),
    //   path: "/",
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24, // 1 day
    // });

    console.log("✅ Session Data:", sessionData);

    // return response;
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
