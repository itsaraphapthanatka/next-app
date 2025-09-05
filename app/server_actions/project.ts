import axios, { AxiosResponse } from "axios";

export const getProjects = async (token: string, page: number, size: number, search?: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/filters`,
        {
            page: {
                current: page,
                size: size,
            },
            search: search ?? "",
        },
        {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

export const getProjectById = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getProjectPictures = async (id: number,token?:string) => {
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/pictures/${id}`,
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

export const updateProjectSortIndex = async (
    token: string,
    newItemsId: {"id": string}[]
  ) => {
  
    console.log("newItemsId in updateProjectSortIndex server",newItemsId);
    const response: AxiosResponse = await axios.post(
      `/api/proxy/sortProjectPicture`,
      newItemsId,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
};

export const getFacilitiesById = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/facilities/gets/?id=${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export const getMasstransitsById = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/distances/?id=${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export const getAverageMonthlyByProjectId = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/average-monthly/gets/?id=${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export const getTowersById = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/towers/gets/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export const getFollowUpById = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/follow-by/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export interface SaveProjectFollowupParams {
  id: number;
  remark: string;
  followUpType: number;
  closeJob: boolean;
  saleRequestItemId: number;
  toSalePropertyId: number;
}

export const saveProjectFollowup = async (
  data: SaveProjectFollowupParams,
  token: string
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/follow-by`,
    data,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return {data: response.data, status: response.status};
};

export const getDataEditProject = async (id: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/data-edit/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
}

export const saveDataEditProject = async (data: any, token: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/data-edit`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    return {data: response.data, status: response.status};
}
