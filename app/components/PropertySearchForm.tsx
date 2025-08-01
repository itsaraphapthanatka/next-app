"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, message, Select} from "antd";
import { RequestProp } from "@/app/property/RequestProp";
import { getSaleLimit } from "@/app/server_actions/saleLimit";
import Swal from "sweetalert2";
import { ModalFilter } from "./ModalFilter";
import { getProjectsName } from "@/app/server_actions/projectsName";

interface PropertySearchFormProps {
  className?: string;
  token: string;
}

export const PropertySearchForm = ({ className = "", token }: PropertySearchFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [addressUnit, setAddressUnit] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const maxRequests = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRequestPropOpen, setIsRequestPropOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [saleLimit, setSaleLimit] = useState(0);
  const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);
  useEffect(() => {
    const handleSelectionCount = (e: CustomEvent) => {
      setRequestCount(Math.min(e.detail, maxRequests));
    };
    getSaleLimit(token).then((data) => {
      setSaleLimit(data);
    });
    console.log("saleLimit in PropertySearchForm", saleLimit);
    window.addEventListener('propertySelectionCount', handleSelectionCount as EventListener);
  
    return () => {
      window.removeEventListener('propertySelectionCount', handleSelectionCount as EventListener);
    };
  }, [token]);

   const handleProjectNameSearch = async (value: string) => {
    const response = await getProjectsName(token, value);
    setProjectsName(response);
  };

  const handleSearch = () => {
    const values = form.getFieldsValue();
    console.log("Search clicked", values);

    const event = new CustomEvent("propertyTableReload", {
      detail: {
        projectName: values.projectNameFilter ?? "",
        addressUnit: values.addressUnitFilter ?? "",
        page: 1,
        pageSize: 10,
      },
    });

    window.dispatchEvent(event);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    setIsModalOpen(true);
  };

  const handleRequestProp = () => {
   if(requestCount < 1){
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
    const event = new CustomEvent('propertyTableReload', {
      detail: { 
        projectName: values.projectNameFilter ?? "", 
        unitTypeIds: Array.isArray(values.unitTypeFilter) ? values.unitTypeFilter.map(String) : [],
        startSize: values.startSize ?? 0,
        toSize: values.toSize ?? 0,
        bedRoom: values.bedRoom ?? 0,
        bathRoom: values.bathRoom ?? 0,
        startRentalRate: values.startRentalRate ?? 0,
        toRentalRate: values.toRentalRate ?? 0,
        startRentalRatePerSQM: values.startRentalRatePerSQM ?? 0,
        toRentalRatePerSQM: values.toRentalRatePerSQM ?? 0,
        startSellingRate: values.startSellingRate ?? 0,
        toSellingRate: values.toSellingRate ?? 0, 
        startSellingRatePerSQM: values.startSellingRatePerSQM ?? 0,
        toSellingRatePerSQM: values.toSellingRatePerSQM ?? 0,
        decorationIds: Array.isArray(values.decorationIds) ? values.decorationIds.map(String) : [],
        pictureStatusIds: Array.isArray(values.pictureStatusIds) ? values.pictureStatusIds.map(String) : [],
        startFloor: values.startFloor ?? 0,
        toFloor: values.toFloor ?? 0,
        propertyStatusIds: Array.isArray(values.propertyStatusIds) ? values.propertyStatusIds.map(String) : [],
        showOnWeb: values.showOnWeb ?? 0,
        hotDeal: values.hotDeal ?? 0,
        havePicture: values.havePicture ?? 0,
        forRentOrSale: values.forRentOrSale ?? 0,
        railwayStationId: values.railwayStationId ?? 0,
        startDistance: values.startDistance ?? 0,
        toDistance: values.toDistance ?? 0,
        forwardMKT: values.forwardMKT ?? 0,
        petFriendly: values.petFriendly ?? 0,
        privateLift: values.privateLift ?? 0,
        duplex: values.duplex ?? 0,
        penthouse: values.penthouse ?? 0,
        fixParking: values.fixParking ?? 0,
        projectTypeIds: Array.isArray(values.projectTypeIds) ? values.projectTypeIds.map(String) : [],
        bootedProppit: values.bootedProppit ?? 0,
        vipStatusIds: Array.isArray(values.vipStatusIds) ? values.vipStatusIds.map(String) : [],
        foreignerOwner: values.foreignerOwner ?? 0,
      }
    });
    window.dispatchEvent(event);
    handleClose();
  };

  const handleResetFilter = () => {
    form.resetFields();
    console.log("Reset Filter clicked");
  };

  const handleCopyLink = () => {
    console.log("Copy Link clicked");
  };

  const handleProjectNameChange = async (value: string) => {
    if (value.length < 3) return; // ป้องกันการยิง API ถ้าพิมพ์น้อยเกินไป
  
    console.log("value project name", value);
    const result = await getProjectsName(token, value);
    console.log("projectsName", result);
  
    const options = result.map((name: string) => ({
      label: name,
      value: name,
    }));
  
    setProjectsName(options);
  };

  return (
    <>
    {contextHolder}
    
    <Card className={`p-6 w-full space-y-4 ${className}`}>
    <Form form={form} layout="vertical">
        <Form.Item name="projectNameFilter" style={{ marginBottom: 10 }}>
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

        <Form.Item name="addressUnitFilter" style={{ marginBottom: 10 }}>
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
          onClick={handleRequestProp}
          className="w-full"
        >
          Request Prop. ({requestCount === 0 ? null : requestCount + "/"} {saleLimit})
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
            <ModalFilter form={form} moduleType="property" token={token} />
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
    </>
  );
};