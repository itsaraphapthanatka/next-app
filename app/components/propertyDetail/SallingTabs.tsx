import { Form, Input, Checkbox, Col, Row, Radio  } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/app/server_actions/property";

type SelectedProperty = {
     propertyId?: number;
    salePGColor?: string;
    salePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

type Selling = {
    salePrice: number;
    salePerSQM: number;
    saleCommission: number;
    saleCommissionRemark: string;
    includeTransferFee: number;
    sallingCondition: string;
}

const CHECKBOX_GROUPS = [
    { value: "includeCommission", label: "Include Commission" },
    { value: "includeSpecialBusinessTax", label: "Include Special Business Tax" },
    { value: "includeWHT", label: "Include withholding taxes" },
    { value: "sellIsACompany", label: "Sell is a Company" },
]

export const SallingTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("selectedProperty in SallingTabs", selectedProperty)
    const [form] = Form.useForm();
    const [propertySelling, setPropertySelling] = useState<Selling | null>(null);
    useEffect(() => {
        getPropertyById(selectedProperty.propertyId as number, token).then((response) => {
            const detail = response.selling;
            setPropertySelling(detail);
            console.log("detail in SallingTabs", propertySelling);
            form.setFieldsValue({
                ...detail,
                sellingPrice: detail.sellingPrice != null ? Number(detail.sellingPrice).toLocaleString() : "",
                sellingPricePerSQM: detail.sellingPricePerSQM != null ? Number(detail.sellingPricePerSQM).toLocaleString() : "",
            });
        });
    }, [selectedProperty.propertyId, token]);
    return (
        <Form form={form}
            layout="vertical"
            name="tabsSallingDetail">
            <Form.Item name="sellingPrice" label="Salling Price On Web" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="sellingPricePerSQM" label="Salling Price per SQM" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="sellingCondition" label="Salling Commission" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="sellingCommissionRemark" label="Salling Commission Remark" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="transferFee" label="Include Transfer Fee" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Radio.Group>
                        <Radio value={0}>Exclude Transfer Fee</Radio>
                        <Radio value={50}>Include Transfer Fee 50%</Radio>
                        <Radio value={100}>Include Transfer Fee 100%</Radio>
                </Radio.Group>  
            </Form.Item>
            {/* <Form.Item label="Salling Condition" name="sallingCondition" style={{ marginBottom: "10px" }}>
                <Checkbox.Group style={{ width: '100%' }} options={CHECKBOX_GROUPS} />
            </Form.Item> */}

            <Form.Item label="Salling Condition" style={{ marginBottom: "10px" }}>
            <Row gutter={[8, 8]}>
                {CHECKBOX_GROUPS.map((item) => (
                <Col span={12} key={item.value}>
                    <Form.Item
                    name={item.value}
                    valuePropName="checked"
                    noStyle
                    >
                    <Checkbox>{item.label}</Checkbox>
                    </Form.Item>
                </Col>
                ))}
            </Row>
            </Form.Item>
        </Form>
    )
}
