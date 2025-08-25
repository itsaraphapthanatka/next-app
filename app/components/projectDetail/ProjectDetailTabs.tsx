'use client';
// import { getDecorations } from "@/app/server_actions/decorations";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Form, Input, Select, Checkbox, Col, Row } from "antd";
import { getPropertyTypes } from "@/app/server_actions/master";
import TextArea from "antd/es/input/TextArea";
import { getProjectById } from "@/app/server_actions/project";

// import dayjs from "dayjs";

type ProjectDetail = {
  id?: number;
  developerBrand?: {
    id?: number;
    name?: string;
    createUser?: string;
    createDate?: string;
    updateUser?: string;
    updateDate?: string | null;
    thaiName?: string;
    errors?: [];
    haveError?: boolean;
    notHaveError?: boolean;
    returnObjectId?: number;
    successMessage?: string;
  } | string;
  name?: string;
  thaiName?: string;
  headline?: string;
  propertyType?: string;
  no?: number;
  project?: string;
  overView?: string;
  thaiOverView?: string;
  area?: number;
  massTransit?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  address?: string;
  latitude?: number | string;
  longtitude?: number | string;
  displayGeoLocation?: string;
  petFriendly?: boolean;
  petLimit?: number;
  isLeaseHold?: boolean;
  parkingSpace?: number;
  fixParkingSpace?: boolean;
  buildYear?: number;
  towerCount?: number;
  totalRoom?: number;
  maintainanceFee?: number;
  singkingFund?: number;
  place?: string;
  nearlyCondo?: string;
  maximumClass?: number;
  towers?: [];
  pictures?: {
    id?: number;
    filename?: string;
    applicationType?: string;
    extension?: string;
    guId?: string;
    sourceType?: string;
    sourceId?: number;
    fileSize?: number;
    sortIndex?: number;
    imageHeight?: number;
    imageWidth?: number;
    filePath?: string;
    url?: string;
    originalURL?: string;
    watermarkURL?: string;
    caption?: string;
    errors?: [];
    haveError?: boolean;
    notHaveError?: boolean;
    returnObjectId?: number;
    successMessage?: string;
  }[];
  overview?: string;
  projectView?: number;
  website?: string;
  rentRoom?: number;
  rentMinimum?: number;
  saleRoom?: number;
  saleMinimum?: number;
  seo?: {
    title?: string;
    keyword?: string;
    description?: string;
    thaiTitle?: string;
    thaiDescription?: string;
    thaiKeyword?: string;
  };
  ddpropertyId?: string;
  canonical?: string;
  facilities?: [];
  vdoList?: string;
  projectType?: {
    id?: number;
    name?: string;
    createUser?: string;
    createDate?: string;
    updateUser?: string;
    updateDate?: string | null;
    thaiName?: string;
    errors?: [];
    haveError?: boolean;
    notHaveError?: boolean;
    returnObjectId?: number;
    successMessage?: string;
  };
  baaniaId?: string;
  privateLift?: boolean;
  duplex?: boolean;
  projectNameForSEO?: string;
  proppitId?: string;
  rentMarketPrice?: number;
  saleMarketPrice?: number;
  areaId?: number;
  areaShortName?: string;
  areaThaiShortName?: string;
  vdOs?: [];
  massTransitLineId?: number;
  massTransitLineStationType?: string;
  nearStationId?: number;
  airTableId?: string;
  disable?: boolean;
  subDistrictId?: number;
  thaiAddress?: string;
  provinceId?: number;
  districtId?: number;
  thaiNearlyCondo?: string;
  juristicCompanyName?: string;
  juristicContactName?: string;
  juristicContactPosition?: string;
  juristicContactPhoneNumber?: string;
  parkingRemark?: string;
  subDistrictName?: string;
  provinceName?: string;
  districtName?: string;
  fullName?: string;
  seoID?: number | null;
  finishYear?: number;
  ddPropertyProjectId?: number;
  baaniaProjectId?: number;
  exampleCheckboxGroup?: string[];
};

type ProjectType = {
  id: string;
  name: string;
};

// type ProjectStatus = {
//   id: string;
//   name: string;
// };


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
  console.log("selectedProject in ProjectDetailTabs", selectedProject);
  const [formProjectDetail] = Form.useForm();
  const [project, setProject] = useState<ProjectDetail>(selectedProject);
  const [propertyTypes, setPropertyTypes] = useState<ProjectType[]>([]);

  // const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
//   const [decorations, setDecorations] = useState<Decoration[]>([]);

  // Fetch Project Types
  useEffect(() => {
    getPropertyTypes(token).then((response) => {
      setPropertyTypes(response);
      console.log("propertyTypes", propertyTypes);
    });
  }, [token]);

  // Fetch Property Status
  useEffect(() => {
    // getProjectStatuses(token).then(setProjectStatus);
  }, [token]);


  // Fetch Property Detail
  useEffect(() => {
    if (!selectedProject.id) return;
    getProjectById(selectedProject.id as number, token).then((response) => {
      console.log("response.projectDetail", response);
      setProject(response);
      formProjectDetail.setFieldsValue({
        ...response,
        projectType: response.projectType?.id,
        developerBrand: response.developerBrand?.id,
        disable: response.disable ? "true" : "false",
      });
      
    });
    // eslint-disable-next-line
  }, [selectedProject.id, token]);


  // // Fetch Property Detail
  // useEffect(() => {
  //   if (!selectedProject.id) return;
  //     formProjectDetail.setFieldsValue(selectedProject);
  // }, [selectedProject]);

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
    [project, selectedProject]
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
          name="id"
          label="Project ID"
          className="text-[12px]"
          initialValue={project.id}
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
          />
        </Form.Item>
        <Form.Item
          name="developerBrand"
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
          name="name"
          label="Name"
          initialValue={project.name}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Input
            size="large"
            readOnly
          />
        </Form.Item>
        <Form.Item
          name="thaiName"
          label="Thai Name"
          initialValue={project.thaiName}
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
        <h1>Project Type {project.projectType?.id}</h1>
        <Form.Item
          name="projectType"
          label="Property Type"
          initialValue={project.projectType?.id} // ✅ ตั้งค่า default
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Select size="large">
            {propertyTypes.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="overview"
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
                name: "maintainanceFee",
                placeholder: "Common Area Fee",
            },
            {
                label: "Signking Fund.",
                name: "singkingFund",
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
          name="disable"
          label="สถานะการใช้งาน"
          initialValue={project.disable}
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Select size="large">
            <Select.Option value="false">ใช้งานปกติ</Select.Option>
            <Select.Option value="true">ยกเลิกการใช้งานชั่วคราว</Select.Option>
          </Select>
        </Form.Item>
        </Form>
    </>
  );
};