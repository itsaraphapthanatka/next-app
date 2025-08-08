import { Form, Input, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

type ProjectDetail = {
  id?: number;
  propertyId?: number;
  no?: number;
  project?: string;
  size?: number;
  bed?: number;
  bath?: number;
};

export const DataEditTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
//   const [project, setProject] = useState<ProjectDetail>({});
  const [formDataEdit] = Form.useForm();
  const session = useSession();
  return (
    <>
        <Form
            layout="vertical"
            name="dataEditForm"
            form={formDataEdit}
        >
            <p style={{ marginTop: "24px" }}>Request By {session?.data?.user?.email}</p>
            <Form.Item name="juristicCustomerName" label="Juristic Customer Name" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="contactName" label="Contact Name" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="contactPosition" label="Contact Position" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="contactPhoneNumber" label="Contact Phone Number" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="parkingSpacePercentage" label="Parking Space (%)" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
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
            <Form.Item name="monthlyAverageSalePrice" label="Monthly Average Selling Price" initialValue={0} className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
        </Form>
    </>
);
};
