import { Form, Input, Select  } from "antd";
import { getDecorations } from "@/app/server_actions/decorations";
import { getPictureStatuses } from "@/app/server_actions/picturestatuses";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/app/server_actions/property";  
import { getEmployees } from "@/app/server_actions/master";

type SelectedProperty = {
    key?: number;
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

  type PictureStatus = {
    id: string;
    name: string;
  }

  type Other = {
    decorationId: number;
    expiredDate: string;
    hilightId: number;
    pictureStatusId: number;
    salePushId: number;
    stockOwnerId: number;
    viewDirection: string;
  }

  type Employee = {
    id: number;
    firstName: string;
    lastName: string;
  }

export const OtherTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }  ) => {
    console.log("selectedProperty in OtherTabs", selectedProperty)
    const [form] = Form.useForm();
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    const [pictureStatuses, setPictureStatuses] = useState<PictureStatus[]>([]);
    const [propertyOther, setPropertyOther] = useState<Other | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        const fetchDecorations = async () => {
            const decorations = await getDecorations(token);
            setDecorations(decorations);
        };
        fetchDecorations();
    }, [token]);
    useEffect(() => {
        const fetchPictureStatuses = async () => {
            const pictureStatuses = await getPictureStatuses(token);
            setPictureStatuses(pictureStatuses);
        };
        fetchPictureStatuses();
    }, [token]);
    useEffect(() => {
        getEmployees(token).then((response) => {
            setEmployees(response);
        });
    }, [token]);
    useEffect(() => {
        getPropertyById(selectedProperty.key as number, token).then((response) => {
            const detail = response.other;
            setPropertyOther(detail);
            form.setFieldsValue(detail);
        });
    }, [selectedProperty.key, token]);
    console.log("propertyOther in OtherTabs", propertyOther)
    return (
        <Form form={form}
            layout="vertical"
            name="tabsOtherDetail">
            <Form.Item name="decorationId" label="Decoration" className="text-[12px]"  style={{ marginBottom: "10px" }}>
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
            <Form.Item name="pictureStatusId" label="Picture Status" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Select Picture Status" size="large">
                    {pictureStatuses.map((pictureStatus) => (
                        <Select.Option key={pictureStatus.id} value={pictureStatus.id}>{pictureStatus.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="stockOwnerId" label="Stock Owner" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Company's Stock" size="large">
                    <Select.Option value={0}>Company&apos;s Stock</Select.Option>
                    {employees.map((employee) => (
                        <Select.Option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="hilightId" label="Hilight" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Not have Hilight" size="large">
                    <Select.Option value={0}>Not have Hilight</Select.Option>
                    {employees.map((employee) => (
                        <Select.Option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="expriedDate" label="Expried Date (Clear)" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                    readOnly
                    style={{ backgroundColor: "#f0f0f0" }}
                />
            </Form.Item>
            <Form.Item name="salePushId" label="Sale Push" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Select placeholder="Not have Sale Push" size="large">
                    <Select.Option value={0}>Not have Sale Push</Select.Option>
                    {employees.map((employee) => (
                        <Select.Option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            
            
        </Form>
    )
}