"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { ModalProject } from "../project/ModalProject";

interface Project {
  id: number;
  name: string;
  propertyCount: number;
}

type SelectedProject = {
  id?: number;
};

export const ProjectLessThenPicture = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
          token={''}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
    </div>
  );
}
