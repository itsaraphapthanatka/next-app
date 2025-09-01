import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";


export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("accessToken");
    const token = cookie?.value;
    const body = await req.json();

    console.log("Request body from client:", body);

    // แปลง array object เป็น string เพื่อส่งไปใน query param
    const idList = JSON.stringify(body);

    const response = await axios.post(
      `https://api.serve.co.th/projects/pictures/update-sortindex?idList=${encodeURIComponent(idList)}`,
      "", // body ไม่ต้องส่งอะไร
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from serve.co.th:", response.data);
    return new Response(JSON.stringify(response.data), { status: 200 });
} catch (err: unknown) {
    if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        console.error("Axios error:", axiosErr.response?.data || axiosErr.message);
        return new Response(
          JSON.stringify({ error: axiosErr.response?.data || axiosErr.message }),
          { status: 500 }
        );
    } else if (err instanceof Error) {
      console.error("Error:", err.message);
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    } else {
      console.error("Unknown error:", err);
      return new Response(JSON.stringify({ error: "Unknown error" }), { status: 500 });
    }
  }
}
