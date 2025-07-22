    import { Form, Input, Select, Button, Col, Row, Checkbox } from "antd";
    import TextArea from "antd/es/input/TextArea";
    import { useSession } from "next-auth/react";

    export const DataEditProperty = ({ token, modalType }: { token: string, modalType: string }) => {
        console.log("token in DataEditProperty", token);
        const session = useSession();
        console.log("session in DataEditProperty", session);
        return (
            <Form>
                <Form.Item name="followUp" label="New Follow Up">
                    <TextArea rows={4} />
                </Form.Item>
                <div className="flex w-full">
                    <Button block color="green" variant="solid" htmlType="submit">Save</Button>
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
                <p style={{ marginTop: "24px" }}>Request By {session?.data?.user?.email}</p>
                <Form.Item name="status" label="Status">
                    <Select size="large" options={[{ label: "Pending", value: "pending" }, { label: "Approved", value: "approved" }, { label: "Rejected", value: "rejected" }]} />
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
                <Form.Item name="keycardWith" label="Keycard With" className="text-[12px]"  style={{ marginBottom: "10px" }}>
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
        )
    }