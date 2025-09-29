"use client";

import { useState } from "react";
import { Card, Input, Button, Modal, Form, Select} from "antd";
import { ModalFilter } from "../components/ModalFilter";
import { getProjectsName } from "@/app/server_actions/projectsName";
import TableLead from "./TableLead";
import { NewLead } from "./NewLead";

interface LeadSearchFromProps {
  className?: string;
  token: string;
}

export const LeadSearchFrom = ({ className = "", token }: LeadSearchFromProps) => {
  const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const event = new CustomEvent("leadTableSearch", {
      detail: {
        projectName: values.projectNameSearch ?? "",
        addressUnit: values.addressUnitSearch ?? "",
        unitTypeId: Array.isArray(values.unitTypeFilter) ? values.unitTypeFilter.map(String) : [""],
        decorationIds: Array.isArray(values.decorationIds) ? values.decorationIds.map(String) : [""],
        pictureStatusIds: Array.isArray(values.pictureStatusIds) ? values.pictureStatusIds.map(String) : [""],
        propertyStatusIds: Array.isArray(values.propertyStatusIds) ? values.propertyStatusIds.map(String) : [""],
        massTransit: Array.isArray(values.massTransit) ? values.massTransit.map(String) : [""],
        projectTypeIds: Array.isArray(values.propertyType) ? values.propertyType.map(String) : [""],
        vipStatusIds: Array.isArray(values.vipStatus) ? values.vipStatus.map(String) : [""],
        ids: Array.isArray(values.ids) ? values.ids.map(String) : [""],
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
    const event = new CustomEvent('leadTableReload', {
      detail: { 
        projectName: values.projectNameFilter ?? "", 
        addressUnit: values.addressUnitFilter ?? "",
        startDate: values.startDate ?? "",
        toDate: values.toDate ?? "",
        parentObjectId: values.parentObjectId ?? 0,
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
        forRentOrSale: values.forRentSaleStatus ?? 0,
        railwayStationId: 0,
        massTransit: Array.isArray(values.massTransit) ? values.massTransit.map(String) : [],
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
        revealStatus: values.revealStatus ?? "",
        assignerName: values.assignFrom ?? "",
      }
    });
    window.dispatchEvent(event);
    // form.resetFields();
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

  const handleCloseNewLead = () => {
    setIsNewLeadOpen(false);
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
        <Button color="orange" size="large"
          variant="solid"
          className="w-full"
          onClick={() => setIsNewLeadOpen(true)}
        >
           New Lead
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
            <ModalFilter form={form} moduleType="assign" token={token} />
        </div>
      </Modal>
      <Modal
        title="New Lead"
        open={isNewLeadOpen}
        onCancel={handleCloseNewLead}
        footer={
          <div className="flex gap-2 justify-end" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
            <Button color="default" size="small" variant="outlined" onClick={handleCloseNewLead}>Close</Button>
          </div>
        }
      >
        <div>
            <NewLead form={form} token={token} />
        </div>
      </Modal>
      
      <TableLead token={token} />
    </Card>
    </>
  );
};