import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Col, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from "dayjs";
import { getLeadById } from '@/app/server_actions/lead';

type SelectedLead = {
  id?: number;
  leadNumber?: string;
  project?: string;
  owner?: string;
  leadSource?: string;
  leadStatus?: string;
  leadPurpose?: string;
  leadDate?: string;
  clientType?: string;
  budget?: string;
  invid?: string;
  unitType?: string;
  moveInDate?: string;
  moveDuration?: string;
  rentedDuration?: string;
  specialRequest?: string;
  srirawas?: boolean;
  srisawasLead?: boolean;
};

const CHECKBOX_GROUPS = [
  { value: "srirawas", label: "Srisawas" },
  { value: "srisawasLead", label: "Srisawas Lead" },
];

const LeadDetailTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {

  const [form] = Form.useForm();
  console.log("token in LeadDetailTab", token);
  console.log("selectedLeadqqq in LeadDetailTab", selectedLead);
  useEffect(() => {
    if (!selectedLead.id) return;
    getLeadById(selectedLead.id, token).then((response) => {
      console.log("response in LeadDetailTab", response);
      form.setFieldsValue({
        ...response,
        owner: response.owner.id,
        leadSource: response.leadSource.id,
        leadStatus: response.leadStatus.id,
        leadPurpose: response.leadPurpose.id,
        clientType: response.leadClientType,
        budget: response.budget,
        invid: response.invId,
        unitType: response.unitType.id,
        rentedDuration: response.rentedDuration,
        project: response.project.name,
        leadDate: response.leadDate ? dayjs(response.leadDate) : null,
        moveInDate: response.moveInDate ? dayjs(response.moveInDate) : null,
      });
    });
  }, [selectedLead.id, form, token]);

  return (
    <>
    <p>Lead ID: {selectedLead.id}</p>
    <Form form={form} layout="vertical" name="tabsLeadDetail">
      <Form.Item name="leadNumber" label="Enq" className="text-[12px]" initialValue={selectedLead.leadNumber} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="project" label="Project" className="text-[12px]" initialValue={selectedLead.project} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="owner" label="Owner" className="text-[12px]" initialValue={selectedLead.owner} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="leadSource" label="Lead Source" className="text-[12px]" initialValue={selectedLead.leadSource} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="leadStatus" label="Lead Status" className="text-[12px]" initialValue={selectedLead.leadStatus} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="leadPurpose" label="Lead Purpose" className="text-[12px]" initialValue={selectedLead.leadPurpose} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="leadDate" label="Date" className="text-[12px]" initialValue={selectedLead.leadDate ? dayjs(selectedLead.leadDate) : null} style={{ marginBottom: "10px" }}>
        <DatePicker 
          size="large"
        />
      </Form.Item>
      <Form.Item name="clientType" label="Client Type" className="text-[12px]" initialValue={selectedLead.clientType} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="budget" label="Budget" className="text-[12px]" initialValue={selectedLead.budget} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="invid" label="INVID" className="text-[12px]" initialValue={selectedLead.invid} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="unitType" label="Unit Type" className="text-[12px]" initialValue={selectedLead.unitType} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="moveInDate" label="Move In Date" className="text-[12px]" initialValue={selectedLead.moveInDate ? dayjs(selectedLead.moveInDate) : null} style={{ marginBottom: "10px" }}>
        <DatePicker 
          size="large"
        />
      </Form.Item>
      <Form.Item name="rentedDuration" label="Rent Duration (Month)" className="text-[12px]" initialValue={selectedLead.rentedDuration} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
        />
      </Form.Item>
      <Form.Item name="specialRequest" label="Special Request" className="text-[12px]" initialValue={selectedLead.specialRequest} style={{ marginBottom: "10px" }}>
        <TextArea 
          size="large"
        />
      </Form.Item>
      <Checkbox.Group style={{ width: "100%" }}>
           
              {CHECKBOX_GROUPS.map((item) => (
                <Col span={12} key={item.value}>
                  <Checkbox
                    value={item.value}
                    checked={selectedLead[item.value as keyof SelectedLead] as unknown as boolean}
                  >
                    {item.label}
                  </Checkbox>
                </Col>
              ))}
          </Checkbox.Group>
      </Form>
    </>
  );
  
};

export default LeadDetailTab;