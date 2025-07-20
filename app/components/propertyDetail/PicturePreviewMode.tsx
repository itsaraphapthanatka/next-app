import { Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { Download } from "lucide-react";

type PicturePreviewModeProps = {
    filename: string;
    preview: string;
}

type PicturePreviewModeData = {
    filename: string;
    preview: string;
}




export const PicturePreviewMode = () => {
    const columns: ColumnsType<PicturePreviewModeData> = [
        {
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
        },{
            title: 'Preview',
            dataIndex: 'preview',
            key: 'preview',
            render: ( record: PicturePreviewModeProps) => (
                <Image src={record.filename} width={100} height={100}/>
            ),
        },  
        {
            dataIndex: 'download',
            key: 'download',
            align: 'center',
            render: ( record: PicturePreviewModeProps) => (
                    <a href={record.preview} download={record.filename}>
                        <Download className="w-4 h-4 text-warning" />
                    </a>
            ),  
        }
    ];

    const data: PicturePreviewModeData[] = [
        {
            filename: 'picture1.jpg',
            preview: 'picture1.jpg',

        },
        {
            filename: 'picture2.jpg',
            preview: 'picture2.jpg',
        },
        {
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
            <Table columns={columns} dataSource={data} pagination={false} />
        </Image.PreviewGroup>
    )
}

