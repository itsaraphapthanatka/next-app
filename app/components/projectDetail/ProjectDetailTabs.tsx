'use client';
// import { getDecorations } from "@/app/server_actions/decorations";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Form, Input, Select, Checkbox, Col, Row } from "antd";

import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

type ProjectDetail = {
  projectId?: number;
  developerBrand?: string;
  projectName?: string;
  projectThaiName?: string;
  headline?: string;
  propertyType?: string;
  no?: number;
  id?: number;
  project?: string;
  overView?: string;
  thaiOverView?: string;
  area?: number;
  massTransit?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  address?: string;
  thaiAddress?: string;
  latitude?: number;
  longtitude?: number;
  petLimit?: number;
  parkingSpace?: number;
  parkingRemark?: string;
  finishYear?: number;
  towers?: number;
  maximumClass?: number;
  totalRoom?: number;
  commonAreaFee?: number;
  signingFund?: number;
  ddPropertyProjectId?: number;
  baaniaProjectId?: number;
  proppitId?: number;
  nearlyCondo?: string;
  thaiNearlyCondo?: string;
  vdoList?: string;
  projectStatus?: string;
  exampleCheckboxGroup?: string[];
};

type ProjectType = {
  id: string;
  name: string;
};

type ProjectStatus = {
  id: string;
  name: string;
};


const CHECKBOX_GROUPS = [
    { value: "petFriendly", label: "Pet Friendly" },
    { value: "fixParking", label: "Fix Parking Space" },
    { value: "forSale", label: "Lease Hold" },
    { value: "privateLift", label: "Private Lift" },
    { value: "duplexLoft", label: "Duplex - Loft" },

];

