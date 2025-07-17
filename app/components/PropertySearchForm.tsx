"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal } from "antd";

interface PropertySearchFormProps {
  className?: string;
}

export const PropertySearchForm = ({ className = "" }: PropertySearchFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [addressUnit, setAddressUnit] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const maxRequests = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  useEffect(() => {
    const handleSelectionCount = (e: CustomEvent) => {
      setRequestCount(Math.min(e.detail, maxRequests));
    };
  
    window.addEventListener('propertySelectionCount', handleSelectionCount as EventListener);
  
    return () => {
      window.removeEventListener('propertySelectionCount', handleSelectionCount as EventListener);
    };
  }, []);

  const handleSearch = () => {
    console.log("Search clicked", { projectName });
    const event = new CustomEvent('propertyTableReload', {
      detail: { projectName, addressUnit }
    });
    window.dispatchEvent(event);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    setIsModalOpen(true);
  };

  const handleRequestProp = () => {
    console.log("Request Property clicked");
  };

  const handleFilterSearch = () => {
    setModalText('Searching to your property...');
    setConfirmLoading(true);
    setTimeout(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    console.log("Copy Link clicked");
  };

  const handleResetFilter = () => {
    console.log("Reset Filter clicked");
  };

  return (
    <Card className={`p-6 w-full space-y-4 ${className}`}>
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
          <Button color="blue" size='large'
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
        onCancel={handleClose}
        confirmLoading={confirmLoading}
        cancelText="Close"
        footer={(_, { CancelBtn }) => (
            <>
              <Button color="default"
              size="small"
              variant="outlined"
              onClick={handleCopyLink}
              >Copy Link</Button>
              <Button color="default"
              size="small"
              variant="outlined"
              onClick={handleResetFilter}
              >Reset Filter</Button>
              <Button color="danger"
              size="small"
              variant="outlined"
              onClick={handleFilterSearch}
              >Search</Button>
              <CancelBtn />
            </>
          )}
      >
        <p>{modalText}</p>
      </Modal>
    </Card>
  );
};