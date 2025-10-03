import axios from "axios";

export const getPropertyStatuses = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/propertystatuses/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getMasstransits = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/masstransits/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getPropertyTypes = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/propertytypes/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getVipStatuses = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/vipstatuses/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getEmployees = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/employees/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getKeycards= async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/keycardwiths/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDeveloperBands = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/developer-bands/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getAreas = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/areas/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}   

export const getProvinces = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/provinces/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDistricts = async (token: string, provinceId: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/district/gets/${provinceId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getSubDistricts = async (token: string, districtId: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/subdistrict/gets/${districtId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getFacilities = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/facilities/projects/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getPurposes = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/purposes/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getLeadStatuses = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/leadstatuses/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getLeadSources = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/leadsources/gets`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}