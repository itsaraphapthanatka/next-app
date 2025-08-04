import axios from "axios";

export const getEditData = async (token: string,id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/data-edits/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}