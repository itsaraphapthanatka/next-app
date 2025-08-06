"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, Select} from "antd";
import { getRevealCount } from "@/app/server_actions/reveal-count";
import { ModalFilter } from "../components/ModalFilter";
import { getProjectsName } from "@/app/server_actions/projectsName";
import TableAssign from "./TableAssign";

interface AssignSearchFromProps {
  className?: string;
  token: string;
}

export const AssignSearchFrom = ({ className = "", token }: AssignSearchFromProps) => {
  const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);
  const [revealCount, setRevealCount] = useState(0);
  const maxReveal = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    
    getRevealCount(token).then((data) => {
      setRevealCount(data);
    });
    window.addEventListener('propertySelectionCount', handleSelectionCount as unknown as EventListener);
  
    return () => {
      window.removeEventListener('propertySelectionCount', handleSelectionCount as unknown as EventListener);
    };
  }, [token]);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const event = new CustomEvent("assignTableReload", {
      detail: {
        projectName: values.projectNameSearch ?? "",
        addressUnit: values.addressUnitSearch ?? "",
        page: 1,
        pageSize: 10,
      },
    });
    window.dispatchEvent(event);
  };

  const handleFilter = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
  };

  const handleFilterSearch = () => {
    const values = form.getFieldsValue();
    const event = new CustomEvent('assignTableReload', {
      detail: { projectName: values.projectNameFilter ?? "", addressUnit: values.addressUnitFilter ?? ""  , page: 1, pageSize: 10 }
    });
    window.dispatchEvent(event);
    handleClose();
  };

  const handleResetFilter = () => {
    form.resetFields();
  };

  const handleProjectNameChange = async (value: string) => {
    if (value.length < 3) return;
  
    const result = await getProjectsName(token, value);
  
    const options = result.map((name: string) => ({
      label: name,
      value: name,
    }));
  
    setProjectsName(options);
  };

  const handleSelectionCount = (selectedIds: number[]) => {
    setRevealCount(Math.min(selectedIds.length, maxReveal));
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

        <Form.Item name="addressUnitSearch" style={{ marginBottom: 10 }}>
          <Input
            size="large"
            placeholder="Enter address or unit code"
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
          <Button color="blue" size='large'
            variant="solid"
            onClick={handleFilter}
            className="flex-1"
          >
            Filter
          </Button>
        </div>
        <div className="flex gap-3 pt-2">
        <Button color="default" size="large"
          variant="solid"
          className="w-full"
        >
           Reveal Contact. ({revealCount}/{maxReveal})
        </Button>
        </div>
      </Form>
      
      <Modal
        title="Property Filter"
        open={isModalOpen}
        style={{ top: 20 }}
        onCancel={handleClose}
        cancelText="Close"
        footer={
          <div className="flex gap-2 justify-end" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
            <Button color="default" size="small" variant="outlined" onClick={handleCopyLink}>
              Copy Link
            </Button>
            <Button color="default" size="small" variant="outlined" onClick={handleResetFilter}>
              Reset Filter
            </Button>
            <Button color="danger" size="small" variant="outlined" onClick={handleFilterSearch}>
              Search
            </Button>
            <Button color="default" size="small" variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
        }
        styles={{
          header: {
            padding: '10px',
            borderBottom: '1px solid #f0f0f0',
          },
          body: {
            padding: '10px',
          },
        }}
      >
        <div>
            <ModalFilter form={form} moduleType="property" token={token} />
        </div>
      </Modal>
      
      <TableAssign token={token} />
    </Card>
    </>
  );
};