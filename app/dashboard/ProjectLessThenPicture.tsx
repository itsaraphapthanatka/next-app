"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { ModalProject } from "../project/ModalProject";
import { getDashboardDataProjectLessThenPicture } from "../server_actions/dashboard";

interface Project {
  id: number;
  name: string;
  propertyCount: number;
}

type SelectedProject = {
  id?: number;
};

export const ProjectLessThenPicture = ({ token }: { token: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await getDashboardDataProjectLessThenPicture(token);
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
      render: (text: string, record: Project) => (
        <div
          style={{ cursor: 'pointer', color: 'orange' }}
          onClick={() => {
              setSelectedProject(record);
            setIsModalOpen(true);
          }}
        >
          {text}
        </div>
      ),
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
      <h2>Project Less Then Picture</h2>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={projects} pagination={false} loading={loading}/>

        <ModalProject
          selectedProject={selectedProject as SelectedProject}
          text={selectedProject?.name ?? ""}
          token={token}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
    </div>
  );
}
