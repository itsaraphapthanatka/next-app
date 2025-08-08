"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getProperties } from '@/app/server_actions/property';
import { ModalProject } from './ModalProject';

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];


interface ProjectApiItem {
  id?: number;
  no: number;
  projectName: string,
  project: string,
  totalRoom: number,
  projectId: number,
  projectThaiName: string,
  developerBrand: string,
  tower: string,
}



  const TableProject: React.FC<{ token: string }> = ({ token }) => {
  const [properties, setProperties] = useState<ProjectApiItem[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // ตั้ง default เท่ากับ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectApiItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadMode, setLoadMode] = useState<string>("default");
  const [searchParams, setSearchParams] = useState<{ projectName: string }>({ projectName: "" });
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<ProjectApiItem> = [
    {
      title: 'ID',
      dataIndex: 'no',
      fixed: 'left',
      sorter: (a, b) => a.no - b.no,
      width: 45,
      render: (_text, _record, index) => {
        const actualIndex = (page - 1) * pageSize + index + 1;
        return (
          <div>
            {actualIndex}
          </div>
        );
      }
    },
    {
      title: 'Name',
      dataIndex: 'project',
      sorter: (a, b) => a.project.localeCompare(b.project),
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
              setSelectedProject(record);
            setIsModalOpen(true);
          }}
        >
          {text}
        </div>
      ),
      width: 120,
    },
    {
      title: 'TotalRoom',
      dataIndex: 'totalRoom', 
      sorter: (a, b) => a.totalRoom - b.totalRoom,
      width: 80,
    },
    Table.EXPAND_COLUMN,
  ];

  const defaultExpandable: ExpandableConfig<ProjectApiItem> = {
    expandedRowRender: (record) => 
    <table>
      <tbody className='text-xs'>
        <tr className='border-b-2 border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Thai Name</td>
          <td className='p-1 text-right'>{record.projectThaiName}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Developer Brand</td>
          <td className='p-1 text-right'>{record.developerBrand}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Tower</td>
          <td className='p-1 text-right'>{record.tower}</td>
        </tr>
      </tbody>
    </table>,
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <UpCircleOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowKeys: expandedRowKeys,
    onExpand: (_expanded, record) => {
      handleToggleExpand(record);
    },
  };

  const handleToggleExpand = (record: ProjectApiItem) => {
    const key = rowKeyFunc(record);
    setExpandedRowKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      

      if (loadMode === "search" && searchParams) {
        data = await getProperties  ( 
          { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
          token,
          searchParams.projectName,
          ""
          );
      } else {
        data = await getProperties( 
          { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
          token,
          "",
          ""
          );
      }

      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];

      console.log("items data",items);
      const mapped = items.map((item: ProjectApiItem, index: number) => ({
        id: item.id ?? 0,
        // key: item.propertyId ?? index,
        no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
        projectName: item.projectName ?? "-",
        project: item.project ?? "-",
        totalRoom: item.totalRoom ?? 0,
        projectId: item.id ?? 0,
        projectThaiName: item.projectThaiName ?? "-",
        developerBrand: item.developerBrand ?? "-",
        tower: item.tower ?? "-",
      }));

      setProperties(mapped);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, loadMode, searchParams, token]);

  // 🎯 Search Event
  useEffect(() => {
    const handleTableSearch = (e: CustomEvent) => {
      setPage(1); // Reset to first page
      setSearchParams({ projectName: e.detail.projectName ?? "" });
      setLoadMode("search");
    };
    window.addEventListener("assignTableSearch", handleTableSearch as EventListener);
    return () => window.removeEventListener("assignTableSearch", handleTableSearch as EventListener);
  }, []);

   // 🎯 Filter Event
  useEffect(() => {
    const handleTableReload = (e: CustomEvent) => {
      console.log("handleTableReloadFilter", e.detail);
      setPage(1); // Reset to first page
      setLoadMode("filter");
    };
    window.addEventListener("assignTableReload", handleTableReload as EventListener);
    return () => window.removeEventListener("assignTableReload", handleTableReload as EventListener);
  }, []); 

  const emptyDataType: ProjectApiItem = {
    id: 0,
    // key: 0,  
    no: 0,
    projectName: "",
    project: "",
    totalRoom: 0,
    projectId: 0,
    projectThaiName: "",
    developerBrand: "",
    tower: "",
  };

  const rowKeyFunc = (record: ProjectApiItem) => {
    if (record.projectId && record.projectId) {
        return `${record.projectId}-${record.projectId}`;
    }
    if (record.id && record.id !== 0) {
        return `id-${record.id}`;
    }
    // ใช้การรวม propertyId กับ no เพื่อสร้าง unique key
    return `fallback-${record.projectId || 0}-${record.no}`;
};
  return (
    <div className="mt-4">
      <Table<ProjectApiItem>
        rowKey={rowKeyFunc}
        tableLayout="auto"
        expandable={defaultExpandable}
        loading={loading}
        size="small"
        columns={columns}
        scroll={{ x: 400, y: 500 }}
        dataSource={properties}
        pagination={{
          position: ['bottomCenter'],
          showTotal: (total) => `Total ${total} items`,
          size: "small",
          showSizeChanger: true,
          pageSize: pageSize,
          total: totalRecords,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
    />
      <ModalProject
        selectedProject={selectedProject ?? emptyDataType}
        text={selectedProject?.projectName ?? ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        token={token}
      />
    </div>
  );
};

export default TableProject;