import { UploadFile } from "antd";
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
  assignReportSortBy?: string;
}

interface SavePropertyFollowupParams {
  id: number;
  sourceId: number;
  followUpType: number;
  saleRequestItemId: number;
  toSalePropertyId: number;
  remark: string;
  closeJob: boolean;
}

export const getPropertySortIndex = async (idList: string[],token?:string) => {
  const response: AxiosResponse = await axios.get(
    `https://api.serve.co.th/properties/update-sortindex?idList=${idList}`,
    {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

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
        assignReportSortBy: params?.assignReportSortBy ?? "Duration",
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

export const getPropertyById = async (id: number,token?:string) => {
    const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/gets/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getPropertyPictures = async (id: number,token?:string) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/pictures/${id}`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPropertyFollowup = async (id: number,token?:string) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/follow-by/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const savePropertyFollowup = async (params?: SavePropertyFollowupParams,token?:string) => {
  console.log('params savePropertyFollowup',params)
const response: AxiosResponse = await axios.post(
    `/api/proxy/follow-by`,
    params,
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

export const uploadPropertyPictures = async (id: number, token: string, fileList: UploadFile[]) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/upload-pictures/${id}`,
    fileList,
    {
      headers: {
        accept: "text/plain",
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  return  {data: data, status: response.status };
};

export const updatePropertySortIndex = async (
  token: string,
  newItemsId: {"id": string}[]
) => {

  console.log("newItemsId in updatePropertySortIndex server",newItemsId);
  const response: AxiosResponse = await axios.post(
    `/api/proxy/sortPicture`,
    newItemsId,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getRevealStatus = async (
  token: string,
  id: number,
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/reveal-status/${id}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const updateRevealStatus = async (
  token: string,
  id: number,
) => {
  const response: AxiosResponse = await axios.post(
    `/api/proxy/reveal-status`,
    id,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  return response.data;
};



