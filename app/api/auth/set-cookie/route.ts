import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

        // // ✅ เรียก Google User Info API
        // const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
    
        // if (!googleRes.ok) {
        //   console.error("❌ Failed to fetch Google user info");
        //   return NextResponse.json(
        //     { error: "Failed to fetch user info from Google" },
        //     { status: 401 }
        //   );
        // }
    
        // const user = await googleRes.json();
        // console.log("✅ Google User Info:", user);

    // ✅ สร้าง response object ก่อน
    const response = NextResponse.redirect(new URL("/menu", req.url));

    // ✅ ใช้ response.cookies.set แทน
    response.cookies.set({
      name: "serve_token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 วัน
    });

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
