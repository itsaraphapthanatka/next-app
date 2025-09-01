import { getProjectById } from "@/app/server_actions/project";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

type ProjectDetail = {
  id?: number;
  propertyId?: number;
  no?: number;
  companyName?: string;
  contactName?: string;
  contactPosition?: string;
  contactPhone?: string;
  juristicCompanyName?: string;
  juristicCustomerName?: string;
  parkingSpacePercentage?: number;
};

export const JuristicTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  console.log("selectedProject", selectedProject);
  const [project, setProject] = useState<ProjectDetail>({});
  const [formJuristic] = Form.useForm();

  useEffect(() => {
    if (!selectedProject.id) return;
    getProjectById(selectedProject.id as number, token).then((response) => {
      console.log("response.projectDetail", response);
      setProject(response);
      console.log("response.juristicCompanyName", response.juristicCompanyName);
      formJuristic.setFieldsValue({
        ...response,
        juristicCompanyName: response.juristicCompanyName,
        juristicCustomerName: response.juristicCustomerName,
        contactName: response.contactName,
        contactPosition: response.contactPosition,
        contactPhone: response.contactPhone,

      });
      
    });
    // eslint-disable-next-line
  }, [selectedProject.id, token]);

  return (
    <div>
      <Form 
        form={formJuristic}
        layout="vertical"
        name="tabsJuristicDetail"
      >
        <Form.Item
          name="juristicCompanyName"
          label="Company Name"
          initialValue={project.juristicCompanyName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Company Name" />
        </Form.Item>
        <Form.Item
          name="juristicCustomerName"
          label="Contact Name"
          initialValue={project.contactName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Contact Name" />
        </Form.Item>
        <Form.Item
          name="contactName"
          label="Contact Position"
          initialValue={project.contactPosition}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Contact Position" />
        </Form.Item>
        <Form.Item
          name="contactPhone"
          label="Contact Phone"
          initialValue={project.contactPhone}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Contact Phone" />
        </Form.Item>
      </Form>   
    </div>
  )};
