import { Table, InputNumber  } from "antd";
import { useEffect, useState } from "react";
import { getAverageMonthlyByProjectId } from "@/app/server_actions/project";
import type { ColumnsType } from "antd/es/table";
import { formatMonthYear } from "@/app/utils/date";
import { formatNumberParserToNumber } from "@/app/utils/formatNumber";

type ProjectDetail = { id?: number };

type MonthlyAveragePrice = {
  id?: number;
  projectId?: number;
  month?: string | number;
  year?: string | number;
  systemRentalAverage?: number | null;
  systemSaleAverage?: number | null;
  customRentalAverage?: number | null;
  customSaleAverage?: number | null;
  systemUpdateDate?: string;
  customUpdateDate?: string;
  customUpdateName?: string;
  monthYearLabel?: string;
  monthYearSortKey?: number;
};

type MonthlyAveragePriceWithMonthYearLabel = MonthlyAveragePrice & {
  monthYearLabel?: string;
  monthYearSortKey?: number;
};

// function handleEdit(record: MonthlyAveragePrice) {
//   console.log(record);
// }

const columns: ColumnsType<MonthlyAveragePriceWithMonthYearLabel> = [
  {
    title: "Month",
    dataIndex: "monthYearLabel",
    key: "monthYearLabel",
    width: 120,
    sorter: (a, b) =>
      (a.monthYearSortKey ?? 0) - (b.monthYearSortKey ?? 0),
  },
  {
    title: "System Rental Average",
    dataIndex: "systemRentalAverage",
    key: "systemRentalAverage",
    width: 200,
    align: "right",
    render: (value) => (value == null ? "" : formatNumberParserToNumber(value) === "0" ? "" : formatNumberParserToNumber(value)),
  },
  {
    title: "System Sale Average",
    dataIndex: "systemSaleAverage",
    key: "systemSaleAverage",
    width: 200,
    align: "right",
    render: (value) => (value == null ? "" : formatNumberParserToNumber(value) === "0" ? "" : formatNumberParserToNumber(value)),
  },
  {
    title: "User Rental Average",
    dataIndex: "customRentalAverage",
    key: "customRentalAverage",
    width: 200,
    align: "right",
    render: (value) => (
      <InputNumber defaultValue={value == null ? "" : formatNumberParserToNumber(value) === "0" ? "" : formatNumberParserToNumber(value)} readOnly/>
    ),
  },
  {
    title: "User Sale Average",
    dataIndex: "customSaleAverage",
    key: "customSaleAverage",
    width: 200,
    align: "right",
    render: (value) => (
      <InputNumber defaultValue={value == null ? "" : formatNumberParserToNumber(value) === "0" ? "" : formatNumberParserToNumber(value)} readOnly/>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: 100,
    // render: (_v, record) => (
    //   <Button type="link" onClick={() => handleEdit(record)}>
    //     <Edit2 size={10} />
    //   </Button>
    // ),
  },
];

export const MonthlyAveragePriceTabs = ({
  selectedProject,
  token,
}: {
  selectedProject: ProjectDetail;
  token: string;
}) => {
  const [monthlyAveragePrice, setMonthlyAveragePrice] = useState<MonthlyAveragePriceWithMonthYearLabel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedProject?.id || !token) return;

    let mounted = true;
    setLoading(true);

    getAverageMonthlyByProjectId(selectedProject.id as number, token)
      .then((res) => {
        if (!mounted) return;
        const rows: MonthlyAveragePriceWithMonthYearLabel[] = (res ?? []).map((r: MonthlyAveragePrice) => {
          const monthNum = Number(r.month) || 0;
          const yearNum = Number(r.year) || 0;
          return {
            ...r,
            monthYearLabel: formatMonthYear(monthNum, yearNum, "en-US", "short"),
            monthYearSortKey: yearNum * 100 + monthNum,
          };
        });
        setMonthlyAveragePrice(rows);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [selectedProject?.id, token]);

  return (
    <Table
      columns={columns}
      dataSource={monthlyAveragePrice}
      loading={loading}
      pagination={false}
      rowKey={(r) => String(r.id ?? `${r.year}-${r.month}`)}
      size="middle"
      bordered
      scroll={{ x: 1000 }}
    />
  );
};
