import axios from "axios";

interface AssignReportsParams {
    project?: string;
    search?: string;
    page: {
        current: number;
        size: number;
    };
    orderBy: string;
    assignReportSortBy: string;
}

export const getAssignReports = async (token: string, body: AssignReportsParams, projectName: string, addressUnit: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/assign-reports/search`,
        {
            ...body,
            project: projectName,
            search: addressUnit,
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

