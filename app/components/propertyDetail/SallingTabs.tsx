import { Form, Input, Checkbox, Col, Row, Radio  } from "antd";
import TextArea from "antd/es/input/TextArea";

type SelectedProperty = {
    salePGColor?: string;
    salePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

export const SallingTabs = ({ selectedProperty }: { selectedProperty: SelectedProperty }) => {
    console.log("selectedProperty in SallingTabs", selectedProperty)
    const [form] = Form.useForm();
    return (
        <Form form={form}
            layout="vertical"
            name="tabsSallingDetail">
            <Form.Item name="salePriceOnWeb" label="Salling Price On Web" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="salePricePerSQM" label="Salling Price per SQM" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="saleCommission" label="Salling Commission" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="saleCommissionRemark" label="Salling Commission Remark" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="includeTransferFee" label="Include Transfer Fee" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Radio.Group>
                        <Radio value={1}>Exclude Transfer Fee</Radio>
                        <Radio value={2}>Include Transfer Fee 50%</Radio>
                        <Radio value={3}>Include Transfer Fee 100%</Radio>
                </Radio.Group>  
            </Form.Item>
            <Form.Item label="Salling Condition" name="sallingCondition" style={{ marginBottom: "10px" }}>
                <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                        <Col span={12}>
                            <Checkbox value="includeCommission">Include Commission</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="includeSpecialBusinessTax">Include Special Business Tax</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="includeWithholdingTaxes">Include withholding taxes</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="sellIsACompany">Sell is a Company</Checkbox>
                        </Col>
                        
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        </Form>
    )
}
