import { Button, Table } from "antd";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTowersById } from "@/app/server_actions/project";
import { formatNumberParserToNumber } from "@/app/utils/formatNumber";

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
  name?: string;
  totalRoom?: number;
  totalClass?: string;
};

 export const TowerTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  console.log("selectedProject", selectedProject);
  const [tower, setTower] = useState<Tower[]>([]);

  useEffect(() => {
    getTowersById(selectedProject.id as number, token).then((response) => {
      console.log("response", response);
      setTower(response);
    });
  }, [selectedProject.id, token]);

  const columns = [

    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Room",
        dataIndex: "totalRoom",  
        key: "totalRoom",
        render: (value: number) => {
            return value == null ? "" : formatNumberParserToNumber(value) === "0" ? "" : formatNumberParserToNumber(value);
        },
    },
    
    {
        title: "Class",
        dataIndex: "totalClass",
        key: "totalClass",
    },
    {
        title: "Action",
        key: "action",
        render: (text: string, record: Tower) => (
            <Button type="link" onClick={() => handleEdit(record)}><Edit2 size={10} /></Button>
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
            dataSource={tower} 
            pagination={false}
            rowKey="id"
            size="middle"
            bordered
            scroll={{ x: 300 }}
        />
    </div>
  );
};