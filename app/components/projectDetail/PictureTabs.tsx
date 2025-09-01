import { Form, Divider, Upload, message, Tabs } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/es/upload";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile } from "antd/es/upload";
import type { TabsProps } from 'antd';
import { PicturePreviewMode } from "../projectDetail/PicturePreviewMode";
import { SortablePictureMode } from "../projectDetail/SortablePictureMode";
import React, { useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";

type SelectedProject = {
    id?: number;
    propertyId?: number;
  };

  interface UploadPicture {
    uid: string;
    name: string;
    status: UploadFileStatus;
    url: string;
  }

export const PictureTabs = ({ selectedProject, token }: { selectedProject: SelectedProject, token: string }) => {
    console.log("selectedProperty in PictureTabs", selectedProject)
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadPicture[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // const props: UploadProps = {
    //     beforeUpload: (file: RcFile) => {
    //       const isPNG = file.type === 'image/png';
    //       const isJPG = file.type === 'image/jpeg';
    //       if (!isPNG && !isJPG) {
    //         message.error(`${file.name} is not a png or jpg file`);
    //       }
    //       return isPNG || isJPG || Upload.LIST_IGNORE;
    //     },
    //     onChange: (info: UploadChangeParam) => {
    //       setFileList(info.fileList as UploadPicture[]);
    //       console.log(info.fileList);
    //     },
    //     fileList: fileList,
    // };

    const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Preview Mode',
        children: (
          <PicturePreviewMode
            key={refreshKey} 
            selectedProject={selectedProject} 
            token={token}/>
        )
    },
    {
        key: '2',
        label: 'Sortable Mode',
        children: (
          <SortablePictureMode 
            key={refreshKey} 
            selectedProject={selectedProject} 
            token={token} 
            onSorted={() => {
              setRefreshKey((prev) => prev + 1);
              }}
          />
        )
    },
    ];
      
    return (
      <Form form={form} layout="vertical" name="tabsPictureDetail">
        {/* <Form.Item
          name="uploadPicture"
          className="text-[12px]"
          style={{ marginBottom: "10px" }}
        >
          <Upload
            fileList={fileList}
            maxCount={10}
            multiple={true}
            beforeUpload={props.beforeUpload}
            onChange={props.onChange}
          >
            <Button icon={<UploadOutlined />}>Upload PNG or JPG only</Button>
          </Upload>
        </Form.Item> */}
        <Divider />
        <Tabs items={items} />
      </Form>
    );
}