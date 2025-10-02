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

const SaleTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {
    console.log("selectedLead in SaleTab", selectedLead);
    console.log("token in SaleTab", token);
    const [form] = Form.useForm();
    return (
        <>
            <Form form={form} layout="vertical" name="tabsSale">
                <Form.Item name="sale" label="Sale" className="text-[12px]" initialValue={selectedLead.sale} style={{ marginBottom: "10px" }}>
                    <Select size="large" options={selectedLead.sale ? [{ value: selectedLead.sale, label: selectedLead.sale }] : []} />
                </Form.Item>
            </Form>
        </>
    );
};

export default SaleTab;