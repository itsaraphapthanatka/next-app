"use client";

import React, { useEffect, useState } from "react";
import { Table, TableProps } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { ModalProperty } from "../components/ModalProperty";
import { getProperties } from "@/app/server_actions/property";

interface RequestApiItem {
    id: number;
    key: number;
    no: number;
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
    RentalPG?: string;
    vipStatusColor?: string;
    salePG?: number;
    rentPGColor?: string;
    salePGColor?: string;
    rentPGText?: string;
    salePGText?: string;
    vipStatus?: string;
}

interface GetPropertiesResponse {
    resultLists?: RequestApiItem[];
    allRecord?: number;
    currentPage?: number;
    recordPerPage?: number;
  }

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

export const TableRequest = ({token}: {token: string}) => {
    console.log("TableRequest token",token);
    const [selectedRequest, setSelectedRequest] = useState<RequestApiItem | null>(null);
    const [modalType, setModalType] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [properties, setProperties] = useState<RequestApiItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);

    const columns: ColumnsType<RequestApiItem> = [
        {
            title: 'No.',
            dataIndex: 'no',
            sorter: (a, b) => (a.no) - (b.no),
            width: 50,
        },
        {
            title: 'Project',
            dataIndex: 'project',
            sorter: (a, b) => a.project.localeCompare(b.project),
            render: (text, record) => (
                <div
                    style={{ cursor: 'pointer', color: '#1677ff' }}
                    onClick={() => {
                        setSelectedRequest(record);
                        setModalType("request");
                        setIsModalOpen(true);
                    }}
                    >
                    {text}
                </div>
            ),
            width: 70,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
            width: 70,
        },
        {
            title: 'Bed',
            dataIndex: 'bed',
            sorter: (a, b) => a.bed - b.bed,
            width: 70,
        },
        {
            title: 'Bath',
            dataIndex: 'bath',
            sorter: (a, b) => a.bath - b.bath,
            width: 70,
        },
        {
            title: 'Rental',
            dataIndex: 'rental',
            sorter: (a, b) => a.rental - b.rental,
            width: 70,
        },
        {
            title: 'Selling',
            dataIndex: 'selling',
            sorter: (a, b) => a.selling - b.selling,
            width: 70,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            width: 150,
        },
        {
            title: 'Approve',
            dataIndex: 'approve',
            width: 150,
        },
        Table.EXPAND_COLUMN,
    ];

    useEffect(() => {
        setLoading(true);
        getProperties(
          { page: { current: page, size: pageSize }, orderBy: 'asc' },
          token
        ).then((data: GetPropertiesResponse) => {
          const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
      
          const mapped: RequestApiItem[] = items.map((item, index) => ({
            id: item.id ?? 0,
            key: item.id ?? index,
            no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
            project: item.project ?? "-",
            size: item.size ?? 0,
            bed: item.bed ?? 0,
            bath: item.bath ?? 0,
            rental: item.rental ?? 0,
            selling: item.selling ?? 0,
            status: item.status ?? "-",
            invid: item.invid ?? "-",
            tw: item.tw ?? "-",
            floor: item.floor ?? "-",
            RentalPG: item.RentalPG ?? "-",
            vipStatusColor: item.vipStatusColor ?? "-",
            salePG: item.salePG ?? 0,
            rentPGColor: item.rentPGColor ?? "-",
            salePGColor: item.salePGColor ?? "-",
            rentPGText: item.rentPGText ?? "-",
            salePGText: item.salePGText ?? "-",
            availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
            lastUpdate: item.lastUpdate ? new Date(item.lastUpdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
            vipStatus: item.vipStatus ?? "-",
            enqno: item.enqno ?? "-",
            approve: item.approve ?? "-",
          }));
      
          setTotalRecords(data.allRecord ?? 0);
          setProperties(mapped);
          setPage(data.currentPage ?? 1);
          setPageSize(data.recordPerPage ?? 10);
          setLoading(false);
        });
    }, [page, pageSize, token]);

    useEffect(() => {
        const handleTableReload = (e: CustomEvent) => {
          console.log("Table reload", e.detail);
          console.log("e.detail.status",e.detail.status)

          setLoading(true);
          getProperties(
            { page: { current: page, size: pageSize }, orderBy: 'asc' },
            token,
            
          ).then((data: GetPropertiesResponse) => {
            const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
            console.log("Data", data);
            const mapped: RequestApiItem[] = items.filter((item) => {
                if(e.detail.status === "-1"){
                    return item;
                }
                return item.status === e.detail.status;
            }).map((item, index) => ({
                id: item.id ?? 0,
                key: item.id ?? index,
                no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
                project: item.project ?? "-",
                size: item.size ?? 0,
                bed: item.bed ?? 0,
                bath: item.bath ?? 0,
                rental: item.rental ?? 0,
                selling: item.selling ?? 0,
                status: item.status ?? "-",
                invid: item.invid ?? "-",
                tw: item.tw ?? "-",
                floor: item.floor ?? "-",
                RentalPG: item.RentalPG ?? "-",
                vipStatusColor: item.vipStatusColor ?? "-",
                salePG: item.salePG ?? 0,
                rentPGColor: item.rentPGColor ?? "-",
                salePGColor: item.salePGColor ?? "-",
                rentPGText: item.rentPGText ?? "-",
                salePGText: item.salePGText ?? "-",
                availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
                lastUpdate: item.lastUpdate ? new Date(item.lastUpdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
                vipStatus: item.vipStatus ?? "-",
                enqno: item.enqno ?? "-",
                approve: item.approve ?? "-",
            }));    
            setTotalRecords(data.allRecord ?? 0);
            setProperties(mapped);
            setPage(data.currentPage ?? 1);
            setPageSize(data.recordPerPage ?? 10);
            setLoading(false);
          });
    
          
        };
        window.addEventListener('requestTableReload', handleTableReload as EventListener);
        return () => {
          window.removeEventListener('requestTableReload', handleTableReload as EventListener);
        };
    }, [page, pageSize, token]);

    const emptyDataType: RequestApiItem[] = [{
        id: 0,
        key: 0,
        no: 0,
        enqno: "",
        project: '',
        invid: "",
        tw: "A",
        floor: "1",
        size: 0,
        bed: 0,
        bath: 0,
        rental: 0,
        selling: 0,
        lastUpdate: "",
        status: '',
        approve: '',
        availableOn: "",
        RentalPG: "",
        vipStatusColor: "",
        salePG: 0,
        rentPGColor: "",
        salePGColor: "",
        rentPGText: "",
        salePGText: "",
        vipStatus: "",
    }]

    const defaultExpandable: ExpandableConfig<RequestApiItem> = {
        expandedRowRender: (record) => (
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
            loading={loading}
            expandable={defaultExpandable}
            size="small"
            dataSource={properties}
            columns={columns}
            scroll={{ x: 1000, y: 500 }}
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

        <ModalProperty
            selectedProperty={selectedRequest ?? emptyDataType[0]}
            modalType={modalType}
            text={selectedRequest?.project ?? ""}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            token={token}
        />
        </div>
    );
};
