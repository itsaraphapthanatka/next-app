"use client";
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { GetProp, RadioChangeEvent, TableProps } from 'antd';
import { Form, Radio, Space, Switch, Table } from 'antd';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',

  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
  Table.EXPAND_COLUMN,
];

const data = Array.from({ length: 10 }).map<DataType>((_, i) => ({
  key: i,
  name: 'John Brown',
  age: Number(`${i}2`),
  address: `New York No. ${i} Lake Park`,
  description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));

const defaultExpandable: ExpandableConfig<DataType> = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
};

const TableProperty: React.FC = () => {
  
  return (
    <div className="mt-4">
      <Table<DataType>
        expandable={ defaultExpandable }
        size="small"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000 }}
        pagination={{ position: ['bottomCenter'] }}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(`Number of selected rows: ${selectedRows.length}`);
          // Update the Request Property button count in PropertySearchForm if possible
          // This assumes you have a way to communicate between TableProperty and PropertySearchForm,
          // such as a context or a callback prop. If not, you may need to lift state up.
          // For now, we'll dispatch a custom event as a simple solution:

          // Dispatch a custom event with the count of selected rows
          const event = new CustomEvent('propertySelectionCount', { detail: selectedRows.length });
          window.dispatchEvent(event);
          },
        }}
      />
    </div>
  );
};

export default TableProperty;