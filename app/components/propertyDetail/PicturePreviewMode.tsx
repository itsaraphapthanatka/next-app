import { Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { Download } from "lucide-react";

type PicturePreviewModeData = {
    key: string;
    filename: string;
    preview: string;
};

export const PicturePreviewMode = () => {
    const columns: ColumnsType<PicturePreviewModeData> = [
        {
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
        },
        {
            title: 'Preview',
            dataIndex: 'preview',
            key: 'preview',
            render: (text: string, record: PicturePreviewModeData) => (
                console.log("Preview: ", text),
                <Image src={record.filename} width={100} height={100} alt="" />
            ),
        },
        {
            title: 'Download',
            dataIndex: 'download',
            key: 'download',
            align: 'center',
            render: (text: string, record: PicturePreviewModeData) => (
                console.log("Download: ", text),
                <a href={record.filename} download={record.filename}>
                    <Download className="w-4 h-4 text-warning" />
                </a>
            ),
        }
    ];

    const data: PicturePreviewModeData[] = [
        {
            key: '1',
            filename: 'picture1.jpg',
            preview: 'picture1.jpg',
        },
        {
            key: '2',
            filename: 'picture2.jpg',
            preview: 'picture2.jpg',
        },
        {
            key: '3',
            filename: 'picture3.jpg',
            preview: 'picture3.jpg',
        }
    ];

    return (
        <Image.PreviewGroup
            preview={{
                onChange: (current, prev) =>
                    console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            <Table columns={columns} dataSource={data} pagination={false} rowKey="key" />
        </Image.PreviewGroup>
    );
}
