"use client"
import { getDecorations } from "@/app/server_actions/decorations";
import { getUnitType } from "@/app/server_actions/unittype";
import { Form, Input, Select, Checkbox, Col, Row  } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";


type SelectedProperty = {
    id?: number;
    key?: number;
    no?: number;
    project?: string;
    size?: number;
    bed?: number;
    bath?: number;
    rental?: number;
    selling?: number;
    status?: string;
    rentPGColor?: string;
    rentPGText?: string;
    salePGColor?: string;
    salePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    vipStatus?: string;
    oldinvid?: string;
    headline?: string;
    thaiHeadline?: string;
    projectName?: string;
    overview?: string;
    thaiOverview?: string;
    addressNo?: string;
    unitCode?: string;
    tower?: string;
    floor?: string;
    floorAliasName?: string;
    liftLobby?: string;
    unitType?: string;
    parkingSlot?: string;
    rentedFor?: string;
    availableOn?: string;
    lastUpdateStatus?: string;
    hotDealExpireDate?: string;
    bedroom?: string;
    bathroom?: string;
    otherRoom?: string;
    exampleCheckboxGroup?: string[];
    splitCommissionComment?: string;
    remark?: string;
    vdoList?: string;
  };

type UnitType = {
    id: string;
    name: string;
}

type Decoration = {
    id: string;
    name: string;
}

export const FormProperty = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("selectedProperty in form", selectedProperty);
    const [form] = Form.useForm();
    const [unitType, setUnitType] = useState<UnitType[]>([]);
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    console.log(decorations);
    useEffect(() => {
        const fetchUnitType = async () => {
            const unitType = await getUnitType(token);
            setUnitType(unitType);
        };
        fetchUnitType();
    }, [token]);
    useEffect(() => {
        const fetchDecorations = async () => {
            const decorations = await getDecorations(token);
            setDecorations(decorations);
        };
        fetchDecorations();
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
            />
        </Form.Item>
        <Form.Item name="salePG" label="Sale Profit gap" initialValue={selectedProperty.salePGText ? selectedProperty.salePGText + " %" : "%"} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                readOnly
                style={{
                    color: selectedProperty.salePGColor,
                    backgroundColor: "#f5f5f5",
                }}
            />
        </Form.Item>
        <Form.Item name="invid" label="INVID" initialValue={selectedProperty.invid} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
                readOnly
                style={{
                    color: selectedProperty.vipStatusColor,
                    backgroundColor: "#f5f5f5",
                }}
            />
        </Form.Item>
        <Form.Item name="oldinvid" label="OLD INVID." initialValue={selectedProperty.oldinvid} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item>
        <Form.Item name="headline" label="Headline" initialValue={selectedProperty.headline} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item>
        <Form.Item name="thaiHeadline" label="Thai Headline" initialValue={selectedProperty.thaiHeadline} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item> 
        <Form.Item name="projectName" label="Project Name" initialValue={selectedProperty.projectName} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Input 
                size="large"
            />
        </Form.Item> 
        <Form.Item name="vipStatus" label="VIP Status" initialValue={selectedProperty.vipStatus} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <Select
                options={[{ label: "VIP", value: "VIP" }, { label: "Not VIP", value: "Not VIP" }]}
                size="large"
            />
        </Form.Item> 
        <Form.Item name="overview" label="Overview" initialValue={selectedProperty.overview} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
       <Form.Item name="thaiOverview" label="Thai Overview" initialValue={selectedProperty.thaiOverview} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Address No"
            name="addressNo"
            initialValue={selectedProperty.addressNo}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Address No" size="large"/>
            </Form.Item>
            <Form.Item
            label="Unit Code"
            name="unitCode"
            initialValue={selectedProperty.unitCode}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Unit Code" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Tower"
            name="tower"
            initialValue={selectedProperty.tower}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Tower" size="large"/>
            </Form.Item>
            <Form.Item
            label="Floor"
            name="floor"
            initialValue={selectedProperty.floor}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Floor" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Floor alias name"
            name="floorAliasName"
            initialValue={selectedProperty.floorAliasName}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Floor alias name" size="large"/>
            </Form.Item>
            <Form.Item
            label="Lift Lobby"
            name="liftLobby"
            initialValue={selectedProperty.liftLobby}
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
            initialValue={selectedProperty.unitType}
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
            initialValue={selectedProperty.parkingSlot}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Parking Slot" size="large"/>
            </Form.Item>
        </div>
        <div className="gap-3 w-full">
            <Form.Item
            label="Status"
            name="status"
            initialValue={selectedProperty.status}
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
            initialValue={selectedProperty.rentedFor}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Rented For" size="large"/>
            </Form.Item>
            <Form.Item
            label="Size"
            name="size"
            initialValue={selectedProperty.size}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Size" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Available On (Clear)"
            name="availableOn"
            initialValue={selectedProperty.availableOn}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Available On (Clear)" size="large"/>
            </Form.Item>
            <Form.Item
            label="Last Update Status"
            name="lastUpdateStatus"
            initialValue={selectedProperty.lastUpdateStatus}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Last Update Status" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Hot deal Exp. Date (Clear)"
            name="hotDealExpireDate"
            initialValue={selectedProperty.hotDealExpireDate}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Hot deal Exp. Date (Clear)" size="large"/>
            </Form.Item>
            <Form.Item
            label="Bedroom"
            name="bedroom"
            initialValue={selectedProperty.bedroom}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Bedroom" size="large"/>
            </Form.Item>
        </div>
        <div className="flex gap-3 w-full">  
            <Form.Item
            label="Bathroom"
            name="bathroom"
            initialValue={selectedProperty.bathroom}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Bathroom" size="large"/>
            </Form.Item>
            <Form.Item
            label="Other Room"
            name="otherRoom"
            initialValue={selectedProperty.otherRoom}
            style={{ marginBottom: "10px" }}
            >
            <Input placeholder="Other Room" size="large"/>
            </Form.Item>
        </div>
        <Form.Item label="Example Checkbox Group" name="exampleCheckboxGroup" initialValue={selectedProperty.exampleCheckboxGroup} style={{ marginBottom: "10px" }}>
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
        <Form.Item name="splitCommissionComment" label="Split Commission Comment" initialValue={selectedProperty.splitCommissionComment} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <Form.Item name="remark" label="Remark" initialValue={selectedProperty.remark} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
        <Form.Item name="vdoList" label="VDO List (1 Line per URL)" initialValue={selectedProperty.vdoList} className="text-[12px]"  style={{ marginBottom: "10px" }}>
            <TextArea
                size="large"
            />
        </Form.Item> 
    </Form>
  );
};