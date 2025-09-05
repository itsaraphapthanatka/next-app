import axios from "axios";

export const getDashboardData = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/summary/status-chart`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataPicture = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/summary/picture-chart`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataReadyForRent = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/summary/property-for-rent-chart`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataPropertyReadyForRent = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/project-ready-for-rent`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataPropertyNotReadyForRent = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/project-not-ready-for-rent`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataSearchKeyword = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/search-keyword`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDashboardDataProjectLessThenPicture = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/dashboard/project-less-than-five-picture`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}