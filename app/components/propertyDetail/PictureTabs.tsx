import { Form, Divider, Upload, Button, message, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import type { TabsProps } from "antd";
import { PicturePreviewMode } from "./PicturePreviewMode";
import { SortablePictureMode } from "./SortablePictureMode";
import React, { useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";
import { uploadPropertyPictures } from "@/app/server_actions/property";
import { App as AntdApp } from "antd";

type SelectedProperty = {
  propertyId?: number;
  picturePGColor?: string;
  picturePGText?: string;
  vipStatusColor?: string;
  invid?: string;
  project?: string;
  vipStatus?: string;
};

interface UploadPicture {
  uid: string;
  name: string;
  status: UploadFileStatus;
  url?: string;
  propertyId?: number;
}

export const PictureTabs = ({
  selectedProperty,
  token,
}: {
  selectedProperty: SelectedProperty;
  token: string;
}) => {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadPicture[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ move beforeUpload out so <Upload> can use it
  const beforeUpload = (file: RcFile) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg";
    if (!isPNG && !isJPG) {
      message.error(`${file.name} is not a PNG or JPG file`);
      return Upload.LIST_IGNORE;
    }
    return isPNG || isJPG;
  };

  const handleUpload = async (info: UploadChangeParam) => {
    const newFileList = (info.fileList as UploadPicture[]).map((file) => ({
      ...file,
      propertyId: selectedProperty.propertyId,
    }));
  
    setFileList(newFileList);
    console.log("info.fileList in PictureTabs", newFileList);
  
    if (newFileList.some((file) => file.status === "uploading")) {
      try {
        const response = await uploadPropertyPictures(
          selectedProperty.propertyId as number,
          token,
          newFileList
        );
        if (response.status === 200) {
          setFileList(newFileList.filter((file) => file.status !== "uploading"));
          message.success("Upload success!");
        } else {
          message.error("Upload failed!");
        }
        console.log("response in PictureTabs", response);
      } catch (error) {
        message.error("Upload failed!");
        console.error(error);
      }
    }
  };
  

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Preview Mode",
      children: (
        <PicturePreviewMode
          key={refreshKey} // 🔥 re-render when refreshKey changes
          selectedProperty={selectedProperty}
          token={token}
        />
      ),
    },
    {
      key: "2",
      label: "Sortable Mode",
      children: (
        <SortablePictureMode
          selectedProperty={selectedProperty}
          token={token}
          onSorted={() => {
            setRefreshKey((prev) => prev + 1); // 🔥 refresh Preview after sorting
          }}
        />
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" name="tabsPictureDetail">
      <Form.Item
        name="uploadPicture"
        className="text-[12px]"
        style={{ marginBottom: "10px" }}
      >
        <Upload
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Upload PNG or JPG only</Button>
        </Upload>
      </Form.Item>
      <Divider />
      <Tabs items={items} />
    </Form>
  );
};
