import axios from "axios";
interface EditData {
    propertyId: number,
    propertyStatusId: number,
    rentalPrice: number,
    availableOn: string,
    sellingPrice: number,
    keycardWithId: number,
    keyHolderTelephone: string,
    keycardDetail: string,
    sellingCondition: string,
    workFlowStatus: string,
    senderId: number,
    approverId: number,
    sendDate: string,
    approveDate: string,
    notApproveReason: string,
    senderName: string
}

export const getEditData = async (token: string,id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/properties/data-edits/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const saveEditData = async (token: string, data: EditData) => {
    const response = await axios.post(
        `/api/proxy/edit-data`, 
        data,
        {
            headers: {
                accept: "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        }
    );
    return response.data;
};
