import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("serve_session");

  if (!cookie) {
    return NextResponse.json(null, { status: 200 });
  }

  try {
    const base64 = cookie.value;
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const session = JSON.parse(json);
    return NextResponse.json(session, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
