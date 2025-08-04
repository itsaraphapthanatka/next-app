    import { useEffect, useState } from "react";
    import { Form, Input, Select, Button, Col, Row, Checkbox } from "antd";
    import TextArea from "antd/es/input/TextArea";
    import { useSession } from "next-auth/react";
    import { App as AntdApp } from "antd";
    import { savePropertyFollowup } from "@/app/server_actions/property";
    import { getPropertyStatuses } from "@/app/server_actions/master";
    import { getEditData, saveEditData } from "@/app/server_actions/data-edits";
  
    type SelectedProperty = {
        key?: number;
        saleRequestId?: number;
        saleRequestItemId?: number;
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
      type User = {
        firstName: string;
        lastName: string;
        id: number;
      };
    export const DataEditProperty = ({ token, modalType, selectedProperty }: { token: string, modalType: string, selectedProperty: SelectedProperty  }) => {
        const [loading, setLoading] = useState(false);
        console.log("token in DataEditProperty", token);
        const session = useSession();
        const [formFollowUp] = Form.useForm();
        const [formDataEdit] = Form.useForm();
        const { message } = AntdApp.useApp();
        const [propertyStatuses, setPropertyStatuses] = useState([]);
        const [editData, setEditData] = useState<EditData | null>(null);
        const [isSendToApprovalDisabled, setIsSendToApprovalDisabled] = useState(false);
        const [isSaveDisabled, setIsSaveDisabled] = useState(false);
        useEffect(() => {
            getPropertyStatuses(token).then((data) => {
                setPropertyStatuses(data);
            });
            getEditData(token,selectedProperty.key as number).then((data) => {
                setEditData(data);
                formDataEdit.setFieldsValue(data);
                console.log("editData in DataEditProperty", data);
            });
        }, [token]);
        const handleSave = async () => {
            setLoading(true);
            const followUp = formFollowUp.getFieldValue("followUp");
            const closeJob = modalType === "request" ? formFollowUp.getFieldValue("closeJob") : false;
            const followupData = {
                id: selectedProperty.key as number,
                remark: followUp,
                closeJob: closeJob ? true : false,
                followUpType: 0,
                sourceId: selectedProperty.key as number,
                saleRequestItemId: selectedProperty.saleRequestId as number,
                toSalePropertyId: selectedProperty.saleRequestItemId as number,
            };
            const res = await savePropertyFollowup(followupData, token);
            if (res.status === 200) {
                message.success("Follow-up saved successfully");
                getEditData(token,selectedProperty.key as number).then((data) => {
                    setEditData(data);
                    formDataEdit.setFieldsValue(data);
                    console.log("editData in DataEditProperty", data);
                }); 
                setIsSaveDisabled(true);
            } else {
                message.error("Failed to save follow-up");
            }
            setLoading(false);
        }
        const handleSendToApproval = async () => {
            setLoading(true);
            const data = {
                id: editData?.id,
                propertyId: editData?.propertyId ?? selectedProperty.key as number,
                propertyStatusId: formDataEdit.getFieldValue("propertyStatusId") as number,
                rentalPrice: formDataEdit.getFieldValue("rentalPrice") as number,
                availableOn: formDataEdit.getFieldValue("availableOn") as string,
                sellingPrice: formDataEdit.getFieldValue("sellingPrice") as number,
                keycardWithId: formDataEdit.getFieldValue("keycardWithId") as number,
                keyHolderTelephone: formDataEdit.getFieldValue("keyHolderTelephone") as string,
                keycardDetail: formDataEdit.getFieldValue("keycardDetail") as string,
                sellingCondition: formDataEdit.getFieldValue("sellingCondition") as string,
                workFlowStatus: editData?.workFlowStatus?? "NotStart",
                senderId: editData?.senderId ?? (session?.data?.user as User).id,
                approverId: editData?.approverId ?? 0,
                sendDate: editData?.sendDate ?? new Date().toISOString(),
                approveDate: editData?.approveDate ?? new Date().toISOString() ?? null,
                notApproveReason: editData?.notApproveReason ?? "",
                senderName: (session?.data?.user as User).firstName + " " + (session?.data?.user as User).lastName,
            }
            const res = await saveEditData(token, data);
            if (res.status === 200) {
                message.success("Data sent to approval successfully");
            // Disable the "Send To Approval" button after successful submission
            // This will set a flag to disable the button
            setIsSendToApprovalDisabled(true);  
            } else {
                message.error("Failed to send data to approval");
            }
            setLoading(false);
        }
        return (
            <>
            <Form
                layout="vertical"
                name="followUpForm"
                form={formFollowUp}
            >
                <Form.Item name="followUp" label="New Follow Up">
                    <TextArea rows={4} />
                </Form.Item>
                <div className="flex w-full">
                    <Button block variant="solid" htmlType="submit" onClick={handleSave} loading={loading} disabled={isSaveDisabled} style={{ backgroundColor: isSaveDisabled ? "#ccc" : "#52c41a", color: isSaveDisabled ? "#000" : "#fff" }}>Save</Button>
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
                form={formDataEdit}
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
                    <Button block loading={loading} variant="solid" htmlType="submit" onClick={handleSendToApproval} disabled={isSendToApprovalDisabled} style={{ backgroundColor: isSendToApprovalDisabled ? "#ccc" : "#52c41a", color: isSendToApprovalDisabled ? "#000" : "#fff" }} >Send To Approval</Button>
                </div>
            </Form>
            </>
        )
    }