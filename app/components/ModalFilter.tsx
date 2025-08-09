import { Form, Input, InputNumber, Select, Tag } from "antd";
import { FormInstance } from "antd/es/form";
import { getUnitType } from "@/app/server_actions/unittype";
import { getPropertyStatuses, getMasstransits, getPropertyTypes, getVipStatuses } from "@/app/server_actions/master";
import {  useEffect, useState } from "react";
import type { SelectProps } from 'antd';
import { getProjectsName } from "@/app/server_actions/projectsName";
import { getEmployees } from "@/app/server_actions/master";
import { formatNumber, formatNumberParser } from "@/app/utils/formatNumber";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
}

export const ModalFilter = ({form, moduleType, token}: {form: FormInstance, moduleType: string, token: string}) => {

    // const token = await getToken();
    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    const [propertyStatuses, setPropertyStatuses] = useState<{label: string, value: string}[]>([]);
    const [masstransits, setMasstransits] = useState<{label: string, value: string}[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<{label: string, value: string}[]>([]);
    const [vipStatuses, setVipStatuses] = useState<{label: string, value: string, color: string}[]>([]);
    const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

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

    useEffect(() => {
      getEmployees(token).then((response) => {
          setEmployees(response);
      });
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

        const event = new CustomEvent('vipStatusChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handleChange = (value: string[]) => {
        const event = new CustomEvent('unitTypeChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handlePropertyTypeChange = (value: string[]) => {
        const event = new CustomEvent('propertyTypeChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handlePropertyStatusChange = (value: string[]) => {
        const event = new CustomEvent('propertyStatusChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handleMassTransitChange = (value: string[]) => {
        const event = new CustomEvent('massTransitChange', {
            detail: { value }
        });
        window.dispatchEvent(event);
    };

    const handleProjectNameChange = async (value: string) => {
      if (value.length < 2) return; // ป้องกันการยิง API ถ้าพิมพ์น้อยเกินไป
    
      console.log("value project name", value);
      const result = await getProjectsName(token, value);
      console.log("projectsName", result);
    
      const options = result.map((name: string) => ({
        label: name,
        value: name,
      }));
    
      setProjectsName(options);
    };
    // const numberFormatter = (value?: string | number) => {
    //   if (!value && value !== 0) return '';
    //   return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 1,234,567
    // };
    
    // const numberParser = (value?: string) => {
    //   return value ? value.replace(/,/g, '') : '';
    // };

    return (
        <Form
            form={form}
            layout="vertical"
            name="propertyFilter"
            initialValues={{
              projectNameFilter: "",
              unitTypeFilter: [],
              startSize: 0,
              toSize: 0,
              bedRoom: 0,
              bathRoom: 0,
              minRentalRateOnWeb: 0,
              maxRentalRateOnWeb: 0,
              minRentalRatePerSQM: 0,
              maxRentalRatePerSQM: 0,
              minSellingRate: 0,
              maxSellingRate: 0,
              minSellingRatePerSQM: 0,
              maxSellingRatePerSQM: 0,
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
              decorationIds: [],
              pictureStatusIds: [],
              startFloor: 0,
              toFloor: 0,
              propertyStatusIds: [],
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
            <Select 
              allowClear
              showSearch
              placeholder="Project Name" 
              size="large" 
              onSearch={handleProjectNameChange}
              onChange={(val) => form.setFieldsValue({ projectNameFilter: val })}
              options={projectsName}
              filterOption={false}
            />
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
            <div className="flex gap-3 w-full" >  
              <Form.Item
                label="Min. Rental Rate On Web"
                name="minRentalRateOnWeb"
                style={{ marginBottom: "10px", flex: 1  }}
                
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Min. Rental Rate On Web"
                  size="large"
                  style={{ width: "100%" }}

                />
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate On Web"
                name="maxRentalRateOnWeb"
                style={{ marginBottom: "10px", flex: 1   }}
              >
                <InputNumber 
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Max. Rental Rate On Web" 
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate Per SQM"
                name="minRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Min. Rental Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate Per SQM"
                name="maxRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Max. Rental Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Selling Rate On Web"
                name="minSellingRate"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Min. Selling Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Max. Selling Rate On Web"
                name="maxSellingRate"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Max. Selling Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Selling Rate Per SQM"
                name="minSellingRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Min. Selling Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Max. Selling Rate Per SQM"
                name="maxSellingRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Max. Selling Rate Per SQM"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Floor"
                name="minFloor"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Min. Floor"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Max. Floor"
                name="maxFloor"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Max. Floor"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Status"
                name="propertyStatusIds"
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
                  <Select.Option value={1}>For Rent</Select.Option>
                  <Select.Option value={2}>For Sale</Select.Option>
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
            <div hidden className="gap-3 w-full">
              <Form.Item
                label="MKT ทำต่อ"
                name="forwardMKT"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Reveal Status" size="large">
                  <Select.Option value={0}>Show All Status</Select.Option>
                  <Select.Option value={1}>ส่ง MKT ทำต่อ</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 flex w-full">
              <Form.Item
                label="Start Distance (Meter)"
                name="startDistance"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="Start Distance (Meter)"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="To Distance (Meter)"
                name="toDistance"
                style={{ marginBottom: "10px" }}
              >
                <InputNumber
                  formatter={(value) => formatNumber(value as number)}
                  parser={(value) => formatNumberParser(value ?? '')}
                  placeholder="To Distance (Meter)"
                  size="large"
                  style={{ width: "100%" }}
                />
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
                    <Select.Option value={0}>Show all assigner</Select.Option>
                    {employees.map((employee) => (
                        <Select.Option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            </>
            )}
        </Form>
    )
}