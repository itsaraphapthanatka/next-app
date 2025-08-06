import { Form, Divider, Upload, Button, message, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/es/upload";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile } from "antd/es/upload";
import type { TabsProps } from 'antd';
import { PicturePreviewMode } from "./PicturePreviewMode";
import { SortablePictureMode } from "./SortablePictureMode";
import React, { useState } from "react";

type SelectedProperty = {
     propertyId?: number;
    picturePGColor?: string;
    picturePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

export const PictureTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("selectedProperty in PictureTabs", selectedProperty)
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

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
          setFileList(info.fileList);
          console.log(info.fileList);
        },
        fileList: fileList,
      };

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
                    <Button icon={<UploadOutlined />}>Upload png or jpg only</Button>
                </Upload>
            </Form.Item>
            <Divider />
            <Tabs items={items} />
        </Form>
    )
}