import axios, { AxiosResponse } from "axios";

const endpoint = process.env.NEXT_PUBLIC_API as string;

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
  project?: string | null;
  search?: string | null;
  page?: PropertyPageParams;
  sortBy?: PropertyBackOfficeSortType;
}

export const getProperties = async (params?: GetPropertiesParams) => {
  const token = localStorage.getItem("accessToken");
  const response: AxiosResponse = await axios.post(
    `${endpoint}/property/gets`,
    {
      project: params?.project ?? null,
      search: params?.search ?? null,
      page: {
        current: params?.page?.current ?? 0,
        size: params?.page?.size ?? 0,
      },
      sortBy: params?.sortBy ?? "Project",
    },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};