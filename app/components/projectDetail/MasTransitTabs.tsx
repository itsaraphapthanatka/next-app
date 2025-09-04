import { Table  } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getMasstransitsById } from "@/app/server_actions/project";
import { formatNumberParserToNumber } from "@/app/utils/formatNumber";

type ProjectDetail = {
  id?: number;
};

type MassTransit = {
  stationId?: number;
  railwayThainame?: string;
  railwayEnglishName?: string;
  railwayType?: string;
  distance?: number;
  error?: string;
};

const columns: ColumnsType<MassTransit> = [
  {
    title: "Station (Thai Name)",
    dataIndex: "railwayThainame",
    key: "railwayThainame",
  },
  {
    title: "Station (English Name)",
    dataIndex: "railwayEnglishName",
    key: "railwayEnglishName",
  },
  {
    title: "Station Type",
    dataIndex: "railwayType",
    key: "railwayType",
  },
  {
    title: "Distance (Meter)",
    dataIndex: "distance",
    key: "distance",
    align: "right" as const,
    render: (value) => {
      const n =
        typeof value === "number"
          ? value
          : value == null || value === ""
          ? 0
          : Number(String(value).replace(/[^0-9.-]+/g, ""));
      return formatNumberParserToNumber(n);
    },
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
  },
];
export const MassTransitTabs = ({ selectedProject, token }: { selectedProject: ProjectDetail, token: string }) => {
  // const [formMassTransit] = Form.useForm();
  console.log("selectedProject", selectedProject);
  console.log("token", token);
  // const [empty] = useState<MassTransit[]>([]);
  const [massTransit, setMassTransit] = useState<MassTransit[]>([]);

  useEffect(() => {
    getMasstransitsById(selectedProject.id as number, token).then((response) => {
      setMassTransit(response);
      console.log("massTransit in MasTransitTabs", massTransit);
    });
  }, [selectedProject.id, token]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={massTransit}
        pagination={false}
        rowKey="stationId"
        size="middle"
        bordered
        scroll={{ x: 500 }}
      />
    </div>
  );
};