export const ProjectDetailTabs = ({
  selectedProject,
  token,
}: {
  selectedProject: ProjectDetail;
  token: string;
}) => {
  const [project] = useState<ProjectDetail>(selectedProject);
  const [formProjectDetail] = Form.useForm();
  // const [projectType, setProjectType] = useState<ProjectType[]>([]);
  // const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
//   const [decorations, setDecorations] = useState<Decoration[]>([]);

  // Fetch Project Types
  useEffect(() => {
    // getProjectType(token).then(setProjectType);
  }, [token]);

  // Fetch Property Status
  useEffect(() => {
    // getProjectStatuses(token).then(setProjectStatus);
  }, [token]);


//   // Fetch Property Detail
//   useEffect(() => {
//     if (!selectedProject.propertyId) return;
//     getProjectById(selectedProject.propertyId as number, token).then((response) => {
//       setProject(response.projectDetail);
//       form.setFieldsValue(response.projectDetail);
//     });
//     // eslint-disable-next-line
//   }, [selectedProject.propertyId, token]);

  // Memoize checkbox checked values for performance
  const checkboxChecked = useMemo(
    () => ({
     
    }),
    [project]
  );

  // Helper to render paired Form.Item in a row
  const renderFormRow = useCallback(
    (
      items: {
        label: string;
        name: keyof ProjectDetail;
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
    [project]
  );

//   useEffect(() => {
//     // console.log("selectedProperty in FormProperty", selectedProperty);
//     console.log("project in FormProject", project);
//     // if (!selectedProject.propertyId) return;
//     getProjectById(selectedProject.propertyId as number, token).then((response) => {
//       const detail = response.projectDetail;
//       setProject(detail);
//       form.setFieldsValue({
//         ...detail,
//         rentPG: detail.rentProfitGap ? detail.rentProfitGap.toFixed(2) + " %" : "0.00 %",
//         salePG: detail.saleProfitGap ? detail.saleProfitGap.toFixed(2) + " %" : "0.00 %",
//         vipStatus: detail.vipStatusID ?? detail.vipStatus,
//         availableOn: detail.availableOn ? dayjs(detail.availableOn) : undefined,
//         lastedUpdate: detail.lastedUpdate ? dayjs(detail.lastedUpdate) : undefined,
//         hotDealExpiredDate: detail.hotDealExpiredDate ? dayjs(detail.hotDealExpiredDate) : undefined,
//       });
//       console.log("detail:", detail);
//     });
//   }, [selectedProject.propertyId, token]);
  

  return (
    <>
      <Form  
        form={formProjectDetail}
        layout="vertical"
        name="tabsProjectDetail"  
      >
        <Form.Item
          name="Project ID"
          label="Project ID"
          className="text-[12px]"
          initialValue={project.projectId}
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
          />
        </Form.Item>
        <Form.Item
          name="Developer Brand"
          label="Developer Brand"
          initialValue={project.developerBrand}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
           
          />
        </Form.Item>
        <Form.Item
          name="Name"
          label="Name"
          initialValue={project.projectName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
          />
        </Form.Item>
        <Form.Item
          name="Thai Name"
          label="Thai Name"
          initialValue={project.projectThaiName}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item hidden={true}
          name="headline"
          label="Headline"
          initialValue={project.headline}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="Property Type"
          label="Property Type"
          initialValue={project.propertyType}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="project"
          label="Project Name"
          initialValue={project.project}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
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
          initialValue={project.thaiOverView}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="area"
          label="area"
          initialValue={project.area}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="massTransit"
          label="Mass Transit"
          initialValue={project.massTransit}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="province"
          label="Province"
          initialValue={project.province}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="district"
          label="District"
          initialValue={project.district}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="subDistrict"
          label="Sub District"
          initialValue={project.subDistrict}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="Address"   
          label="Address"
          initialValue={project.address}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="Thai Address"   
          label="Thai Address"
          initialValue={project.thaiAddress}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        {renderFormRow([
          {
            label: "Latitude",
            name: "latitude",
            placeholder: "Latitude",
          },
          {
            label: "Longtitude",
            name: "longtitude",
            placeholder: "Longtitude",
          },
        ])}
        {renderFormRow([
          {
            label: "Pet Limit",
            name: "petLimit",
            placeholder: "Pet Limit",
          },
          {
            label: "Parking Space (%)",
            name: "parkingSpace",
            placeholder: "Parking Space (%)",
          },
        ])}
         <Form.Item
          name="Parking Remark"   
          label="Parking Remark"
          initialValue={project.parkingRemark}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          label="Example Checkbox Group"
          name="exampleCheckboxGroup"
          initialValue={project.exampleCheckboxGroup}
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
        {renderFormRow([
            {
                label: "Finish Year",
                name: "finishYear",
                placeholder: "Finish Year",
            },
            {
                label: "Towers",
                name: "towers",
                placeholder: "Towers",
            },
        ])}
        {renderFormRow([
            {
                label: "Maximum Class",
                name: "maximumClass",
                placeholder: "Maximum Class",
            },
            {
                label: "Total Room",
                name: "totalRoom",
                placeholder: "Total Room",
            },
        ])}
        {renderFormRow([
            {
                label: "Common Area Fee",
                name: "commonAreaFee",
                placeholder: "Common Area Fee",
            },
            {
                label: "Signking Fund.",
                name: "signingFund",
                placeholder: "Signking Fund.",
            },
        ])}
        <Form.Item
          name="ddPropertyProjectId"
          label="DDProperty ProjectID"
          initialValue={project.ddPropertyProjectId}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input size="large" />
        </Form.Item>
        {renderFormRow([
             {
                label: "Baania ProjectID",
                name: "baaniaProjectId",
                placeholder: "Baania ProjectID",
            },
            {
                label: "Proppit ID",
                name: "proppitId",
                placeholder: "Proppit ID",
            },
        ])}
        <Form.Item
          name="nearlyCondo"
          label="Nearly Condo"
          initialValue={project.nearlyCondo}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="thaiNearlyCondo"
          label="Thai Nearly Condo"
          initialValue={project.thaiNearlyCondo}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="vdoList"
          label="VDO List (1 Line per URL)"
          initialValue={project.vdoList}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <TextArea size="large" />
        </Form.Item>
        <Form.Item
          name="projectStatus"
          label="สถานะการใช้งาน"
          initialValue={project.projectStatus}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Select size="large">
            <Select.Option value="active">ใช้งานปกติ</Select.Option>
            <Select.Option value="inactive">ยกเลิกการใช้งานชั่วคราว</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};