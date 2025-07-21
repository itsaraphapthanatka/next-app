import axios from "axios";

export const getDecorations = async (token: string) => {
    console.log("token in getDecorations", token);
    console.log("process.env.BACKEND_PUBLIC_API in getDecorations", process.env.NEXT_PUBLIC_BACKEND_API);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/decorations/gets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
