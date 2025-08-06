"use client";
// import { getDecorations } from "@/app/server_actions/decorations";
import { Form, Input, Select, Checkbox, Col, Row } from "antd";

import TextArea from "antd/es/input/TextArea";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getPropertyById } from "@/app/server_actions/property";
import { getUnitType } from "@/app/server_actions/unittype";
import { getPropertyStatuses, getVipStatuses } from "@/app/server_actions/master";
import dayjs from "dayjs";

type PropertyDetail = {
  id?: number;
  propertyId?: number;
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
  overView?: string;
  thaiOverview?: string;
  addressNo?: string;
  unitCode?: string;
  tower?: string;
  floor?: string;
  floorAliasName?: string;
  liftLobby?: string;
  unitTypeId?: string;
  parkingStot?: string;
  rentedFor?: string;
  availableOn?: string;
  lastedUpdate?: string;
  hotDealExpiredDate?: string;
  bedRoom?: string;
  bathRoom?: string;
  otherRoom?: string;
  exampleCheckboxGroup?: string[];
  splitCommissionComment?: string;
  remark?: string;
  vdoList?: string;
  forSale?: boolean;
  penthouse?: boolean;
  forRental?: boolean;
  fixParking?: boolean;
  showOnWeb?: boolean;
  petFriendly?: boolean;
  hotDeal?: boolean;
  mkt?: boolean;
  splitCommission?: boolean;
  proppitBoosted?: boolean;
  privateLift?: boolean;
  foreignerOwner?: boolean;
  duplexLoft?: boolean;
  rentProfitGap?: number;
  saleProfitGap?: number;
};

type UnitType = {
  id: string;
  name: string;
};

type PropertyStatus = {
  id: string;
  name: string;
};

type VipStatus = {
  id: string;
  name: string;
  color: string;
};



const CHECKBOX_GROUPS = [
  { value: "forSale", label: "For Sale" },
  { value: "penthouse", label: "Penthouse" },
  { value: "forRent", label: "For Rental" },
  { value: "fixParking", label: "Fix Parking" },
  { value: "showOnWeb", label: "Show on Web" },
  { value: "petFriendly", label: "Pet Friendly" },
  { value: "hotDeal", label: "Hot Deal" },
  { value: "fowardToMKT", label: "MKT ทำต่อ" },
  { value: "splitCommission", label: "Split Commission" },
  { value: "proppipBoosted", label: "Proppit Boosted" },
  { value: "privateLift", label: "Private Lift" },
  { value: "foriegnerOwner", label: "Foreigner Owner" },
  { value: "duplexLoft", label: "Duplex - Loft" },
];

