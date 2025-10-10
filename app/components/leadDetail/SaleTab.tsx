import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getSale } from '@/app/server_actions/master';


type Sale = {
  id: number;
  name: string;
};

const SaleTab = ({ token }: { token: string }) => {
  const [form] = Form.useForm();
  const [sale, setSale] = useState<Sale[]>([]);


  useEffect(() => {
    const handleSaleManagerChange = (event: CustomEvent) => {
      console.log("event in SaleTab", event);
      getSale(token, event.detail.saleManagerId).then((response: Sale[]) => {
        setSale(response);
      });
    };

    window.addEventListener('saleManagerChange', handleSaleManagerChange as EventListener);
    return () => {
      window.removeEventListener('saleManagerChange', handleSaleManagerChange as EventListener);
    };
  }, [token]);
  


  return (
    <Form form={form} layout="vertical" name="tabsSale">
      <Form.Item name="sale" label="Sale" style={{ marginBottom: 10 }}>
        <Select
          size="large"
          options={sale.map((s) => ({
            value: s.id,
            label: s.name,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default SaleTab;
