import React from 'react';
import { Form, Select } from 'antd';


type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

const SaleManagerTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {
    console.log("selectedLead in SaleManagerTab", selectedLead);
    console.log("token in SaleManagerTab", token);

    const [form] = Form.useForm();
  return (  
    <>
        <Form form={form} layout="vertical" name="tabsSaleManager">
            <Form.Item name="saleManager" label="Sale Manager" className="text-[12px]" initialValue={selectedLead.saleManager} style={{ marginBottom: "10px" }}>
                <Select size="large" options={selectedLead.saleManager ? [{ value: selectedLead.saleManager, label: selectedLead.saleManager }] : []} />
            </Form.Item>
        </Form>
    </>
  );
};

export default SaleManagerTab;