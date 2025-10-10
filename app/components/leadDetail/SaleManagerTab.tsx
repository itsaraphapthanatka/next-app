import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getSaleManagers } from '@/app/server_actions/master';

type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string | number;
  sale?: string;
};

type SaleManager = {
  id: number;
  name: string;
};

const SaleManagerTab = ({ selectedLead, token }: { selectedLead: SelectedLead; token: string }) => {
  const [form] = Form.useForm();
  const [saleManagers, setSaleManagers] = useState<SaleManager[]>([]);

  useEffect(() => {
    getSaleManagers(token).then(setSaleManagers);
  }, [token]);

  useEffect(() => {
    form.setFieldsValue({ saleManager: selectedLead.saleManager });

      // ✅ Trigger event ครั้งแรกเมื่อโหลดข้อมูล lead ที่มี saleManager อยู่แล้ว
      const event = new CustomEvent('saleManagerChange', {
        detail: { saleManagerId: selectedLead.saleManager },
      });
      window.dispatchEvent(event);
  }, [selectedLead.saleManager, form]);

  const handleSaleManagerChange = (saleManagerId: number) => {
    console.log("saleManagerId in SaleManagerTab", saleManagerId);
    const event = new CustomEvent('saleManagerChange', { detail: { saleManagerId: saleManagerId } });
    window.dispatchEvent(event);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="tabsSaleManager"
      onValuesChange={(changedValues) => {
        console.log("changedValues in SaleManagerTab", changedValues);
        handleSaleManagerChange(changedValues.saleManager as number);
      }}
    >
      <Form.Item name="saleManager" label="Sale Manager" style={{ marginBottom: 10 }}>
        <Select
          size="large"
          options={saleManagers.map((manager) => ({
            value: manager.id,
            label: manager.name,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default SaleManagerTab;
