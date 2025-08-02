import axios from "axios";

export const createSaleRequest = async (enqNo: string, selectedIds: number[], token: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/sale-requests/create`,
        {
            enqNo,
            properties: selectedIds
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
};