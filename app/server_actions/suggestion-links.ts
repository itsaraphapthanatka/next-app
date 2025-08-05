import axios from "axios";

export const getSuggestionLinks = async (propertyId: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/get-suggestion-links/${propertyId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return {
        status: response.status,
        data: response.data,
    };
}

export const getGetLink = async (propertyId: number, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/get-links/${propertyId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return {
        status: response.status,
        data: response.data,
    };
}
