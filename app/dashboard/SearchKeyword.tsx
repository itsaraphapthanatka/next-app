"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { getDashboardDataSearchKeyword } from "../server_actions/dashboard";

interface Project {
  id: number;
  name: string;
  propertyCount: number;
}

export const SearchKeyword = ({ token }: { token: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await getDashboardDataSearchKeyword(token);
      const formatted: Project[] = Object.entries(res).map(([name, count], index) => ({
        id: index + 1,
        name,
        propertyCount: count as number,
      }));
      setProjects(formatted);
      setLoading(false);
    };
  
    fetchProjects();
  }, []);
  

  const columns = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      render: (_text: string, _record: Project, index: number) => {
        return (
          <div>
            {index + 1}
          </div>
        );
      },
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
      render: (text: string) => {
        return (
          <div>
            {text ?? 0}
          </div>
        );
      },
    },
  ];


  return (
    <div>
      <h2>Search Keyword</h2>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={projects} pagination={false} loading={loading}/>
    </div>
  );
}
