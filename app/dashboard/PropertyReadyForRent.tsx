"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { getDashboardDataPropertyReadyForRent } from "@/app/server_actions/dashboard";

interface Project {
  id: number;
  name: string;
  propertyCount: number;
}

export const PropertyReadyForRent = ({ token }: { token: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await getDashboardDataPropertyReadyForRent(token);

      // ✅ แปลง object { name: count } → array ของ object
      const formatted: Project[] = Object.entries(res).map(([name, count], index) => ({
        id: index + 1,
        name,
        propertyCount: count as number,
      }));

      setProjects(formatted);
      setLoading(false);
    };

    fetchProjects();
  }, [token]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Properties",
      dataIndex: "propertyCount",
      key: "propertyCount",
    },
  ];

  return (
    <div>
      <h2>Property Ready for Rent</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};
