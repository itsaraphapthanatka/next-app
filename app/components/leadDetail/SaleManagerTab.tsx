import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getSaleManagers } from '@/app/server_actions/master';


type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

type SaleManager = {
  id?: number;
  name?: string;
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

    const [saleManagers, setSaleManagers] = useState<SaleManager[]>([]);
    useEffect(() => {
        getSaleManagers(token).then((response) => {
            setSaleManagers(response);
        });
    }, [token]);

    const handleSaleManagerChange = (saleManagerId: number) => {
        console.log("saleManagerId in SaleManagerTab", saleManagerId);
       const event = new CustomEvent('saleManagerChange', { detail: { saleManagerId: saleManagerId } });
       window.dispatchEvent(event);
        
    };


  return (  
    <>
        <Form form={form} layout="vertical" name="tabsSaleManager" onValuesChange={handleSaleManagerChange}>
            <Form.Item name="saleManager" label="Sale Manager" className="text-[12px]" initialValue={selectedLead.saleManager} style={{ marginBottom: "10px" }}>
                <Select size="large" options={saleManagers ? saleManagers.map((manager) => ({ value: manager.id, label: manager.name })) : []} />
            </Form.Item>
        </Form>
    </>
  );
};

export default SaleManagerTab;