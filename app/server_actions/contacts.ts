import axios from "axios";

export const getContacts = async (token: string, id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/contacts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}