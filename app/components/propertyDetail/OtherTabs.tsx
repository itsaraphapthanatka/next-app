import { Form, Input, Select  } from "antd";
import { getDecorations } from "@/app/server_actions/decorations";
import { useEffect, useState } from "react";

type SelectedProperty = {
    otherPGColor?: string;
    otherPGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

  type Decoration = {
    id: string;
    name: string;
  }

export const OtherTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }  ) => {
    console.log("selectedProperty in OtherTabs", selectedProperty)
    const [form] = Form.useForm();
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    useEffect(() => {
        const fetchDecorations = async () => {
            const decorations = await getDecorations(token);
            setDecorations(decorations);
        };
        fetchDecorations();
    }, [token]);
    return (
        <Form form={form}
            layout="vertical"
            name="tabsOtherDetail">
            <Form.Item name="decoration" label="Decoration" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Select Decoration" size="large">
                    {decorations.map((decoration) => (
                        <Select.Option key={decoration.id} value={decoration.id}>{decoration.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="viewDirection" label="View Direction" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
            </Form.Item>
            <Form.Item name="stockOwner" label="Stock Owner" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Company's Stock" size="large">
                    <Select.Option value="1">Adirek Ruangsaree</Select.Option>
                    <Select.Option value="2">Aemphawee Patthamaphiboonporn</Select.Option>
                    <Select.Option value="3">Ampaporn Ohnuch</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="hilight" label="Hilight" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Not have Hilight" size="large">
                    <Select.Option value="1">Adirek Ruangsaree</Select.Option>
                    <Select.Option value="2">Aemphawee Patthamaphiboonporn</Select.Option>
                    <Select.Option value="3">Ampaporn Ohnuch</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="expriedDate" label="Expried Date (Clear)" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                    readOnly
                    style={{ backgroundColor: "#f0f0f0" }}
                />
            </Form.Item>
            <Form.Item name="salePush" label="Sale Push" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Not have Sale Push" size="large">
                    <Select.Option value="1">Adirek Ruangsaree</Select.Option>
                    <Select.Option value="2">Aemphawee Patthamaphiboonporn</Select.Option>
                    <Select.Option value="3">Ampaporn Ohnuch</Select.Option>
                </Select>
            </Form.Item>
            
            
        </Form>
    )
}