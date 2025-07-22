"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, Select} from "antd";
import { RequestProp } from "@/app/property/RequestProp";
// import { PropertyFilterForm } from "./PropertyFilterForm";
import Swal from "sweetalert2";

interface PropertySearchFormProps {
  className?: string;
}

export const PropertySearchForm = ({ className = "" }: PropertySearchFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [addressUnit, setAddressUnit] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const maxRequests = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRequestPropOpen, setIsRequestPropOpen] = useState(false);

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
   
    setIsRequestPropOpen(true);
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
    const event = new CustomEvent('propertyTableReload', {
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
        title="Property Filter"
        open={isModalOpen}
        style={{ top: 20 }}
        onCancel={handleClose}
        cancelText="Close"
        footer={
          <div className="flex gap-2 justify-end" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
            <Button color="default" size="middle" variant="outlined" onClick={handleResetFilter}>
              Copy Link
            </Button>
            <Button color="default" size="middle" variant="outlined" onClick={handleResetFilter}>
              Reset Filter
            </Button>
            <Button color="danger" size="middle" variant="outlined" onClick={handleFilterSearch}>
              Search
            </Button>
            <Button color="default" size="middle" variant="outlined" onClick={handleClose}>
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
          <Form
            form={form}
            layout="vertical"
            name="propertyFilter"
          
          >
          <div className="gap-3 w-full">
            <Form.Item
              label="Project"
              name="projectNameFilter"
              style={{ marginBottom: "10px" }}
            >
              <Input placeholder="Project Name" size="large" />
            </Form.Item>
          </div>
          <div className="gap-3 w-full">
            <Form.Item
              label="Unit Type"
              name="addressUnitFilter"
              style={{ marginBottom: "10px" }}
            >
              <Input placeholder="Unit Type" size="large" />
            </Form.Item>
          </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Size"
                name="minSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Size" size="large" />
              </Form.Item>
              <Form.Item
                label="Max. Size"
                name="maxSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Size" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Bed Room"
                name="bedRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bed Room" size="large" />
              </Form.Item>
              <Form.Item
                label="Bath Room"
                name="bathRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bath Room" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate On  Web"
                name="minRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate On Web" size="large"/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate On Web"
                name="maxRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate On Web" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate Per SQM"
                name="minRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate Per SQM"
                name="maxRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Floor"
                name="minFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Floor" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Floor"
                name="maxFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Floor" size="large" />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Status"
                name="propertyStatus"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Property Status" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Have Picture"
                name="havePicture"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Show on Web"
                name="showOnWeb"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Hot Deal"
                name="hotDeal"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="For Rent/Sale Status"
                name="forRentSaleStatus"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Foreigner Owner"
                name="foreignerOwner"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Mass Transit"
                name="massTransit"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Mass Transit" size="large" disabled />
              </Form.Item>
            </div>
            <div className="gap-3 flex w-full">
              <Form.Item
                label="Start Distance (Meter)"
                name="startDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Start Distance (Meter)" size="large" />
              </Form.Item>
              <Form.Item
                label="To Distance (Meter)"
                name="toDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="To Distance (Meter)" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Fix Parking"
                name="fixParking"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Duplex Loft"
                name="duplexLoft"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Pet Friendly"
                name="petFriendly"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Private Lift"
                name="privateLift"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Penthouse"
                name="penthouse"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Type"
                name="propertyType"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Property Type" size="large" disabled />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="VIP Status"
                name="vipStatus"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="VIP Status" size="large" disabled />
              </Form.Item>
            </div>
          </Form>
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
        <RequestProp />
      </Modal>
    </Card>
  );
};