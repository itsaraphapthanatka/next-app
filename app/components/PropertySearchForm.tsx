"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, Select} from "antd";
import { RequestProp } from "@/app/property/RequestProp";
import { getSaleLimit } from "@/app/server_actions/saleLimit";
import Swal from "sweetalert2";
import { ModalFilter } from "./ModalFilter";
import { getProjectsName } from "@/app/server_actions/projectsName";
import TableProperty from "./TableProperty";
import { createSaleRequest } from "../server_actions/sale-requests";
import { App } from "antd";
interface PropertySearchFormProps {
  className?: string;
  token: string;
}

export const PropertySearchForm = ({ className = "", token }: PropertySearchFormProps) => {
  const [requestCount, setRequestCount] = useState(0);
  const maxRequests = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isRequestPropOpen, setIsRequestPropOpen] = useState(false);
  const [saleLimit, setSaleLimit] = useState(0);
  const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [enqNo, setEnqNo] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { message } = App.useApp();
  useEffect(() => {
    const handleSelectionCount = (e: CustomEvent) => {
      setRequestCount(Math.min(e.detail, maxRequests));
    };
    getSaleLimit(token).then((data) => {
      setSaleLimit(data);
    });
    window.addEventListener('propertySelectionCount', handleSelectionCount as EventListener);
  
    return () => {
      window.removeEventListener('propertySelectionCount', handleSelectionCount as EventListener);
    };
  }, [token]);


  const handleSearch = () => {
    const values = form.getFieldsValue();

    const event = new CustomEvent("propertyTableSearch", {
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
    // form.resetFields();
    setIsModalOpen(true);
  };

  const handleRequestProp = () => {
   if(requestCount < 1){
    message.warning('Please select item less than 1 item for assign to Sale');
   }else{setIsRequestPropOpen(true);}
  };

  const handleCloseRequestProp = () => {
    setIsRequestPropOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAssignProp = async () => {
    const response = await createSaleRequest(enqNo, selectedIds, token);
    if (Array.isArray(response.errors) && response.errors.length === 0 && response.notHaveError === true) {
    Swal.fire({
      title: 'บันทึกสำเร็จ',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        setIsRequestPropOpen(false);
        const event = new CustomEvent('propertyTableSearch', { detail: { projectName: "", addressUnit: "" } });
        window.dispatchEvent(event);
        setSelectedIds([]);
        setEnqNo("");
        setRequestCount(0);
        getSaleLimit(token).then((data) => {
          setSaleLimit(data);
        }); 
      });
      // message.success('บันทึกสำเร็จ');
    }else{
      Swal.fire({
        title: 'บันทึกไม่สำเร็จ',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      setIsRequestPropOpen(false);
    }
  };

  const handleFilterSearch = () => {

    const values = form.getFieldsValue();
    const event = new CustomEvent('propertyTableReload', {
      detail: { 
        projectName: values.projectNameFilter ?? "", 
        unitTypeIds: Array.isArray(values.unitTypeFilter) ? values.unitTypeFilter.map(String) : [],
        startSize: values.minSize ?? 0,
        toSize: values.maxSize ?? 0,
        bedRoom: values.bedRoom ?? 0,
        bathRoom: values.bathRoom ?? 0,
        startRentalRate: values.minRentalRateOnWeb ?? 0,
        toRentalRate: values.maxRentalRateOnWeb ?? 0,
        startRentalRatePerSQM: values.minRentalRatePerSQM ?? 0,
        toRentalRatePerSQM: values.maxRentalRatePerSQM ?? 0,
        startSellingRate: values.minSellingRate ?? 0,
        toSellingRate: values.maxSellingRate ?? 0, 
        startSellingRatePerSQM: values.minSellingRatePerSQM ?? 0,
        toSellingRatePerSQM: values.maxSellingRatePerSQM ?? 0,
        decorationIds: Array.isArray(values.decorationIds) ? values.decorationIds.map(String) : [],
        pictureStatusIds: Array.isArray(values.pictureStatusIds) ? values.pictureStatusIds.map(String) : [],
        startFloor: values.minFloor ?? 0,
        toFloor: values.maxFloor ?? 0,
        propertyStatusIds: Array.isArray(values.propertyStatusIds) ? values.propertyStatusIds.map(String) : [],
        showOnWeb: values.showOnWeb ?? 0,
        hotDeal: values.hotDeal ?? 0,
        havePicture: values.havePicture ?? 0,
        forRentOrSale: values.forRentSaleStatus ?? 0,
        railwayStationId: values.railwayStationId ?? 0,
        startDistance: values.startDistance ?? 0,
        toDistance: values.toDistance ?? 0,
        forwardMKT: values.forwardMKT ?? 0,
        petFriendly: values.petFriendly ?? 0,
        privateLift: values.privateLift ?? 0,
        duplex: values.duplexLoft ?? 0,
        penthouse: values.penthouse ?? 0,
        fixParking: values.fixParking ?? 0,
        projectTypeIds: Array.isArray(values.propertyType) ? values.propertyType.map(String) : [],
        bootedProppit: values.bootedProppit ?? 0,
        vipStatusIds: Array.isArray(values.vipStatus) ? values.vipStatus.map(String) : [],
        foreignerOwner: values.foreignerOwner ?? 0,
        massTransit: Array.isArray(values.massTransit) ? values.massTransit.map(String) : [],
        revealStatus: values.revealStatus ?? 0,
        assignerName: Array.isArray(values.assignFrom) ? values.assignFrom.map(String) : [],
      }
    });
    console.log("values in handleFilterSearch", values);
    window.dispatchEvent(event);
    // form.resetFields();
    handleClose();
  };

  const handleResetFilter = () => {
    form.resetFields();
  };

  const handleCopyLink = () => {
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
          onClick={handleRequestProp}
          className="w-full"
        >
          Request Prop. {requestCount === 0 ? "(" + saleLimit + ")" : "(" +requestCount + "/" + saleLimit + ")"} 
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
        <RequestProp selectedIds={selectedIds} setEnqNo={setEnqNo} enqNo={enqNo} token={token} />
      </Modal>
      <TableProperty token={token} onSelectionChange={setSelectedIds} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
    </Card>
    </>
  );
};