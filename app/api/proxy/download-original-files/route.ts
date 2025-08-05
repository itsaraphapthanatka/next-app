// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const token = searchParams.get("token");

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/download-original-files/${id}`, {
//         headers: {
//             "Accept": "application/octet-stream",
//             "Authorization": `Bearer ${token}`,
//             "Access-Control-Allow-Origin": "*",
//         },
//     });
//     console.log("response download-original-files", response);
//     return NextResponse.json(response);
// }


import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/download-original-files/${id}`;

  const response = await fetch(backendUrl, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/octet-stream",
    },
  });

  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const contentDisposition = response.headers.get("content-disposition") || "";

  const body = response.body;

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}
