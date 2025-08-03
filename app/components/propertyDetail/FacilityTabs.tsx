import { Form, Checkbox, Col, Row } from "antd";
import { getPropertyById } from "@/app/server_actions/property";
import { useEffect, useState } from "react";

type SelectedProperty = {
    key?: number;
  };
  type Facility = {
    id: number;
    name: string;
    icon: string;
    forProject: boolean;
    forProperty: boolean;
  };

export const FacilityTabs = ({  token, selectedProperty, modalType }: { token: string, selectedProperty: SelectedProperty, modalType: string }) => {  
    console.log("token in FacilityTabs", token);
    console.log("selectedProperty in FacilityTabs", selectedProperty);
    const [propertyFacility, setPropertyFacility] = useState<Facility[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        getPropertyById(selectedProperty.key as number, token).then((response) => {
            // กรองเฉพาะ facility ที่ forProperty === true
            console.log("response.facilities in FacilityTabs", response.fafilities);
            const filteredFacilities = (response.fafilities);
            setPropertyFacility(filteredFacilities);
    
            // ตั้งค่าฟอร์มให้ checkbox ถูกติ๊กตาม facility ที่ได้มา
            const formValues: Record<string, boolean> = {};
            filteredFacilities.forEach((facility: Facility) => {
                formValues[facility.id] = true;
            });
            form.setFieldsValue(formValues);
        });
    }, [selectedProperty.key, token]);
    

    return (
        <Form form={form} layout="vertical" name="tabsFacilityDetail">
            <Row>
                {propertyFacility.map((facility) => facility.forProperty && modalType === "property" && (
                    <Col span={12} key={facility.id}>
                        <Form.Item name={facility.id} >
                            <Checkbox>{facility.name} 
                                <i className={`${facility.icon} icofont-2x ps-2`} aria-label={facility.name} />
                            </Checkbox>
                        </Form.Item>
                    </Col>
                ))}  
                {propertyFacility.map((facility) => facility.forProject && modalType === "project" && (
                    <Col span={12} key={facility.id}>
                        <Form.Item name={facility.id} >
                            <Checkbox>{facility.name} 
                                <i className={`${facility.icon} icofont-2x ps-2`} aria-label={facility.name} />
                            </Checkbox>
                        </Form.Item>
                    </Col>
                ))}
              
            </Row>
        </Form>
    )
}