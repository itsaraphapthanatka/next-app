import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

        // ✅ เรียก Google User Info API
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
    
        const user = await googleRes.json();
        console.log("✅ Google User Info:", user);

    // เก็บ session google user
    // สมมติว่าเราต้องการเก็บ user info ใน session (เช่นใน cookie)
    // จะเก็บ user object ใน cookie (encode เป็น JSON string และ base64)
    const userSession = Buffer.from(JSON.stringify(user)).toString("base64");
    // สร้าง cookie เพิ่มสำหรับ user session
    // หมายเหตุ: ใน production ควรเข้ารหัสข้อมูล user ก่อนเก็บใน cookie จริง
    // (หรือใช้ server-side session store)
    // แต่ที่นี่เก็บแบบ base64 เฉยๆ เพื่อความง่าย
    // จะ set ใน response หลังจากนี้

    // ✅ สร้าง response object ก่อน
    const response = NextResponse.redirect(new URL("/menu", req.url));

    // ✅ ใช้ response.cookies.set แทน
    response.cookies.set({
      name: "serve_user",
      value: userSession,
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
