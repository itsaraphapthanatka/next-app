"use client";

import { Table } from "antd";
import { getProjects } from "../server_actions/project";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  propertyCount: number;
}

export const PropertyReadyForRent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await fetch("/api/proxy/project", {
        method: "POST",
        body: JSON.stringify({ page: 1, size: 50 }),
      });
      const data = await res.json();
      setProjects(
        data.resultLists.map((project: Project) => ({
          id: project.id,
          name: project.name,
          propertyCount: project.propertyCount ?? 0,
        }))
      );
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
      <h2>Property Ready for Rent</h2>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={projects} pagination={false} loading={loading}/>
    </div>
  );
}
