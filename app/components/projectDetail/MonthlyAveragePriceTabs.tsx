import { Button, Table } from "antd";
import { useState } from "react";
import { Edit2 } from "lucide-react";

type ProjectDetail = {
  id?: number;
  projectId?: number;
};

type MonthlyAveragePrice = {
  Month?: string;
  systemRentalAverage?: number;
  systemSaleAverage?: number;
  userRentalAverage?: number;
  userSaleAverage?: number;
};

const columns = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    width: 100,
  },
  {
    title: "System Rental Average",
    dataIndex: "systemRentalAverage",
    key: "systemRentalAverage",
    width: 150,
  },
  {
    title: "System Sale Average",
    dataIndex: "systemSaleAverage",
    key: "systemSaleAverage",
    width: 150,
  },
  {
    title: "User Rental Average",
    dataIndex: "userRentalAverage",
    key: "userRentalAverage",
    width: 150,
  },
  {
    title: "User Sale Average",
    dataIndex: "userSaleAverage",
    key: "userSaleAverage",
    width: 150,
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: MonthlyAveragePrice) => (
      <Button type="link" onClick={() => handleEdit(record)}><Edit2 /></Button>
    ),
    width: 100,
  },
];

const handleEdit = (record: MonthlyAveragePrice) => {
  console.log(record);
};

export const MonthlyAveragePriceTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => { 
  console.log("selectedProject", selectedProject);
  console.log("token", token);
  // const [formMassTransit] = Form.useForm();
  const [empty] = useState<MonthlyAveragePrice[]>([]);
  const [monthlyAveragePrice] = useState<MonthlyAveragePrice[]>([]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={empty ? [] : monthlyAveragePrice}
        pagination={false}
        rowKey="id"
        size="middle"
        bordered
        scroll={{ x: 700 }}
      />
    </div>
  );
};
