"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getProperties } from '@/app/server_actions/property';
import { ModalProperty } from './ModalProperty';

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  key: number;
  no: number;
  project: string;
  size: number;
  bed: number;
  bath: number;
  rental: number;
  selling: number;
  status: string;
}

interface PropertyApiItem {
  id?: number;
  project?: string;
  size?: number;
  bedRoom?: number;
  bathRoom?: number;
  rentalPrice?: number;
  sellingPrice?: number;
  status?: string;
  allRecord?: number;
  totalPage?: number;
  currentPage?: number;
  recordPerPage?: number;
  recordStart?: number;
  recordEnd?: number;

  // Add other fields if needed
}

interface GetPropertiesResponse {
  resultLists?: PropertyApiItem[];
  allRecord?: number;
  currentPage?: number;
  recordPerPage?: number;
}

const MAX_SELECTION = 20;

const TableProperty: React.FC<{ token: string }> = ({ token }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // ตั้ง default เท่ากับ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(null);
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'no',
      sorter: (a, b) => a.no - b.no,
      width: 10,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      sorter: (a, b) => a.project.localeCompare(b.project),
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', color: '#1677ff' }}
          onClick={() => {
            setSelectedProperty(record);
            setIsModalOpen(true);
          }}
        >
          {text}
        </div>
      ),
      width: 150,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a, b) => a.size - b.size,
      width: 10,
    },
    {
      title: 'Bed',
      dataIndex: 'bed',
      sorter: (a, b) => a.bed - b.bed,
      width: 10,
    },
    {
      title: 'Bath',
      dataIndex: 'bath',
      sorter: (a, b) => a.bath - b.bath,
    },
    {
      title: 'Rental',
      dataIndex: 'rental',
      sorter: (a, b) => a.rental - b.rental,
    },
    {
      title: 'Selling',
      dataIndex: 'selling',
      sorter: (a, b) => a.selling - b.selling,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: 150,
    },
    Table.EXPAND_COLUMN,
  ];

  const defaultExpandable: ExpandableConfig<DataType> = {
    expandedRowRender: (record) => <p>{record.status}</p>,
    fixed: 'right',
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <UpCircleOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
      ),
  };

  useEffect(() => {
    getProperties(
      { page: { current: page, size: pageSize }, orderBy: 'asc' },
      token
    ).then((data: GetPropertiesResponse) => {
      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
  
      const mapped: DataType[] = items.map((item, index) => ({
        key: item.id ?? index,
        no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
        project: item.project ?? "-",
        size: item.size ?? 0,
        bed: item.bedRoom ?? 0,
        bath: item.bathRoom ?? 0,
        rental: item.rentalPrice ?? 0,
        selling: item.sellingPrice ?? 0,
        status: item.status ?? "-",
      }));
  
      setProperties(mapped);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
    });
  }, [page, pageSize, token]);
  

  return (
    <div className="mt-4">
      <Table<DataType>
        tableLayout="auto"
        expandable={defaultExpandable}
        // className="custom-table-font"
        size="small"
        columns={columns}
        scroll={{ x: 800 }}
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
        rowSelection={{
          type: 'checkbox',
          columnTitle: <span className="hidden-checkbox-header" />,
          selectedRowKeys,
          onChange: (newSelectedKeys) => {
            let limitedKeys = newSelectedKeys;

            if (newSelectedKeys.length > MAX_SELECTION) {
              limitedKeys = newSelectedKeys.slice(0, MAX_SELECTION);
            }

            setSelectedRowKeys(limitedKeys);
            const event = new CustomEvent('propertySelectionCount', { detail: limitedKeys.length });
            window.dispatchEvent(event);
          },
          getCheckboxProps: (record) => ({
            disabled: selectedRowKeys.length >= MAX_SELECTION && !selectedRowKeys.includes(record.key),
          }),
        }}
      />

      <ModalProperty
        text={selectedProperty?.project ?? ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TableProperty;