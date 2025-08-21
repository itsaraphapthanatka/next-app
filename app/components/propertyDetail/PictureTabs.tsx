import { Form, Divider, Upload, Button, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam   } from "antd/es/upload";
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
  const [fileList] = useState<UploadPicture[]>([]);
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
    const file = info.file;
    console.log("file in PictureTabs", file)
    // Prepare FormData to match the curl request
    const formData = new FormData();
    formData.append("id", String(selectedProperty.propertyId));
    // The API expects 'files' as an array, so we append the file as 'files'
    formData.append("files", file.originFileObj as RcFile);

    try {
      const response = await uploadPropertyPictures(
        token,
        formData
      );
      if (response.status === 200) {
        message.success("Upload success!");
        setRefreshKey((prev) => prev + 1);
      } else {
        message.error("Upload failed!");
      }
      console.log("response in PictureTabs", response);
    } catch (error) {
      message.error("Upload failed!");
      console.error("Upload error in PictureTabs", error);
    }
  };
  // const handleUpload = async (info: UploadChangeParam) => {
  //   const file = info.file;
  //   console.log("file in PictureTabs", file)
  //   // Prepare FormData to match the curl request
  //   const formData = new FormData();
  //   formData.append("id", String(selectedProperty.propertyId));
  //   // The API expects 'files' as an array, so we append the file as 'files'
  //   formData.append("files", file.originFileObj as RcFile);

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/upload-pictures`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "accept": "text/plain",
  //           "Authorization": `Bearer ${token}`,
  //           // Do NOT set Content-Type here; browser will set it with correct boundary for multipart/form-data
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       message.success("Upload success!");
  //     } else {
  //       message.error("Upload failed!");
  //     }
  //     const data = await response.text();
  //     console.log("response in PictureTabs", { status: response.status, data });
  //   } catch (error) {
  //     message.error("Upload failed!");
  //     console.error("Upload error in PictureTabs", error);
  //   }
  // };
  

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
          key={refreshKey}
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
          maxCount={10}
          multiple={true}
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
