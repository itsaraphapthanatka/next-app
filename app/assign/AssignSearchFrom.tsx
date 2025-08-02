"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, message} from "antd";
import { RequestProp } from "@/app/property/RequestProp";
import { getRevealCount } from "@/app/server_actions/reveal-count";
import Swal from "sweetalert2";
import { ModalFilter } from "../components/ModalFilter";

interface AssignSearchFromProps {
  className?: string;
  token: string;
}

export const AssignSearchFrom = ({ className = "", token }: AssignSearchFromProps) => {
  const [projectName, setProjectName] = useState("");
  const [addressUnit, setAddressUnit] = useState("");
  const [revealCount, setRevealCount] = useState(0);
  const maxReveal = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRequestPropOpen, setIsRequestPropOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  console.log("token in AssignSearchFrom : ", token);
  useEffect(() => {
    const handleSelectionCount = (e: CustomEvent) => {
      setRevealCount(Math.min(e.detail, maxReveal));
    };
    getRevealCount(token).then((data) => {
      setRevealCount(data);
    });
    console.log("revealCount in AssignSearchFrom", revealCount);
    window.addEventListener('propertySelectionCount', handleSelectionCount as EventListener);
  
    return () => {
      window.removeEventListener('propertySelectionCount', handleSelectionCount as EventListener);
    };
  }, [token]);

  const handleSearch = () => {
    console.log("Search clicked", { projectName });
    const event = new CustomEvent('assignTableReload', {
      detail: { projectName, addressUnit }
    });
    window.dispatchEvent(event);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    setIsModalOpen(true);
  };

  const handleRequestProp = () => {
   if(revealCount < 1){
    messageApi.open({
      type: 'warning',
      content: 'Please select item less than 1 item for assign to Sale',
      duration: 10,
    });
   }else{setIsRequestPropOpen(true);}
  };

  const handleCloseRequestProp = () => {
    setIsRequestPropOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAssignProp = () => {
    Swal.fire({
      title: 'บันทึกสำเร็จ',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      setIsRequestPropOpen(false);
    });
  };

  const handleFilterSearch = () => {
    const values = form.getFieldsValue();
    console.log("Filter Search clicked", values);
    const event = new CustomEvent('assignTableReload', {
      detail: { projectName: values.projectNameFilter ?? "", addressUnit: values.addressUnitFilter ?? ""  , page: 1, pageSize: 10 }
    });
    window.dispatchEvent(event);
    handleClose();
  };

  const handleResetFilter = () => {
    form.resetFields();
    console.log("Reset Filter clicked");
  };


  return (
    <>
    {contextHolder}
    
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
          <Button color="green" size="large"
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
            Reveal Contact. ({revealCount}/{maxReveal})
        </Button>
        </div>
      </div>
      <Modal
        title="Property Filter"
        open={isModalOpen}
        style={{ top: 20 }}
        onCancel={handleClose}
        cancelText="Close"
        footer={
          <div className="flex gap-2 justify-end" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
            <Button color="default" size="small" variant="outlined" onClick={handleResetFilter}>
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
            borderBottom: '1px solid #f0f0f0', // ✅ เส้นใต้ title
          },
          body: {
            padding: '10px',
            // maxHeight: '60vh',
            // overflowY: 'auto',
          },
        }}
      >
        <div>
            <ModalFilter form={form} moduleType="assign" token={token} />
        </div>
      </Modal>
      <Modal
        title="Request Property"
        open={isRequestPropOpen}
        onCancel={handleCloseRequestProp}
        footer={
          <div className="flex gap-2 justify-end" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
            <Button color="blue" size="middle" variant="solid" onClick={handleAssignProp}>
              Request
            </Button>
            <Button color="default" size="middle" variant="outlined" onClick={handleCloseRequestProp}>
              Cancel
            </Button>
          </div>
        }
      >
        <RequestProp selectedIds={[]} setEnqNo={() => {}} enqNo={""} />
      </Modal>
    </Card>
    </>
  );
};