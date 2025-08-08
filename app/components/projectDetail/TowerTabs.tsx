import { Button, Table } from "antd";
import { Edit2 } from "lucide-react";
import { useState } from "react";
// import { getProjectById } from "@/app/api/project";

type ProjectDetail = {
  id?: number;
  propertyId?: number;
  no?: number;
  project?: string;
  size?: number;
  bed?: number;
  bath?: number;
};

type Tower = {
  id?: number;
  no?: number;
  name?: string;
  room?: number;
  class?: string;
};

 export const TowerTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  const [tower] = useState<Tower[]>([]);
  // const [formTower] = Form.useForm();
  const [empty] = useState(true);
//   useEffect(() => {
//     if (!selectedProject.propertyId) return;
//     getProjectById(selectedProject.propertyId as number, token).then((response) => {
//       setProject(response.projectDetail);
//       form.setFieldsValue(response.projectDetail);
//     });
//   }, [selectedProject.propertyId, token]);

  const columns = [

    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Room",
        dataIndex: "room",
        key: "room",
    },
    
    {
        title: "Class",
        dataIndex: "class",
        key: "class",
    },
    {
        title: "Action",
        key: "action",
        render: (text: string, record: Tower) => (
            <Button type="link" onClick={() => handleEdit(record)}><Edit2 /></Button>
        ),
    }
  ];

  const handleEdit = (record: Tower) => {
    console.log(record);
  };

  return (
    <div>
        <Table 
            columns={columns} 
            dataSource={empty ? [] : tower} 
            pagination={false}
            rowKey="id"
            size="middle"
            bordered
            scroll={{ x: 500 }}
        />
    </div>
  );
};