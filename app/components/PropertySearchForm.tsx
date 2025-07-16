"use client";

import { useState } from "react";
import { Card, Input, Button, Modal } from "antd";

interface PropertySearchFormProps {
  className?: string;
}

export const PropertySearchForm = ({ className = "" }: PropertySearchFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [addressUnit, setAddressUnit] = useState("");
  const [requestCount] = useState(0);
  const maxRequests = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleSearch = () => {
    console.log("Search clicked", { projectName });
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    setIsModalOpen(true);
  };

  const handleRequestProp = () => {
    console.log("Request Property clicked");
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className={`p-6 w-full max-w-md space-y-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex gap-3">
        <Input size="large"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-1/2"
        />
        </div>
        <div className="flex gap-3">
        <Input size="large"
          placeholder="Select from address or unit code"
          value={addressUnit}
          onChange={(e) => setAddressUnit(e.target.value)}
          className="w-1/2"
        />
        </div>
        <div className="flex gap-3">
          <Button color="cyan" size="large"
            variant="solid"
            onClick={handleSearch}
            className="flex-1"
          >
            Search
          </Button>
          <Button color="primary" size='large'
            variant="solid"
            onClick={handleFilter}
            className="flex-1"
          >
            Filter
          </Button>
        </div>
        <div className="flex gap-3">
            <Button color="default" size="large"
            variant="solid"
            onClick={handleRequestProp}
            className="w-full"
            >
            Request Prop. ({requestCount}/{maxRequests})
            </Button>
        </div>
      </div>
      <Modal
        title="Property Detail"
        open={isModalOpen}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Card>
  );
};