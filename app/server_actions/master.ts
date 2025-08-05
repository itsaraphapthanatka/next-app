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