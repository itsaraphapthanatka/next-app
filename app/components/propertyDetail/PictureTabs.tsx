import { Form, Divider, Upload, Button, message, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/es/upload";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile } from "antd/es/upload";
import type { TabsProps } from 'antd';
import { PicturePreviewMode } from "./PicturePreviewMode";
import { SortablePictureMode } from "./SortablePictureMode";
import React, { useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";
import { uploadPropertyPictures } from "@/app/server_actions/property";

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
    url: string;
  }

export const PictureTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("selectedProperty in PictureTabs", selectedProperty)
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadPicture[]>([]);

    const props: UploadProps = {
        beforeUpload: (file: RcFile) => {
          const isPNG = file.type === 'image/png';
          const isJPG = file.type === 'image/jpeg';
          if (!isPNG && !isJPG) {
            message.error(`${file.name} is not a png or jpg file`);
          }
          return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        onChange: (info: UploadChangeParam) => {
          setFileList(info.fileList as UploadPicture[]);
          console.log(info.fileList);
        },
        fileList: fileList,
      };

    const handleUpload = async () => {
        const response = await uploadPropertyPictures(selectedProperty.propertyId as number, token, fileList);
        console.log(response);
    }

    const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Preview Mode',
        children: <PicturePreviewMode selectedProperty={selectedProperty} token={token}/>,
    },
    {
        key: '2',
        label: 'Sortable Mode',
        children: <SortablePictureMode selectedProperty={selectedProperty} token={token}/>,
    },
    ];
      
    return (
        <Form form={form}
            layout="vertical"
            name="tabsPictureDetail">
            <Form.Item name="uploadPicture" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />} onClick={handleUpload}>Upload png or jpg only</Button>
                </Upload>
            </Form.Item>
            <Divider />
            <Tabs items={items} />
        </Form>
    )
}