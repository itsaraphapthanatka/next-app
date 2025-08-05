import axios from "axios";

export async function getDownloadOriginalFiles(propertyId: number, token: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/download-original-files/${propertyId}`;
  
    const response = await axios.get(url, {
      headers: {
        Accept: "application/octet-stream",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // ใช้ blob เพื่อโหลดไฟล์
    });
  
    return response.data;
  }
  