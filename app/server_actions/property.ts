import axios, { AxiosResponse } from "axios";

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

export const getProperties = async (params?: GetPropertiesParams,token?:string,projectName?:string,addressUnit?:string) => {
    console.log('projectName',projectName)
    console.log('addressUnit',addressUnit)
  const response: AxiosResponse = await axios.post(
      `/api/proxy/property`,
      // `https://api.serve.co.th/properties/gets`,
      {
      project: projectName ?? "",
      search: addressUnit ?? "",
      page: {
        current: params?.page?.current ?? 0,
        size: params?.page?.size ?? 0,
      },
      sortBy: params?.sortBy ?? "LastedUpdate",
      orderBy: params?.orderBy ?? "DESC",
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