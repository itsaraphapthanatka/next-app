import axios, { AxiosResponse } from "axios";



console.log("BACKEND_PUBLIC_API : ", process.env.BACKEND_PUBLIC_API);
console.log("NEXT_PUBLIC_API : ", process.env.NEXT_PUBLIC_API);

type PropertyBackOfficeSortType =
  | "Project"
  | "Address"
  | "UnitCode"
  | "INVID"
  | "Tower"
  | "Floor"
  | "Size"
  | "BedRoom"
  | "BathRoom"
  | "RentalPrice"
  | "SellingPrice"
  | "LastedUpdate"
  | "Status"
  | "RentalPG"
  | "SalePG";

interface PropertyPageParams {
  current: number;
  size: number;
}

interface GetPropertiesParams {
  project?: string | "";
  search?: string | "";
  page?: PropertyPageParams;
  sortBy?: PropertyBackOfficeSortType;
  orderBy?: string;
}

export const getProperties = async (params?: GetPropertiesParams,token?:string) => {
    // const cookieStore = await cookies();
    // const cookie = cookieStore.get("accessToken");
    // const token = cookie?.value;
    console.log('property token',token)
  const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/proxy/property`,
      // `https://api.serve.co.th/properties/gets`,
      {
      project: params?.project ?? "",
      search: params?.search ?? "",
      page: {
        current: params?.page?.current ?? 0,
        size: params?.page?.size ?? 0,
      },
      sortBy: params?.sortBy ?? "project",
      orderBy: params?.orderBy ?? "asc",
    },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
      
    }
  );
  return response.data;
};