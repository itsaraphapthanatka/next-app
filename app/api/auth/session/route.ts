import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("serve_session");

  if (!cookie) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  try {
    // decode cookie, but don't return full session
    const base64 = cookie.value;
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const session = JSON.parse(json);

    if (session?.user?.id) {
      return NextResponse.json({ loggedIn: true, user: { email: session?.user?.email, firstName: session?.user?.firstName } }, { status: 200 });
    }
  } catch {
    // ignore error
  }

  return NextResponse.json({ loggedIn: false }, { status: 200 });
}
