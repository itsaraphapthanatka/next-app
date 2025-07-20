import axios from "axios";

export const getUnitType = async (token: string) => {
    const response = await axios.get("/api/proxy/unittype", {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return response.data;
}
