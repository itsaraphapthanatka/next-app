import { Form, Input, Select, Tag } from "antd";
import { FormInstance } from "antd/es/form";
import { getUnitType } from "@/app/server_actions/unittype";
import { getPropertyStatuses, getMasstransits, getPropertyTypes, getVipStatuses } from "@/app/server_actions/master";
import {  useEffect, useState } from "react";
import type { SelectProps } from 'antd';



export const ModalFilter = ({form, moduleType, token}: {form: FormInstance, moduleType: string, token: string}) => {

    // const token = await getToken();
    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    const [propertyStatuses, setPropertyStatuses] = useState<{label: string, value: string}[]>([]);
    const [masstransits, setMasstransits] = useState<{label: string, value: string}[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<{label: string, value: string}[]>([]);
    const [vipStatuses, setVipStatuses] = useState<{label: string, value: string, color: string}[]>([]);

    useEffect(() => {
      const fetchOptions = async () => {
          const unitType = await getUnitType(token);
          const options = unitType.map((option: {id: number, name: string}) => ({
              label: option.name,
              value: option.id
          }));
          setOptions(options);
          console.log("options", options);
      };
      fetchOptions();
    }, [token]);

    useEffect(() => {
      const fetchPropertyStatuses = async () => {
        const propertyStatuses = await getPropertyStatuses(token);
        const options = propertyStatuses.map((option: {id: number, name: string}) => ({
          label: option.name,
          value: option.id
        }));  
        setPropertyStatuses(options);
      };
      fetchPropertyStatuses();
    }, [token]);

    useEffect(() => {
      const fetchMasstransits = async () => {
        const masstransits = await getMasstransits(token);
        const options = masstransits.map((option: {id: number, name: string}) => ({
          label: option.name,
          value: option.id
        }));  
        setMasstransits(options);
      };
      fetchMasstransits();
    }, [token]);

    useEffect(() => {
      const fetchPropertyTypes = async () => {
        const propertyTypes = await getPropertyTypes(token);
        const options = propertyTypes.map((option: {id: number, name: string}) => ({
          label: option.name,
          value: option.id
        }));    
        setPropertyTypes(options);
      };
      fetchPropertyTypes();
    }, [token]);

    useEffect(() => {
      const fetchVipStatuses = async () => {
        const vipStatuses = await getVipStatuses(token);
        console.log("vipStatuses", vipStatuses);
        const options = vipStatuses.map((option: {id: number, name: string, color: string}) => ({
          label: option.name,
          value: option.id,
          color: option.color
        }));    
        setVipStatuses(options);
      };
      fetchVipStatuses();
    }, [token]);

    const tagRender: SelectProps['tagRender'] = (props) => {
      const { label, value, closable, onClose } = props;
      const selectedOption = vipStatuses.find(option => option.value === value);
      const color = selectedOption?.color || '#000'; // fallback
    
      const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
      };
    
      return (
        <Tag
          color={color}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginInlineEnd: 4 }}
        >
          {label}
        </Tag>
      );
    };

    const handleVipStatusChange = (value: string[]) => {

        console.log("value", value);
        const event = new CustomEvent('vipStatusChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handleChange = (value: string[]) => {
        console.log("value", value);
        const event = new CustomEvent('unitTypeChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handlePropertyTypeChange = (value: string[]) => {
        console.log("value", value);
        const event = new CustomEvent('propertyTypeChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handlePropertyStatusChange = (value: string[]) => {
        console.log("value", value);
        const event = new CustomEvent('propertyStatusChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handleMassTransitChange = (value: string[]) => {
        console.log("value", value);
        const event = new CustomEvent('massTransitChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="propertyFilter"
            initialValues={{
              minSize: 0,
              maxSize: 0,
              bedRoom: 0,
              bathRoom: 0,
              minRentalRateOnWeb: 0,
              maxRentalRateOnWeb: 0,
              minRentalRatePerSQM: 0,
              maxRentalRatePerSQM: 0,
              minFloor: 0,
              maxFloor: 0,
              propertyStatus: [],
              havePicture: 0,
              showOnWeb: 0,
              hotDeal: 0,
              forRentSaleStatus: 0,
              foreignerOwner: 0,
              massTransit: [],
              startDistance: 0,
              toDistance: 1000,  
              fixParking: 0,
              duplexLoft: 0,
              petFriendly: 0,
              privateLift: 0,
              penthouse: 0,
              propertyType: [], 
              vipStatus: [],
              revealStatus: [],
              assignFrom: [],
            }}
          
          >
          <div className="gap-3 w-full">
            <Form.Item
              label="Project"
              name="projectNameFilter"
              style={{ marginBottom: "10px" }}
            >
              <Input placeholder="Project Name" size="large" />
            </Form.Item>
          </div>
          <div className="gap-3 w-full">
            <Form.Item
              label="Unit Type"
              name="unitTypeFilter"
              style={{ marginBottom: "10px" }}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select" size="large"
                onChange={handleChange}
                options={options}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              />
            </Form.Item>
          </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Size"
                name="minSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Size" size="large" />
              </Form.Item>
              <Form.Item
                label="Max. Size"
                name="maxSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Size" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Bed Room"
                name="bedRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bed Room" size="large" />
              </Form.Item>
              <Form.Item
                label="Bath Room"
                name="bathRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bath Room" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate On  Web"
                name="minRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate On Web" size="large"/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate On Web"
                name="maxRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate On Web" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate Per SQM"
                name="minRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate Per SQM"
                name="maxRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Floor"
                name="minFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Floor" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Floor"
                name="maxFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Floor" size="large" />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Status"
                name="propertyStatus"
                style={{ marginBottom: "10px" }}
              >
                <Select 
                mode="multiple"
                allowClear
                placeholder="Please select" size="large" 
                onChange={handlePropertyStatusChange}
                options={propertyStatuses}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                 />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Have Picture"
                name="havePicture"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Have Picture</Select.Option>
                  <Select.Option value={2}>Not have Picture</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Show on Web"
                name="showOnWeb"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Hot Deal"
                name="hotDeal"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="For Rent/Sale Status"
                name="forRentSaleStatus"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Foreigner Owner"
                name="foreignerOwner"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Mass Transit"
                name="massTransit"
                style={{ marginBottom: "10px" }}
              >
                <Select 
                mode="multiple"
                allowClear
                placeholder="Please select" size="large" 
                onChange={handleMassTransitChange}
                options={masstransits}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                 />
              </Form.Item>
            </div>
            <div className="gap-3 flex w-full">
              <Form.Item
                label="Start Distance (Meter)"
                name="startDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Start Distance (Meter)" size="large" />
              </Form.Item>
              <Form.Item
                label="To Distance (Meter)"
                name="toDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="To Distance (Meter)" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Fix Parking"
                name="fixParking"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Have</Select.Option>
                  <Select.Option value={2}>Not Have</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Duplex Loft"
                name="duplexLoft"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Pet Friendly"
                name="petFriendly"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Pet Friendly</Select.Option>
                  <Select.Option value={2}>Not Friendly</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Private Lift"
                name="privateLift"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Have Private Lift </Select.Option>
                  <Select.Option value={2}>Not Have Private Lift</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Penthouse"
                name="penthouse"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={2}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Type"
                name="propertyType"
                style={{ marginBottom: "10px" }}
              >
                <Select 
                mode="multiple"
                allowClear
                placeholder="Please select" size="large" 
                onChange={handlePropertyTypeChange}
                options={propertyTypes}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="VIP Status"
                name="vipStatus"
                style={{ marginBottom: "10px" }}
              >
                <Select 
                mode="multiple"
                allowClear
                placeholder="Please select" size="large" 
                onChange={handleVipStatusChange}
                options={vipStatuses}
                tagRender={tagRender}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                />
              </Form.Item>
            </div>
            {moduleType === "assign" && (
                <>
            <div className="gap-3 w-full">
              <Form.Item
                label="Reveal Status"
                name="revealStatus"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Reveal Status" size="large">
                  <Select.Option value="0">Show all Reveal Status</Select.Option>
                  <Select.Option value="1">Wait For Reveal</Select.Option>
                  <Select.Option value="2">Revealing</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Assign From"
                name="assignFrom"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Assign From" size="large">
                  <Select.Option value="0">Show all assigner</Select.Option>
                  <Select.Option value="1">Preechakorn Tanngam</Select.Option>
                  <Select.Option value="2">Suthinop Pannapayuk</Select.Option>
                  <Select.Option value="3">Karn Assawaniwest</Select.Option>
                </Select>
              </Form.Item>
            </div>
            </>
            )}
        </Form>
    )
}