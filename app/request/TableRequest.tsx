"use client";

import React, { useEffect, useState } from "react";
import { Table, TableProps } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { ModalProperty } from "../components/ModalProperty";
import { getRequestReports } from "@/app/server_actions/request-reports";
import { formatNumberShort } from '@/app/utils/formatNumber';

interface RequestApiItem {
    id: number;
    key: number;
    no: number;
    enqRequest: string;
    project: string;
    projectName: string;
    invId: string;  
    tower: string;
    floor: string;
    size: number;
    bedRoom: number;
    bathRoom: number;   
    rentalPrice: number;
    salePrice: number;
    status: string;
    lastedUpdate: string;
    requestStatus   : string;
    availableOn: string;
    RentalPG?: string;
    vipStatusColor?: string;
    salePG?: number;
    rentPGColor?: string;
    salePGColor?: string;
    rentPGText?: string;
    salePGText?: string;
    vipStatus?: string;
    requestDate?: string;
    actionDate?: string;
    propertyId?: number;   
    saleRequestId?: number;
    saleRequestItemId?: number;
    toSalePropertyId?: number;
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
    // console.log("TableRequest token",token);
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
            dataIndex: 'projectName',
            sorter: (a, b) => a.projectName.localeCompare(b.projectName),
            render: (text, record) => (
                <div
                    style={{ cursor: 'pointer', color: '#1677ff' }}
                    onClick={() => {
                        setSelectedRequest(record);
                        console.log("record", selectedRequest);
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
            dataIndex: 'bedRoom',
            sorter: (a, b) => a.bedRoom - b.bedRoom ,
            width: 70,
        },
        {
            title: 'Bath',
            dataIndex: 'bathRoom',
            sorter: (a, b) => a.bathRoom - b.bathRoom,
            width: 70,
        },
        {
            title: 'Rental',
            dataIndex: 'rentalPrice',
            sorter: (a, b) => a.rentalPrice - b.rentalPrice,
            width: 70,
            render: (text) => (
                <div className='text-center'>
                    {formatNumberShort(text)}
                </div>
            ),
        },
        {
            title: 'Selling',
            dataIndex: 'salePrice',
            sorter: (a, b) => a.salePrice - b.salePrice,
            width: 70,
            render: (text) => (
                <div className='text-center'>
                    {formatNumberShort(text)}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            width: 100,
        },
        {
            title: 'Approve',
            dataIndex: 'requestStatus',
            sorter: (a, b) => a.requestStatus.localeCompare(b.requestStatus),
            width: 100,
            render: (text) => (
                <div className="flex justify-end text-green-500">
                    {text}
                </div>
            ),
        },
        Table.EXPAND_COLUMN,
    ];

    useEffect(() => {
        setLoading(true);
        getRequestReports(
          { token, saleRequestStatus: 1 },
        ).then((data: GetPropertiesResponse) => {
          const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
          // console.log("Data", data);    
          const mapped: RequestApiItem[] = items.map((item, index) => ({
            id: item.id ?? 0,
            key: item.propertyId ?? index,
            no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
            project: item.projectName ?? "-",
            projectName: item.projectName ?? "-",
            size: item.size ?? 0,
            bedRoom: item.bedRoom ?? 0,
            bathRoom: item.bathRoom ?? 0,
            rentalPrice: item.rentalPrice ?? 0,
            salePrice: item.salePrice ?? 0,
            status: item.status ?? "-",
            invId: item.invId ?? "-",
            tower: item.tower ?? "-",
            floor: item.floor ?? "-",
            RentalPG: item.RentalPG ?? "-",
            vipStatusColor: item.vipStatusColor ?? "-",
            salePG: item.salePG ?? 0,
            rentPGColor: item.rentPGColor ?? "-",
            salePGColor: item.salePGColor ?? "-",
            rentPGText: item.rentPGText ?? "-",
            salePGText: item.salePGText ?? "-",
            availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
            lastedUpdate: item.lastedUpdate ? new Date(item.lastedUpdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
            vipStatus: item.vipStatus ?? "-",
            vipStatusID: item.vipStatus ?? 0,
            enqRequest: item.enqRequest ?? "-",
            requestStatus: item.requestStatus ?? "-",
            requestDate: item.requestDate ?? "-",
            actionDate: item.actionDate ?? "-",
            propertyId: item.propertyId ?? 0,
            saleRequestId: item.saleRequestId ?? 0,
            saleRequestItemId: item.saleRequestItemId ?? 0,
            toSalePropertyId: item.saleRequestItemId ?? 0,
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
          getRequestReports(
            { token, saleRequestStatus: e.detail.status },
          ).then((data: GetPropertiesResponse) => {
            const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
            // console.log("Data", data);
            const mapped: RequestApiItem[] = items.map((item, index) => {
                return {
                id: item.id ?? 0,
                key: item.propertyId ?? index,
                no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
                project: item.projectName ?? "-",
                projectName: item.projectName ?? "-",
                size: item.size ?? 0,
                bedRoom: item.bedRoom ?? 0,
                bathRoom: item.bathRoom ?? 0,
                rentalPrice: item.rentalPrice ?? 0,
                salePrice: item.salePrice ?? 0,
                status: item.status ?? "-",
                invId: item.invId ?? "-",
                tower: item.tower ?? "-",
                floor: item.floor ?? "-",
                RentalPG: item.RentalPG ?? "-",
                vipStatusColor: item.vipStatusColor ?? "-",
                salePG: item.salePG ?? 0,
                rentPGColor: item.rentPGColor ?? "-",
                salePGColor: item.salePGColor ?? "-",
                rentPGText: item.rentPGText ?? "-",
                salePGText: item.salePGText ?? "-",
                availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
                lastedUpdate: item.lastedUpdate ? new Date(item.lastedUpdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
                vipStatus: item.vipStatus ?? "-",
                vipStatusID: item.vipStatus ?? 0,
                enqRequest: item.enqRequest ?? "-",
                requestStatus: item.requestStatus ?? "-",
                requestDate: item.requestDate ?? "-",
                actionDate: item.actionDate ?? "-",
                propertyId: item.propertyId ?? 0,
                saleRequestId: item.saleRequestId ?? 0,
                toSalePropertyId: item.saleRequestItemId ?? 0,
            }});    
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

    const emptyDataType: RequestApiItem = {
        id: 0,
        key: 0,
        no: 0,
        enqRequest: "",
        project: "",
        projectName: '',
        invId: "",
        tower: "A",
        floor: "1",
        size: 0,
        bedRoom: 0,
        bathRoom: 0,
        rentalPrice: 0,
        salePrice: 0,
        lastedUpdate: "",
        status: '',
        requestStatus: '',
        availableOn: "",
        RentalPG: "",
        vipStatusColor: "",
        salePG: 0,
        rentPGColor: "",
        salePGColor: "",
        rentPGText: "",
        salePGText: "",
        vipStatus: "",
        requestDate: "",
        actionDate: "",
        propertyId: 0,
        saleRequestId: 0,
        saleRequestItemId: 0,
        toSalePropertyId: 0,
    };

    const defaultExpandable: ExpandableConfig<RequestApiItem> = {
        expandedRowRender: (record) => (
            <table>
                <tbody className='text-xs'>
                <tr className="border-b border-dashed border-gray-200 border-b-2">
                    <td colSpan={2} className="p-1 underline">ENQ. No</td>
                    <td colSpan={2} className="p-1 text-right">{record.enqRequest} {record.requestDate ? new Date(record.requestDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-"}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200 border-dashed'>
                    <td className='p-1 underline'>INVID</td>
                    <td className='p-1 text-right'>{record.invId}</td>
                    <td className='pl-4 underline'>TW.</td>
                    <td className='p-1 text-right'>{record.tower}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200 border-dashed p-1'>
                    <td className='p-1 underline'>FL.</td>
                    <td className='p-1 text-right'>{record.floor}</td>
                    <td className='pl-4 underline'>Action Update</td>
                    <td className='p-1 text-right'>{record.actionDate ? new Date(record.actionDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-"}</td>
                </tr>
                <tr className='border-b border-dashed border-gray-200 border-dashed p-1'>
                    <td className='p-1 underline'>Status</td>
                    <td className='p-1 text-right'>{record.status}</td>
                    <td className='pl-4 underline'>Available On</td>
                    <td className='p-1 text-right'>{record.availableOn}</td>
                </tr>
                </tbody>
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
            selectedProperty={selectedRequest ?? emptyDataType}
            modalType={modalType}
            text={selectedRequest?.propertyId ? selectedRequest.propertyId.toString() : ""}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            token={token}
        />
        </div>
    );
};
