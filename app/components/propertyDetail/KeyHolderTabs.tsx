import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getPropertyById } from "@/app/server_actions/property";
import { useEffect, useState } from "react";
import { getKeycards } from "@/app/server_actions/master";

type SelectedProperty = {
     propertyId?: number;
    keyHolderPGColor?: string;
    keyHolderPGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

  type KeyHolder = {
    keyCardWithId: number;
    keyHolderFirstname: string;
    keyHolderLastname: string;
    keyHolderTelephone: string;
    keyHolderEmail: string;
    keyHolderLineID: string;
    passcode: string;
    keyCardDetail: string;
  }

  type Keycard = {
    id: number;
    name: string;
  }

export const KeyHolderTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string   }) => {
    console.log("selectedProperty in KeyHolderTabs", selectedProperty)
    const [form] = Form.useForm();
    const [propertyKeyHolder, setPropertyKeyHolder] = useState<KeyHolder | null>(null);
    const [keycards, setKeycards] = useState<Keycard[]>([]);
    useEffect(() => {
        getPropertyById(selectedProperty.propertyId as number, token).then((response) => {
            const detail = response.keyHolder;
            setPropertyKeyHolder(detail);
            console.log("detail in KeyHolderTabs", propertyKeyHolder);
            form.setFieldsValue(detail);
        });
    }, [selectedProperty.propertyId, token]);
    useEffect(() => {
        getKeycards(token).then((response) => {
            setKeycards(response);
        });
    }, [token]);
    return (
        <Form form={form}
            layout="vertical"
            name="tabsKeyHolderDetail">
            <Form.Item name="keyCardWithId" label="Keycard With" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Please select keycard with" size="large">
                    <Select.Option value={0}>Please select keycard with</Select.Option>
                    {keycards.map((keycard) => (
                        <Select.Option key={keycard.id} value={keycard.id}>{keycard.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="keyHolderFirstname" label="Key Holder Firstname" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderLastname" label="Key Holder Lastname" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderTelephone" label="Key Holder Telephone" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderEmail" label="Key Holder Email" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyHolderLineID" label="Key Holder Line ID" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="passcode" label="Passcode" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="keyCardDetail" label="Key & Keycard Detail" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea 
                    size="large"
                />
            </Form.Item>
        </Form>
    )
}