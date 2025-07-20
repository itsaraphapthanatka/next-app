import { Form, Input, Select, Checkbox, Col, Row, Radio  } from "antd";
import TextArea from "antd/es/input/TextArea";

type SelectedProperty = {
    keyHolderPGColor?: string;
    keyHolderPGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };
export const KeyHolderTabs = ({ selectedProperty }: { selectedProperty: SelectedProperty }) => {
    console.log("selectedProperty in KeyHolderTabs", selectedProperty)
    const [form] = Form.useForm();
    return (
        <Form form={form}
            layout="vertical"
            name="tabsKeyHolderDetail">
            <Form.Item name="keycardWith" label="Keycard With" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Please select keycard with" size="large">
                    <Select.Option value="0">Please select keycard with</Select.Option>
                    <Select.Option value="1">Agent</Select.Option>
                    <Select.Option value="2">Fulcrum</Select.Option>
                    <Select.Option value="3">Juristic</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="keyHolderFirstName" label="Key Holder Firstname" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderLastName" label="Key Holder Lastname" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderPhone" label="Key Holder Telephone" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderEmail" label="Key Holder Email" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderLineId" label="Key Holder Line ID" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="passcode" label="Passcode" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keycardDetail" label="Key & Keycard Detail" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
        </Form>
    )
}