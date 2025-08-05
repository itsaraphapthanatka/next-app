import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/download-original-files/${id}`, {
        headers: {
            "Accept": "application/octet-stream",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
    });
    console.log("response download-original-files", response);
    return NextResponse.json(response);
}