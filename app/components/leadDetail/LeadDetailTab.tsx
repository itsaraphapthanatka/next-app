import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from "dayjs";
import { getLeadById } from '@/app/server_actions/lead';
import { getPurposes, getLeadStatuses, getLeadSources } from '@/app/server_actions/master';
import { getUnitType } from '@/app/server_actions/unittype';

type Purpose = {
  id?: number;
  name?: string;
};

type LeadStatus = {
  id?: number;
  name?: string;
};

type UnitType = {
  id?: number;
  name?: string;
};

type LeadSource = {
  id?: number;
  name?: string;
};

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

const CLIENT_TYPE_OPTIONS = [
  { value: "client", label: "Client" },
  { value: "coagent", label: "Co-Agent" }
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
  const [leadPurposes, setLeadPurposes] = useState<Purpose[]>([]);
  const [leadStatuses, setLeadStatuses] = useState<LeadStatus[]>([]);
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([]);
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
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

  useEffect(() => {
    getPurposes(token).then((response) => {
      console.log("response in LeadDetailTab", response);
      setLeadPurposes(response);
    });
  }, [token]);

  useEffect(() => {
    getLeadStatuses(token).then((response) => {
      console.log("response in LeadDetailTab", response);
      setLeadStatuses(response);
    });
  }, [token]);

  useEffect(() => {
    getUnitType(token).then((response) => {
      console.log("response in LeadDetailTab", response);
      setUnitTypes(response);
    });
  }, [token]);

  useEffect(() => {
    getLeadSources(token).then((response) => {
      console.log("response in LeadDetailTab", response);
      setLeadSources(response);
    });
  }, [token]);
  return (
    <>
    <p>Lead ID: {selectedLead.id}</p>
    <Form form={form} layout="vertical" name="tabsLeadDetail">
      <Form.Item name="leadNumber" label="Enq" className="text-[12px]" initialValue={selectedLead.leadNumber} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
          readOnly
          style={{
            backgroundColor: "#f5f5f5",
          }}
        />
      </Form.Item>
      <Form.Item name="project" label="Project" className="text-[12px]" initialValue={selectedLead.project} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
          readOnly
          style={{
            backgroundColor: "#f5f5f5",
          }}
        />
      </Form.Item>
      <Form.Item name="owner" label="Owner" className="text-[12px]" initialValue={selectedLead.owner} style={{ marginBottom: "10px" }}>
        <Input 
          size="large"
          readOnly
          style={{
            backgroundColor: "#f5f5f5",
          }}
        />
      </Form.Item>
      <Form.Item name="leadSource" label="Lead Source" className="text-[12px]" initialValue={selectedLead.leadSource} style={{ marginBottom: "10px" }}>
        <Select 
          size="large"
          options={leadSources ? leadSources.map((source) => ({ value: source.id, label: source.name })) : []}
          value={selectedLead.leadSource}
          onChange={(value) => {
            form.setFieldsValue({ leadSource: value });
          }}
        />
      </Form.Item>
      <Form.Item name="leadStatus" label="Lead Status" className="text-[12px]" initialValue={selectedLead.leadStatus} style={{ marginBottom: "10px" }}>
        <Select 
          size="large"
          options={leadStatuses ? leadStatuses.map((status) => ({ value: status.id, label: status.name })) : []}
          value={selectedLead.leadStatus}
          onChange={(value) => {
            form.setFieldsValue({ leadStatus: value });
          }}
        />
      </Form.Item>
      <Form.Item name="leadPurpose" label="Lead Purpose" className="text-[12px]" initialValue={selectedLead.leadPurpose} style={{ marginBottom: "10px" }}>
        <Select 
          size="large"
            options={leadPurposes ? leadPurposes.map((purpose) => ({ value: purpose.id, label: purpose.name })) : []}
            value={selectedLead.leadPurpose}
            onChange={(value) => {
              form.setFieldsValue({ leadPurpose: value });
            }}
        />
      </Form.Item>
      <Form.Item name="leadDate" label="Date" className="text-[12px]" initialValue={selectedLead.leadDate ? dayjs(selectedLead.leadDate) : null} style={{ marginBottom: "10px" }}>
        <DatePicker 
          size="large"
          disabled
          style={{
            backgroundColor: "#f5f5f5",
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item name="clientType" label="Client Type" className="text-[12px]" initialValue={selectedLead.clientType} style={{ marginBottom: "10px" }}>
        <Select
          size="large"
          options={CLIENT_TYPE_OPTIONS}
          value={selectedLead.clientType}
          onChange={(value) => {
            form.setFieldsValue({ clientType: value });
          }}
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
        <Select 
          size="large"
          options={unitTypes ? unitTypes.map((unitType) => ({ value: unitType.id, label: unitType.name })) : []}
          value={selectedLead.unitType}
          onChange={(value) => {
            form.setFieldsValue({ unitType: value });
          }}
        />
      </Form.Item>
      <Form.Item name="moveInDate" label="Move In Date" className="text-[12px]" initialValue={selectedLead.moveInDate ? dayjs(selectedLead.moveInDate) : null} style={{ marginBottom: "10px" }}>
        <DatePicker 
          size="large"
          style={{
            width: "100%",
          }}
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
          rows={4}
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