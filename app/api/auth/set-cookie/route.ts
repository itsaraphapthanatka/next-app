import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const response = NextResponse.redirect(new URL("/menu", req.url));

    response.headers.set(
      "Set-Cookie",
      serialize("serve_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      })
    );

    return response;
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
