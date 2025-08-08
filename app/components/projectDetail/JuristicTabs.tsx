import { Form, Input, Tabs } from "antd";
import { useEffect, useState } from "react";

type ProjectDetail = {
  id?: number;
  propertyId?: number;
  no?: number;
  companyName?: string;
  contactName?: string;
  contactPosition?: string;
  contactPhone?: string;
};

export const JuristicTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  const [project, setProject] = useState<ProjectDetail>({});
  const [formJuristic] = Form.useForm();

  return (
    <div>
      <Form 
        form={formJuristic}
        layout="vertical"
        name="tabsJuristicDetail"
      >
        <Form.Item
          name="CompanyName"
          label="Company Name"
          initialValue={project.companyName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Company Name" />
        </Form.Item>
        <Form.Item
          name="ContactName"
          label="Contact Name"
          initialValue={project.contactName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Contact Name" />
        </Form.Item>
        <Form.Item
          name="ContactPosition"
          label="Contact Position"
          initialValue={project.contactPosition}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" placeholder="Enter Contact Position" />
        </Form.Item>
        <Form.Item
          name="ContactPhone"
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
