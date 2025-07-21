import axios from "axios";

export const getPictureStatuses = async (token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/picturestatuses/gets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};