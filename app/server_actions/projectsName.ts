import axios from "axios";

export const getProjectsName = async (token: string, projectName: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/gets/${projectName}`,
        {
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );
    return response.data;
}