"use client";

import React, { useEffect, useState } from "react";
import { Table, TableProps } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

interface RequestApiItem {
    key?: string;
    no?: number;
    enqno: string;
    project: string;
    invid: string;
    tw: string;
    floor: string;
    size: number;
    bed: number;
    bath: number;
    rental: number;
    selling: number;
    status: string;
    lastUpdate: string;
    approve: string;
    availableOn: string;
}

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

export const TableRequest = () => {
    // const [requests, setRequests] = useState<RequestApiItem[]>([]);
    // const [loading, setLoading] = useState(false);
    const [page] = useState(1);
    const [pageSize] = useState(10);
    const [total] = useState(0);
    // const [searchParams, setSearchParams] = useState({});
    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        console.log("TableRequest");
    }, []);

    const columns: ColumnsType<RequestApiItem> = [
        {
            key: 'no',
            title: 'No.',
            dataIndex: 'no',
            sorter: (a, b) => (a.no ?? 0) - (b.no ?? 0),
            width: 50,
        },
        {
            key: 'project',
            title: 'Project',
            dataIndex: 'project',
            sorter: (a, b) => a.project.localeCompare(b.project),
            width: 70,
        },
        {
            key: 'size',
            title: 'Size',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
            width: 70,
        },
        {
            key: 'bed',
            title: 'Bed',
            dataIndex: 'bed',
            sorter: (a, b) => a.bed - b.bed,
            width: 70,
        },
        {
            key: 'bath',
            title: 'Bath',
            dataIndex: 'bath',
            sorter: (a, b) => a.bath - b.bath,
            width: 70,
        },
        {
            key: 'rental',
            title: 'Rental',
            dataIndex: 'rental',
            sorter: (a, b) => a.rental - b.rental,
            width: 70,
        },
        {
            key: 'selling',
            title: 'Selling',
            dataIndex: 'selling',
            sorter: (a, b) => a.selling - b.selling,
            width: 70,
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            width: 150,
        },
        {
            key: 'approve',
            title: 'Approve',
            dataIndex: 'approve',
            width: 150,
        },
        Table.EXPAND_COLUMN,
    ];

    const dataSource = [
        {
          no: 1,
          enqno: "test 16/07/2025 14:53",
          project: 'Nue Connex Don Mueang',
          invid: "C240911004",
          tw: "A",
          floor: "1",
          size: 32,
          bed: 32,
          bath: 32,
          rental: 32,
          selling: 32,
          lastUpdate: "16/07/2025 14:53",
          status: 'Unavailble',
          approve: 'Approve',
          availableOn: "16/07/2025 14:53",
        },
        {
          no: 2,
          enqno: "test 16/07/2025 14:53",
          project: 'Nue Connex Don Mueang',
          invid: "C240911005",
          tw: "A",
          floor: "1",
          size: 32,
          bed: 32,
          bath: 32,
          rental: 32,
          selling: 32,
          lastUpdate: "16/07/2025 14:53",
          status: 'Unavailble',
          approve: 'Approve',
          availableOn: "16/07/2025 14:53",
        },
        {
            no: 3,
            enqno: "test 16/07/2025 14:53",
            project: 'Nue Connex Don Mueang',
            invid: "C240911006",
            tw: "A",
            floor: "1",
            size: 32,
            bed: 32,
            bath: 32,
            rental: 32,
            selling: 32,
            lastUpdate: "16/07/2025 14:53",
            status: 'Unavailble',
            approve: 'Approve',
            availableOn: "16/07/2025 14:53",
        }
      ];

    const defaultExpandable: ExpandableConfig<RequestApiItem> = {
        expandedRowRender: (record) => (
            // <p style={{ margin: 0 }}>{record.project}</p>
            <table>
                <tr className="border-b border-dashed border-gray-200">
                    <td colSpan={2} className="p-2">ENQNO</td>
                    <td colSpan={2} className="p-2 text-right">{record.enqno}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200'>
                    <td className='p-2'>INVID</td>
                    <td className='p-2'>{record.invid}</td>
                    <td className='p-2'>TW.</td>
                    <td className='p-2'>{record.tw}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200 p-2'>
                    <td className='p-2'>FL.</td>
                    <td className='p-2'>{record.floor}</td>
                    <td className='p-2'>Action Update</td>
                    <td className='p-2 text-[10px]'>{record.lastUpdate}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200 p-2'>
                    <td className='p-2'>Status</td>
                    <td className='p-2'>{record.status}</td>
                    <td className='p-2'>Available On</td>
                    <td className='p-2 text-[10px]'>{record.availableOn}</td>
                </tr>
            </table>
        ),
        rowExpandable: (record) => (record.no ?? 0)  % 2 === 0,
        fixed: 'right',
        expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <UpCircleOutlined onClick={(e) => onExpand(record, e)} />
            ) : (
              <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
            ),
    };

    return (
        <div className="mt-4">
        <Table<RequestApiItem>
            tableLayout="auto"
            expandable={defaultExpandable}
            size="small"
            dataSource={dataSource}
            // loading={loading}
            columns={columns}
            scroll={{ x: 1000, y: 500 }}
            pagination={{
                position: ['bottomCenter'],
                showTotal: (total) => `Total ${total} items`,
                size: "small",
                showSizeChanger: true,
                pageSize: pageSize,
                current: page,
                total: total,
            }}
        />
        </div>
    );
};
