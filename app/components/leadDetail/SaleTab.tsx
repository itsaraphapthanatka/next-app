import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getSale } from '@/app/server_actions/master';

type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

type Sale = {
  id?: number;
  name?: string;
};

const SaleTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {
    const [form] = Form.useForm();
    const [sale, setSale] = useState<Sale[]>([]);
    const managerId = "1039";
    useEffect(() => {
        form.setFieldsValue({
            sale: selectedLead.sale,
        });
    }, [selectedLead.sale]);
    
    useEffect(() => {
      getSale(token, parseInt(managerId)).then((response: Sale[]) => {
        setSale(response);
        form.setFieldsValue({
            sale: response[0].name,
        });
      });
    }, [token]);

    
    return (
        <>
            <Form form={form} layout="vertical" name="tabsSale">
                <Form.Item name="sale" label="Sale" className="text-[12px]" initialValue={selectedLead.sale} style={{ marginBottom: "10px" }}>
                    <Select size="large" options={sale && sale.length > 0 ? sale.map((sale) => ({ value: sale.id, label: sale.name })) : []} />
                </Form.Item>
            </Form>
        </>
    );
};

export default SaleTab;