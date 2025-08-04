    import { useEffect, useState } from "react";
    import { Form, Input, Select, Button, Col, Row, Checkbox } from "antd";
    import TextArea from "antd/es/input/TextArea";
    import { useSession } from "next-auth/react";
    import { App as AntdApp } from "antd";
    import { savePropertyFollowup } from "@/app/server_actions/property";
    import { getPropertyStatuses } from "@/app/server_actions/master";
    import { getEditData } from "@/app/server_actions/data-edits";
  
    type SelectedProperty = {
        key?: number;
      };
      type propertyStatus = {
        id: number;
        name: string;
      };
      type EditData = {
        id: number;
        propertyId: number;
        propertyStatusId: number;
        rentalPrice: number;
        availableOn: string;
        sellingPrice: number;
        keycardWithId: number;
        keyHolderTelephone: string;
        keycardDetail: string;
        sellingCondition: string;
        workFlowStatus: string;
        senderId: number;
        approverId: number;
        sendDate: string;
        approveDate: string;
        notApproveReason: string;
        displayStatus: string;
        senderName: string;
      };
    export const DataEditProperty = ({ token, modalType, selectedProperty }: { token: string, modalType: string, selectedProperty: SelectedProperty  }) => {
        const [loading, setLoading] = useState(false);
        console.log("token in DataEditProperty", token);
        const session = useSession();
        const [form] = Form.useForm();
        const { message } = AntdApp.useApp();
        const [propertyStatuses, setPropertyStatuses] = useState([]);
        const [editData, setEditData] = useState<EditData | null>(null);
        useEffect(() => {
            getPropertyStatuses(token).then((data) => {
                setPropertyStatuses(data);
            });
            getEditData(token,selectedProperty.key as number).then((data) => {
                setEditData(data);
                form.setFieldsValue(data);
                console.log("editData in DataEditProperty", editData);
            });
        }, [token]);
        const handleSave = async () => {
            setLoading(true);
            const followUp = form.getFieldValue("followUp");
            const closeJob = modalType === "request" ? form.getFieldValue("closeJob") : false;
            const followupData = {
                id: 0,
                remark: followUp,
                closeJob: closeJob ? true : false,
                followUpType: 0,
                sourceId: selectedProperty.key as number,
                saleRequestItemId: 0,
                toSalePropertyId: 0,
            };
            const res = await savePropertyFollowup(followupData, token);
            if (res.status === 200) {
                message.success("Follow-up saved successfully");
            } else {
                message.error("Failed to save follow-up");
            }
            setLoading(false);
        }
        return (
            <>
            <Form
                layout="vertical"
                name="followUpForm"
                form={form}
            >
                <Form.Item name="followUp" label="New Follow Up">
                    <TextArea rows={4} />
                </Form.Item>
                <div className="flex w-full">
                    <Button block color="green" variant="solid" htmlType="submit" onClick={handleSave} loading={loading}>Save</Button>
                </div>
                {modalType === "request" && (
                <Form.Item name="closeJob" style={{ marginBottom: "10px" }}>
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={12}>
                                <Checkbox value="close">Close Job</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                )}
            </Form>
            <Form
                layout="vertical"
                name="dataEditForm"
                form={form}
            >
                <p style={{ marginTop: "24px" }}>Request By {session?.data?.user?.email}</p>
                <Form.Item name="propertyStatusId" label="Status">
                    <Select size="large" options={propertyStatuses.map((status: propertyStatus) => ({ label: status.name, value: status.id }))} />
                </Form.Item>
                <Form.Item name="rentalPrice" label="Rental Price" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Input 
                    size="large"
                />
                </Form.Item>
                <Form.Item name="availableOn" label="Available On" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="sellingPrice" label="Selling Price" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="keycardWithId" label="Keycard With" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Select size="large" options={[{ label: "Pending", value: "pending" }, { label: "Approved", value: "approved" }, { label: "Rejected", value: "rejected" }]} />
                </Form.Item>
                <Form.Item name="keyHolderTelphone" label="Key Holder Telphone" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="keycardDetail" label="Key & Keycard Detail" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="sellingCondition" label="Selling Condition" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <TextArea rows={4} />
                </Form.Item>
                <div className="flex w-full">
                    <Button block color="green" variant="solid" htmlType="submit">Send To Approval</Button>
                </div>
            </Form>
            </>
        )
    }