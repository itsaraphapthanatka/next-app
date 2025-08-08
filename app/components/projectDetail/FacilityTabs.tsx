import { Form, Checkbox, Col, Row } from "antd";
import { getPropertyById } from "@/app/server_actions/property";
import { useEffect, useState } from "react";

type SelectedProject = {
    id?: number;
    projectId?: number;
  };
  type Facility = {
    id: number;
    name: string;
    icon: string;
    forProject: boolean;
    forProperty: boolean;
  };

export const FacilityTabs = ({  token, selectedProject, modalType }: { token: string, selectedProject: SelectedProject, modalType: string }) => {  
    console.log("token in FacilityTabs", token);
    console.log("selectedProject in FacilityTabs", selectedProject);
    const [propertyFacility, setPropertyFacility] = useState<Facility[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        getPropertyById(selectedProject.projectId as number, token).then((response) => {
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
    }, [selectedProject.projectId, token]);
    

    return (
        <Form form={form} layout="vertical" name="tabsFacilityDetail">
        <Row>
          <Col span={24}>
            <Form.Item name="facilities">
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  {propertyFacility
                    .filter((facility) =>
                      modalType === "property" ? facility.forProperty : facility.forProject
                    )
                    .map((facility) => (
                      <Col span={12} key={facility.id}>
                        <Checkbox value={facility.id}>
                          {facility.name}
                          <i
                            className={`${facility.icon} icofont-2x ps-2`}
                            aria-label={facility.name}
                          />
                        </Checkbox>
                      </Col>
                    ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      
    )
}