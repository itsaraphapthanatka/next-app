import axios from "axios";

export const getProjects = async (token: string, page: number, size: number, search?: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/filters`,
        {
            page: {
                current: page,
                size: size,
            },
            search: search ?? "",
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
}