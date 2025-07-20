"use client"
import { getUnitType } from "@/app/server_actions/unittype";
import { Form, Input, Select, Checkbox, Col, Row  } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";


type SelectedProperty = {
    rentPGColor?: string;
    rentPGText?: string;
    salePGColor?: string;
    salePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

type UnitType = {
    id: string;
    name: string;
}

export const FormProperty = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("selectedProperty in form", selectedProperty);
    const [form] = Form.useForm();
    const [unitType, setUnitType] = useState<UnitType[]>([]);
    useEffect(() => {
        const fetchUnitType = async () => {
            const unitType = await getUnitType(token);
            setUnitType(unitType);
        };
        fetchUnitType();
    }, [token]);
  return (
    <Form
        form={form}
        layout="vertical"
        name="tabsPropertyDetail">
        <Form.Item name="rentPG" label="Rent Profit gap" initialValue={selectedProperty.rentPGText ? selectedProperty.rentPGText + " %" : "%"} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                readOnly
                style={{
                    color: selectedProperty.rentPGColor,
                    backgroundColor: "#f5f5f5",
                }}
                defaultValue={selectedProperty.rentPGText ? selectedProperty.rentPGText + " %" : "%"}
            />
        </Form.Item>
        <Form.Item name="salePG" label="Sale Profit gap" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                readOnly
                style={{
                    color: selectedProperty.salePGColor,
                    backgroundColor: "#f5f5f5",
                }}
                defaultValue={selectedProperty.salePGText ? selectedProperty.salePGText + " %" : "%"}
            />
        </Form.Item>
        <Form.Item name="invid" label="INVID" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                readOnly
                style={{
                    color: selectedProperty.vipStatusColor,
                    backgroundColor: "#f5f5f5",
                }}
                defaultValue={selectedProperty.invid}
            />
        </Form.Item>
        <Form.Item name="oldinvid" label="OLD INVID." className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item>
        <Form.Item name="headline" label="Headline" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item>
        <Form.Item name="thaiHeadline" label="Thai Headline" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item> 
        <Form.Item name="projectName" label="Project Name" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                defaultValue={selectedProperty.project}
            />
        </Form.Item> 
        <Form.Item name="vipStatus" label="VIP Status" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Select
                options={[{ label: "VIP", value: "VIP" }, { label: "Not VIP", value: "Not VIP" }]}
                size="large"
                defaultValue={selectedProperty.vipStatus}
            />
        </Form.Item> 
        <Form.Item name="overview" label="Overview" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
       <Form.Item name="thaiOverview" label="Thai Overview" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Address No"
            name="addressNo"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Address No" size="large"/>
            </Form.Item>
            <Form.Item
            label="Unit Code"
            name="unitCode"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Unit Code" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Tower"
            name="tower"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Tower" size="large"/>
            </Form.Item>
            <Form.Item
            label="Floor"
            name="floor"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Floor" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Floor alias name"
            name="floorAliasName"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Floor alias name" size="large"/>
            </Form.Item>
            <Form.Item
            label="Lift Lobby"
            name="liftLobby"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Lift Lobby" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Unit Type"
            name="unitType"
            className="w-full"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Unit Type" size="large">
                {unitType.map((unit: UnitType) => (
                    <Select.Option key={unit.id} value={unit.id}>{unit.name}</Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item
            label="Parking Slot"
            name="parkingSlot"
            className="w-full"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Parking Slot" size="large"/>
            </Form.Item>
        </div>
        <div className="gap-3 w-full">
            <Form.Item
            label="Status"
            name="status"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Show All Status" size="large">
                <Select.Option value={1}>Available</Select.Option>
                <Select.Option value={0}>Sold</Select.Option>
            </Select>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Rented For"
            name="rentedFor"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Rented For" size="large"/>
            </Form.Item>
            <Form.Item
            label="Size"
            name="size"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Size" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Available On (Clear)"
            name="availableOn"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Available On (Clear)" size="large"/>
            </Form.Item>
            <Form.Item
            label="Last Update Status"
            name="lastUpdateStatus"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Last Update Status" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Hot deal Exp. Date (Clear)"
            name="hotDealExpireDate"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Hot deal Exp. Date (Clear)" size="large"/>
            </Form.Item>
            <Form.Item
            label="Bedroom"
            name="bedroom"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Bedroom" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Bathroom"
            name="bathroom"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Bathroom" size="large"/>
            </Form.Item>
            <Form.Item
            label="Other Room"
            name="otherRoom"
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Other Room" size="large"/>
            </Form.Item>
        </div>
        <Form.Item label="Example Checkbox Group" name="exampleCheckboxGroup" style={{ marginBottom: "10px" }}>
            <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                    <Col span={12}>
                        <Checkbox value="forSale">For Sale</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="penthouse">Penthouse</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="forRental">For Rental</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="fixParking">Fix Parking</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="showOnWeb">Show on Web</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="petFriendly">Pet Friendly</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="hotDeal">Hot Deal</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="mkt">MKT ทำต่อ</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="splitCommission">Split Commission</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="proppitBoosted">Proppit Boosted</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="privateLift">Private Lift</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="foreignerOwner">Foreigner Owner</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox value="duplexLoft">Duplex - Loft</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
        </Form.Item>
        <Form.Item name="splitCommissionComment" label="Split Commission Comment" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <Form.Item name="remark" label="Remark" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <Form.Item name="vdoList" label="VDO List (1 Line per URL)" className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
    </Form>
  );
};