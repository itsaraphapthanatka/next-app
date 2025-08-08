import { Table } from "antd";
import { useState } from "react";

type ProjectDetail = {
  id?: number;
  projectId?: number;
};

type MassTransit = {
  stationThaiName?: string;
  stationEnglishName?: string;
  stationType?: string;
  distanceMeter?: number;
  error?: string;
};

const columns = [
  {
    title: "Station (Thai Name)",
    dataIndex: "stationThaiName",
    key: "stationThaiName",
  },
  {
    title: "Station (English Name)",
    dataIndex: "stationEnglishName",
    key: "stationEnglishName",
  },
  {
    title: "Station Type",
    dataIndex: "stationType",
    key: "stationType",
  },
  {
    title: "Distance (Meter)",
    dataIndex: "distanceMeter",
    key: "distanceMeter",
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];
export const MassTransitTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  // const [formMassTransit] = Form.useForm();
  const [empty] = useState<MassTransit[]>([]);
  const [massTransit] = useState<MassTransit[]>([]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={empty ? [] : massTransit}
        pagination={false}
        rowKey="id"
        size="middle"
        bordered
        scroll={{ x: 500 }}
      />
    </div>
  );
};
