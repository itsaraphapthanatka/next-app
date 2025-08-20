"use client";

import {  useState } from "react";
import { Card, Button, Form, Select} from "antd";
import { getProjectsName } from "@/app/server_actions/projectsName";
import TableProject from "./TableProject";

interface ProjectSearchFromProps {
  className?: string;
  token: string;
}

export const ProjectSearchFrom = ({ className = "", token }: ProjectSearchFromProps) => {
  const [form] = Form.useForm();
  const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);



  const handleSearch = () => {
    const values = form.getFieldsValue();

    const event = new CustomEvent("projectTableSearch", {
      detail: {
        projectName: values.projectNameSearch ?? "",
        page: 1,
        pageSize: 10,
      },
    });
    window.dispatchEvent(event);
  };



  const handleProjectNameChange = async (value: string) => {
    if (value.length < 3) return; // ป้องกันการยิง API ถ้าพิมพ์น้อยเกินไป
  
    const result = await getProjectsName(token, value);
  
    const options = result.map((name: string) => ({
      label: name,
      value: name,
    }));
  
    setProjectsName(options);
  };

  return (
    <>
    
    <Card className={`p-6 w-full space-y-4 ${className}`}>
    <Form form={form} layout="vertical">
        <Form.Item name="projectNameSearch" style={{ marginBottom: 10 }}>
          <Select
            allowClear
            showSearch
            placeholder="Select Project"
            size="large"
            onSearch={handleProjectNameChange}
            options={projectsName}
            filterOption={false}
          />
        </Form.Item>

        

        <div className="flex gap-3">
          <Button color="cyan" size="large"
            variant="solid"
            onClick={handleSearch}
            className="flex-1"
          >
            Search
          </Button>
        </div>
      </Form>
      
      
      <TableProject token={token} />
    </Card>
    </>
  );
};