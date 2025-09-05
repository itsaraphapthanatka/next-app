import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import { getDataEditProject, saveDataEditProject } from "@/app/server_actions/project";
import { useEffect, useState } from "react";
import { App as AntdApp } from "antd";

type ProjectDetail = {
  id?: number;
};

type User = {
  firstName: string;
  lastName: string;
  id: number;
};

export const DataEditTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  const [project, setProject] = useState<ProjectDetail>({});
  const [formDataEdit] = Form.useForm();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const { message } = AntdApp.useApp();
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  
  useEffect(() => {
    getDataEditProject(selectedProject.id as number, token).then((data) => {
    if(data.displayStatus === "WaitForApprove"){
      setIsSaveDisabled(true);
    }else{
      setIsSaveDisabled(false);
    }
    setProject(data);
    formDataEdit.setFieldsValue({
        ...data,
      });
    });
    console.log("project", project);
  }, [selectedProject.id, token]);
  const handleSave = async () => {
    setLoading(true);
    const formdata = formDataEdit.getFieldsValue();
    const data = {
      id: selectedProject.id as number,
      projectId: selectedProject.id as number,
      juristicCompanyName: formdata.juristicCompanyName,
      juristicContactName: formdata.juristicContactName,
      juristicContactPosition: formdata.juristicContactPosition,
      juristicContactPhoneNumber: formdata.juristicContactPhoneNumber,
      parkingSpace: formdata.parkingSpace,
      parkingSpaceRemark: formdata.parkingSpaceRemark,
      maintenanceFee: formdata.maintenanceFee,
      workFlowStatus: "WaitForApprove",
      senderId: (session?.data?.user as User).id as number,
      approverId: 0,
      sendDate: new Date().toISOString(),
      approveDate: new Date().toISOString(),
      notApproveReason: "",
      monthlyAverageRentalPrice: formdata.monthlyAverageRentalPrice,
      monthlyAverageSellingPrice: formdata.monthlyAverageSellingPrice,
      displayStatus: "WaitForApprove",
      senderName: (session?.data?.user as User).firstName + " " + (session?.data?.user as User).lastName,
    };
    const res = await saveDataEditProject(data, token);
    if (res.status === 200) {
      message.success("Data saved successfully");
      setLoading(false);
      setIsSaveDisabled(true);
    } else {
      message.error("Failed to save data");
      setLoading(false);
      setIsSaveDisabled(false);
    }
  };
  return (
    <>
        <Form
            layout="vertical"
            name="dataEditForm"
            form={formDataEdit}
        >
            <p style={{ marginTop: "24px" }}>Request By {session?.data?.user?.email}</p>
            <Form.Item name="juristicCompanyName" label="Juristic Customer Name" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="juristicContactName" label="Contact Name" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="juristicContactPosition" label="Contact Position" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="juristicContactPhoneNumber" label="Contact Phone Number" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="parkingSpace" label="Parking Space (%)" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="parkingSpaceRemark" label="Parking Space Remark" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    rows={6}
                />
            </Form.Item>
            <Form.Item name="maintenanceFee" label="Maintenance Fee" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="monthlyAverageRentalPrice" label="Monthly Average Rental Price" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="monthlyAverageSellingPrice" label="Monthly Average Selling Price" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
        </Form>
        <div className="flex w-full mt-4">
            <Button block color="green" variant="solid" onClick={handleSave} disabled={isSaveDisabled} loading={loading} style={{ backgroundColor: isSaveDisabled ? "#fd7e14" : "#fff", color: isSaveDisabled ? "#000" : "#fff" }}> {isSaveDisabled ? "Wait For Approve" : "Send To Approve"}</Button>
        </div>
    </>
);
};