export const FormProperty = ({
  selectedProperty,
  token,
}: {
  selectedProperty: PropertyDetail;
  token: string;
}) => {
  const [property, setProperty] = useState<PropertyDetail>(selectedProperty);
  const [form] = Form.useForm();
  const [unitType, setUnitType] = useState<UnitType[]>([]);
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus[]>([]);
  const [vipStatus, setVipStatus] = useState<VipStatus[]>([]);
//   const [decorations, setDecorations] = useState<Decoration[]>([]);

  // Fetch Unit Types
  useEffect(() => {
    getUnitType(token).then(setUnitType);
  }, [token]);

  // Fetch Property Status
  useEffect(() => {
    getPropertyStatuses(token).then(setPropertyStatus);
  }, [token]);

  // Fetch VIP Status
  useEffect(() => {
    getVipStatuses(token).then(setVipStatus);
  }, [token]);

  // Fetch Property Detail
  useEffect(() => {
    if (!selectedProperty.propertyId) return;
    getPropertyById(selectedProperty.propertyId as number, token).then((response) => {
      setProperty(response.propertyDetail);
      form.setFieldsValue(response.propertyDetail);
    });
    // eslint-disable-next-line
  }, [selectedProperty.propertyId, token]);

  // Memoize checkbox checked values for performance
  const checkboxChecked = useMemo(
    () => ({
      forSale: !!property.forSale,
      penthouse: !!property.penthouse,
      forRental: !!property.forRental,
      fixParking: !!property.fixParking,
      showOnWeb: !!property.showOnWeb,
      petFriendly: !!property.petFriendly,
      hotDeal: !!property.hotDeal,
      mkt: !!property.mkt,
      splitCommission: !!property.splitCommission,
      proppitBoosted: !!property.proppitBoosted,
      privateLift: !!property.privateLift,
      foreignerOwner: !!property.foreignerOwner,
      duplexLoft: !!property.duplexLoft,
    }),
    [property]
  );

  // Helper to render paired Form.Item in a row
  const renderFormRow = useCallback(
    (
      items: {
        label: string;
        name: keyof PropertyDetail;
        placeholder?: string;
        className?: string;
      }[]
    ) => (
      <div className="flex gap-3 w-full">
        {items.map((item) => (
          <Form.Item
            key={item.name as string}
            label={item.label}
            name={item.name}
            className={item.className}
            style={{ marginBottom: "10px" }}
          >
            <Input placeholder={item.placeholder || item.label} size="large" />
          </Form.Item>
        ))}
      </div>
    ),
    [property]
  );

  useEffect(() => {
    // console.log("selectedProperty in FormProperty", selectedProperty);
    console.log("property in FormProperty", property);
    // if (!selectedProperty.propertyId) return;
    getPropertyById(selectedProperty.propertyId as number, token).then((response) => {
      const detail = response.propertyDetail;
      setProperty(detail);
      form.setFieldsValue({
        ...detail,
        rentPG: detail.rentProfitGap ? detail.rentProfitGap.toFixed(2) + " %" : "0.00 %",
        salePG: detail.saleProfitGap ? detail.saleProfitGap.toFixed(2) + " %" : "0.00 %",
        vipStatus: detail.vipStatusID ?? detail.vipStatus,
        availableOn: detail.availableOn ? dayjs(detail.availableOn) : undefined,
        lastedUpdate: detail.lastedUpdate ? dayjs(detail.lastedUpdate) : undefined,
        hotDealExpiredDate: detail.hotDealExpiredDate ? dayjs(detail.hotDealExpiredDate) : undefined,
      });
      console.log("detail:", detail);
    });
  }, [selectedProperty.propertyId, token]);
  

  return (
    <div>
      <p>Property ID {selectedProperty.propertyId}</p>
      <Form  initialValues={{
        availableOn: property.availableOn ? dayjs(property.availableOn) : undefined,
        lastedUpdate: property.lastedUpdate ? dayjs(property.lastedUpdate) : undefined,
        hotDealExpiredDate: property.hotDealExpiredDate ? dayjs(property.hotDealExpiredDate) : undefined,
      }}
        form={form}
        layout="vertical"
        name="tabsPropertyDetail"
        // initialValues={property}
      >
        <Form.Item
          name="rentPG"
          label="Rent Profit gap"
          initialValue={
            selectedProperty.rentPGText
              ? selectedProperty.rentPGText + " %"
              : "%"
          }
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
            style={{
              color: selectedProperty.rentPGColor,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Form.Item>
        <Form.Item
          name="salePG"
          label="Sale Profit gap"
          initialValue={
            selectedProperty.salePGText
              ? parseFloat(selectedProperty.salePGText).toFixed(2) + " %"
              : "%"
          }
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
            style={{
              color: selectedProperty.salePGColor,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Form.Item>
        <Form.Item
          name="invid"
          label="INVID"
          initialValue={selectedProperty.invid}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
            style={{
              color: selectedProperty.vipStatusColor,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Form.Item>
        <Form.Item
          name="oldinvid"
          label="OLD INVID."
          initialValue={property.oldinvid}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="headline"
          label="Headline"
          initialValue={property.headline}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="thaiHeadline"
          label="Thai Headline"
          initialValue={property.thaiHeadline}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="project"
          label="Project Name"
          initialValue={property.project}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="vipStatus"
          label="VIP Status"
          initialValue={property.vipStatus}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Select size="large">
          {vipStatus.map((opt) => (
            <Select.Option key={opt.id} value={opt.id} style={{ color: opt.color }}>
              {opt.name}
            </Select.Option>
          ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="overView"
          label="Overview"
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="thaiOverView"
          label="Thai Overview"
          initialValue={property.thaiOverview}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        {renderFormRow([
          {
            label: "Address No",
            name: "addressNo",
            placeholder: "Address No",
          },
          {
            label: "Unit Code",
            name: "unitCode",
            placeholder: "Unit Code",
          },
        ])}
        {renderFormRow([
          {
            label: "Tower",
            name: "tower",
            placeholder: "Tower",
          },
          {
            label: "Floor",
            name: "floor",
            placeholder: "Floor",
          },
        ])}
        {renderFormRow([
          {
            label: "Floor alias name",
            name: "floorAliasName",
            placeholder: "Floor alias name",
          },
          {
            label: "Lift Lobby",
            name: "liftLobby",
            placeholder: "Lift Lobby",
          },
        ])}
        <div className="flex gap-3 w-full">
          <Form.Item
            label="Unit Type"
            name="unitTypeId"
            className="w-full"
            initialValue={property.unitTypeId}
            style={{ marginBottom: "10px" }}
          >
            <Select placeholder="Unit Type" size="large">
              {unitType.map((unit) => (
                <Select.Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Parking Slot"
            name="parkingStot"
            className="w-full"
            initialValue={property.parkingStot}
            style={{ marginBottom: "10px" }}
          >
            <Input placeholder="Parking Slot" size="large" />
          </Form.Item>
        </div>
        <div className="gap-3 w-full">
          <Form.Item
            label="Status"
            name="status"
            initialValue={property.status}
            style={{ marginBottom: "10px" }}
          >
            <Select placeholder="Show All Status" size="large">
              {propertyStatus.map((opt) => (
                <Select.Option key={opt.id} value={opt.id}>
                  {opt.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> 
        </div>
        {renderFormRow([
          {
            label: "Rented For",
            name: "rentedFor",
            placeholder: "Rented For",
          },
          {
            label: "Size",
            name: "size",
            placeholder: "Size",
          },
        ])}
        <div className="flex gap-3 w-full">
        <Form.Item
            name="availableOn"
            label="Available On"
            className="text-[12px]"
            style={{ marginBottom: "10px" }}
        >
            <Input size="large" />
        </Form.Item>
        <Form.Item
            label="Last Update Status"
            name="lastedUpdate"
            className="text-[12px]"
            style={{ marginBottom: "10px" }}
        >
            <Input size="large" />
        </Form.Item>
        </div>
        <div className="flex gap-3 w-full">
            <Form.Item
                label="Hot deal Exp. Date (Clear)"
                name="hotDealExpiredDate"
                className="text-[12px] w-full"
                style={{ marginBottom: "10px" }}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                label="Bedroom"
                name="bedRoom"
                className="text-[12px] w-full"
            >
                <Input placeholder="Bedroom" size="large" />
            </Form.Item>
        </div>     
        {renderFormRow([
            {
                label: "Bathroom",
                name: "bathRoom",
                placeholder: "Bathroom",
            },
            {
                label: "Other Room",
                name: "otherRoom",
                placeholder: "Other Room",
            },
        ])}
        <Form.Item
          label="Example Checkbox Group"
          name="exampleCheckboxGroup"
          initialValue={selectedProperty.exampleCheckboxGroup}
          style={{ marginBottom: "10px" }}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              {CHECKBOX_GROUPS.map((item) => (
                <Col span={12} key={item.value}>
                  <Checkbox
                    value={item.value}
                    checked={checkboxChecked[item.value as keyof typeof checkboxChecked]}
                  >
                    {item.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="splitCommissionComment"
          label="Split Commission Comment"
          initialValue={property.splitCommissionComment}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="remark"
          label="Remark"
          initialValue={property.remark}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="vdoList"
          label="VDO List (1 Line per URL)"
          initialValue={property.vdoList}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
      </Form>
    </div>
  );
};