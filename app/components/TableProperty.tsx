"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getProperties } from '@/app/networks/property';

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

const columns: ColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'no',
    sorter: (a, b) => a.no - b.no,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    sorter: (a, b) => a.project.localeCompare(b.project),
  },
  {
    title: 'Size',
    dataIndex: 'size',
    sorter: (a, b) => a.size - b.size,
  },
  {
    title: 'Bed',
    dataIndex: 'bed',
    sorter: (a, b) => a.bed - b.bed,
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
  },
  Table.EXPAND_COLUMN,
];

const data = Array.from({ length: 50 }).map<DataType>((_, i) => ({
  key: i,
  no: i,
  project: `Project ${i}`,
  size: Number(`${i}2`),
  bed: Number(`${i}2`),
  bath: Number(`${i}2`),
  rental: Number(`${i}2`),
  selling: Number(`${i}2`),
  status: `Status ${i}`,
}));

const defaultExpandable: ExpandableConfig<DataType> = {
  expandedRowRender: (record) => <p>{record.status}</p>,
  expandIcon: ({ expanded, onExpand, record }) =>
    expanded ? (
      <UpCircleOutlined onClick={(e) => onExpand(record, e)} />
    ) : (
      <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
    ),
};

const MAX_SELECTION = 20;
const selectedCount = new Map<React.Key, number>();

const TableProperty: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
    });
  }, []);
  return (
    <div className="mt-4">
      <Table<DataType>
        tableLayout="auto"
        expandable={defaultExpandable}
        size="small"
        columns={columns} // ลบ EXPAND_COLUMN
        dataSource={properties}
        className="text-sm"
        pagination={{ position: ['bottomCenter'] }}
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

    </div>
  );
};

export default TableProperty;