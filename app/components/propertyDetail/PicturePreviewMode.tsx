import { Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { Download } from "lucide-react";
import { getPropertyPictures } from "@/app/server_actions/property";
import { useEffect, useState } from "react";
import {  App as AntdApp } from "antd";
type SelectedProperty = {
    key?: number;
  };
type PicturePreviewModeData = {
    key: string;
    guId: string;
    url: string;
};

export const PicturePreviewMode = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    const { message } = AntdApp.useApp();
    const [propertyPictures, setPropertyPictures] = useState<PicturePreviewModeData[]>([]);
    useEffect(() => {
        getPropertyPictures(selectedProperty.key as number, token).then((response) => {
            setPropertyPictures(response);
        });
    }, [selectedProperty.key, token]);

    const handleDownload = async (record: PicturePreviewModeData) => {
        try {
            const fileUrl = `https://servesystem.s3.ap-southeast-1.amazonaws.com/${record.url}`;
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch file. Status: ${response.status} ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const extension = record.url.toLowerCase().endsWith('.jpg') ? 'jpg' : 'png';
            a.download = `${record.guId}.${extension}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error: unknown) {
            console.error("Error downloading file:", error);
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                message.error("ไม่สามารถดาวน์โหลดไฟล์ได้: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หรือไฟล์ไม่พบ");
            } else {
                message.error(`Error downloading file: ${error instanceof Error ? error.message : String(error)}`);
            }
            return;
        }
      };
      
    const columns: ColumnsType<PicturePreviewModeData> = [
        {
            title: 'Filename',
            dataIndex: 'guId',
            key: 'guId',
        },
        {
            title: 'Preview',
            dataIndex: 'url',
            key: 'url',
            render: (text: string, record: PicturePreviewModeData) => (
                console.log("Preview: ", text),
                <Image src={`https://servesystem.s3.ap-southeast-1.amazonaws.com/${record.url}`} width={100} height={100} alt="" />
            ),
        },
        {
            title: 'Download',
            dataIndex: 'download',
            key: 'download',
            align: 'center',
            render: (_text: string, record: PicturePreviewModeData) => (
                <Download
                  className="w-4 h-4 text-warning cursor-pointer"
                  onClick={() => handleDownload(record)}
                />
              )
        }
    ];


    return (
        <Image.PreviewGroup
            preview={{
                onChange: (current, prev) =>
                    console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            <Table columns={columns} dataSource={propertyPictures} pagination={false} rowKey="guId" />
        </Image.PreviewGroup>
    );
}
