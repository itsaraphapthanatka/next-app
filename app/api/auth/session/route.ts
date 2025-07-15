import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("serve_session");

  if (!cookie) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  try {
    const base64 = cookie.value;
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const session = JSON.parse(json);

    // เช็ค session ถ้าไม่หมดอายุ (มี user.id)
    if (session?.user?.id) {
      // redirect ไป /menu
      return NextResponse.redirect(new URL("/menu", req.url));
    }
  } catch {
    // ignore error
  }

  return NextResponse.json({ loggedIn: false }, { status: 200 });
}
