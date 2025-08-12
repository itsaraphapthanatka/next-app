import { Button, Form, Input, Select } from "antd";
import { FormInstance } from "antd/es/form";
import { getUnitType } from "@/app/server_actions/unittype";
import {  useEffect, useState } from "react";
import { getProjectsName } from "@/app/server_actions/projectsName";


export const NewLead = ({form, token}: {form: FormInstance, token: string}) => {

    // const token = await getToken();
    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    const [projectsName, setProjectsName] = useState<{label: string, value: string}[]>([]);


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


    const handleSearchContact = () => {
        console.log("search contact");
    };


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

            <Form.Item
            label="Status"
            name="status"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Show Select Status" size="large">
                <Select.Option value={0}>Show Select Status</Select.Option>
                <Select.Option value={1}>Hot</Select.Option>
                <Select.Option value={2}>Warm</Select.Option>
                <Select.Option value={3}>Cold</Select.Option>
                <Select.Option value={4}>Dead</Select.Option>
                <Select.Option value={5}>Book</Select.Option>
                <Select.Option value={6}>Undefined</Select.Option>
                <Select.Option value={7}>Warm</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item
            label="Purpose (wait for API)"
            name="purpose"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Show Select Purpose" size="large">
                <Select.Option value={0}>Show Select Purpose</Select.Option>
                <Select.Option value={1}>เช่า</Select.Option>
                <Select.Option value={2}>ซื้อ</Select.Option>
                <Select.Option value={9}>Furniture</Select.Option>
                <Select.Option value={10}>CareTaker</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item
            label="Source (wait for API)"
            name="source"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Show Select Source" size="large">
                <Select.Option value={0}>Show Select Source</Select.Option>
                <Select.Option value={1}>Hipflat</Select.Option>
                <Select.Option value={2}>DDproperty</Select.Option>
                <Select.Option value={3}>Thailand property</Select.Option>
                <Select.Option value={4}>Living insider</Select.Option>
                <Select.Option value={5}>Proppit</Select.Option>
                <Select.Option value={6}>Agent Group</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item
            label="Client Type (wait for API)"
            name="clientType"
            style={{ marginBottom: "10px" }}
            >
            <Select placeholder="Show Select Client Type" size="large">
                <Select.Option value={0}>Show Select Client Type</Select.Option>
                <Select.Option value={1}>Client</Select.Option>
                <Select.Option value={2}>CO-Agent</Select.Option>
            </Select>
            </Form.Item>

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

            <Form.Item
            label="Contact"
            name="contact"
            style={{ marginBottom: "10px"}}

            >
                <Input placeholder="Contact" size="large" readOnly />
            </Form.Item>

            <Button color="orange" size="large"
            onClick={handleSearchContact}
            variant="solid"
            className="w-full mt-2"
            >
              Search Contact
            </Button>

        </Form>
    )
}