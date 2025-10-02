"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getLeads } from '@/app/server_actions/lead';
import { formatNumberShort } from '../utils/formatNumber';
import { DateTime } from 'luxon';
import { ModalLead } from './ModalLead';

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  id: number;
  no: number;
  projectName: string;
  address: string;
  unitCode: string;
  invId: string;
  floor: number;
  tower: string;
  size: number;
  bedRoom: number;
  bathRoom: number;
  rentalPrice: number;
  salePrice: number;
  lastedUpdate: DateTime;
  status: string;
  saleName: string;
  startDate: DateTime;
  toDate: DateTime;
  assignerName: string;
  displayDuration: string;
  toSalePropertyId: number;
  propertyId: number;
  revealStatus: string;
  unitTypeId: string[];
  leadNumber: string;
  leadDate: DateTime;
  budget: number;
  unitType: string;
  owner: string;
  purpose: string;
  source: string;
  clientType: string;
  project: string;
}

interface SearchParams {
  unitTypeId: string[];
  projectName: string;
  addressUnit: string;
  startDate: DateTime;
  toDate: DateTime;
  parentObjectId: number;
  pageSize: number;
  favoriteMode: boolean;
  startSize: number;
  toSize: number;
  bedRoom: number;
  bathRoom: number;
  startRentalRate: number;
  toRentalRate: number;
  startRentalRatePerSQM: number;
  toRentalRatePerSQM: number;
  startSellingRate: number;
  toSellingRate: number;
  startSellingRatePerSQM: number;
  toSellingRatePerSQM: number;
  decorationIds: string[];
  pictureStatusIds: string[];
  startFloor: number;
  toFloor: number;
  propertyStatusIds: string[];
  showOnWeb: number;
  hotDeal: number;
  havePicture: number;
  forRentOrSale: number;
  railwayStationId: number;
  startDistance: number;
  toDistance: number;
  forwardMKT: number;
  petFriendly: number;
  privateLift: number;
  duplex: number;
  penthouse: number;
  fixParking: number;
  projectTypeIds: string[];
  bootedProppit: number;
  vipStatusIds: string[];
  foreignerOwner: number;
  propertyId: number;
  projectID: number;
  assignFrom: string;
  revealStatus: string;
}

interface FilterParams {
  startDate: DateTime;
  toDate: DateTime;
  parentObjectId: number;
  pageSize: number;
  unitTypeId: string[];
  favoriteMode: boolean;
  projectName: string;
  addressUnit: string;
  startSize: number;
  toSize: number;
  bedRoom: number;
  bathRoom: number;
  startRentalRate: number;
  toRentalRate: number;
  startRentalRatePerSQM: number;
  toRentalRatePerSQM: number;
  startSellingRate: number;
  toSellingRate: number;
  startSellingRatePerSQM: number;
  toSellingRatePerSQM: number;
  decorationIds: string[];
  pictureStatusIds: string[];
  startFloor: number;
  toFloor: number;
  propertyStatusIds: string[];
  showOnWeb: number;
  hotDeal: number;
  havePicture: number;
  forRentOrSale: number;
  railwayStationId: number;
  startDistance: number;
  toDistance: number;
  forwardMKT: number;
  petFriendly: number;
  privateLift: number;
  duplex: number;
  penthouse: number;
  fixParking: number;
  projectTypeIds: string[];
  bootedProppit: number;
  vipStatusIds: string[];
  foreignerOwner: number;
  propertyId: number;
  projectID: number;
  assignFrom: string;
  revealStatus: string;
}


// const MAX_SELECTION = 20;

  const TableLead: React.FC<{ token: string }> = ({ token }) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // ตั้ง default เท่ากับ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [loadMode, setLoadMode] = useState<string>("default");
  const [searchParams, setSearchParams] = useState<SearchParams>();
  const [filterParams, setFilterParams] = useState<FilterParams>();
   


  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    { 
      title: 'No.',
      dataIndex: 'no',
      fixed: 'left',
      sorter: (a, b) => a.no - b.no,
      width: 40,
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
      title: 'Enq',
      dataIndex: 'leadNumber',
      sorter: (a, b) => a.leadNumber.localeCompare(b.leadNumber),
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedLead(record);
            setModalType("assign");
            setIsModalOpen(true);
          }}
        >
          {text}
        </div>
      ),
      width: 70,
    },
    {
      title: 'Date',
      dataIndex: 'leadDate',
      width: 70,
      ellipsis: false,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedLead(record);
            setModalType("assign");
            setIsModalOpen(true);
          }}
        >
          {record.leadDate 
            ? DateTime.fromISO(record.leadDate.toString()).setLocale("th").toFormat("dd/MM/yyyy")
            : "-"
          }
        </div>
      ),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      sorter: (a, b) => a.budget - b.budget,
      width: 70,
      ellipsis: false,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedLead(record);
            setModalType("assign");
            setIsModalOpen(true);
          }}
        >
          {formatNumberShort(text)}
        </div>
      ),
    },
   
    {
      title: 'Action',
      dataIndex: 'action',
      width: 60,
      ellipsis: false,
      render: () => (
        <div className='flex flex-row gap-2'>
          <DeleteOutlined />
        </div>
      ),
    },
    Table.EXPAND_COLUMN,
  ];

  const defaultExpandable: ExpandableConfig<DataType> = {
    expandedRowRender: (record) => 
    <table>
      <tbody className='text-xs'>
        <tr className='border-b-2 border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Sale</td>
          <td className='p-1 text-right'>{record.saleName}</td>
          <td className='pl-4 underline'>Unit Type</td>
          <td className='p-1 text-right'>{record.unitType}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Status</td>
          <td className='p-1 text-right'>{record.status}</td>
          <td className='pl-4 underline'>Client</td>
          <td className='p-1 text-right'>{record.owner}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Purpose</td>
          <td className='p-1 text-right'>{record.purpose}</td>
          <td className='pl-4 underline'>Source</td>
          <td className='p-1 text-right'>{record.source}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Client Type</td>
          <td className='p-1 text-right'>{record.clientType}</td>
          <td className='pl-4 underline'></td>
          <td className='p-1 text-right'></td>  
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Project</td>
          <td className='p-1 text-right'>{record.project}</td>
          <td className='pl-4 underline'></td>
          <td className='p-1 text-right'></td>  
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

  const handleToggleExpand = (record: DataType) => {
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
  
      const startDate = searchParams?.startDate ?? filterParams?.startDate ?? new Date();
      const toDate = searchParams?.toDate ?? new Date();
  
      let data;
  
      if (loadMode === "search" && searchParams) {
        console.log("searchParams", searchParams);
        data = await getLeads({
          token,
          search: searchParams.projectName,
          page,
          size: searchParams.pageSize ?? 10,
          startDate: startDate.toString(),
          toDate: toDate.toString(),
          parentObjectId: searchParams?.parentObjectId ?? 0,
          propertyFilter: searchParams,
          favoriteMode: searchParams?.favoriteMode ?? false,
          selectedMode: true,
        });
      } else if (loadMode === "filter" && filterParams) {
        data = await getLeads({
          token,
          page,
          size: filterParams.pageSize ?? 10,
          startDate: filterParams.startDate.toString(),
          toDate: toDate.toString(),
          parentObjectId: filterParams?.parentObjectId ?? 0,
          propertyFilter: filterParams,
          favoriteMode: filterParams?.favoriteMode ?? false,
          selectedMode: true,
        });
      } else {
        data = await getLeads({
          token,
          page,
          size: searchParams?.pageSize ?? 10,
          startDate: searchParams?.startDate.toString(),
          toDate: toDate.toString(),
          propertyFilter: {},
          favoriteMode: false,
          selectedMode: true,
        });
      }
  
      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
      setProperties(items);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(searchParams?.pageSize ?? 10);
      setLoading(false);
    };
  
    fetchData();
  }, [page, pageSize, loadMode, searchParams, filterParams, token]);
  

  // 🎯 Search Event
  useEffect(() => {
    const handleTableSearch = (e: CustomEvent) => {
      console.log("handleTableSearch", e.detail);
      setPage(1); // Reset to first page
      setSearchParams({ 
        projectName: e.detail.projectName ?? "",
         addressUnit: e.detail.addressUnit ?? "",
         pageSize: e.detail.pageSize ?? 10,
          ...e.detail }); 
      // setFilterParams({ ...filterParams, startDate: e.detail.startDate ?? new Date(), toDate: e.detail.toDate ?? new Date(), parentObjectId: e.detail.parentObjectId ?? 0 });
      setLoadMode("search");
    };
    window.addEventListener("leadTableSearch", handleTableSearch as EventListener);
    return () => window.removeEventListener("leadTableSearch", handleTableSearch as EventListener);
  }, []);

   // 🎯 Filter Event
  useEffect(() => {
    const handleTableReload = (e: CustomEvent) => {
      console.log("handleTableReloadFilter", e.detail);
      setPage(1); // Reset to first page
      setFilterParams({ ...e.detail });
      // setSearchParams({ ...searchParams, startDate: e.detail.startDate ?? new Date(), toDate: e.detail.toDate ?? new Date(), parentObjectId: e.detail.parentObjectId ?? 0 });
      setLoadMode("filter");
    };
    window.addEventListener("leadTableReload", handleTableReload as EventListener);
    return () => window.removeEventListener("leadTableReload", handleTableReload as EventListener);
  }, []); 

  const emptyDataType: DataType = {
    id: 0,
    // key: 0,  
    no: 0,
    projectName: "",
    address: "",
    unitCode: "",
    invId: "",
    floor: 0,
    tower: "",
    size: 0,
    bedRoom: 0,
    bathRoom: 0,
    rentalPrice: 0,
    salePrice: 0,
    lastedUpdate: DateTime.now(),
    status: "",
    saleName: "",
    startDate: DateTime.now(),
    toDate: DateTime.now(),
    assignerName: "",
    displayDuration: "",
    toSalePropertyId: 0,
    propertyId: 0,
    revealStatus: "",
    unitTypeId: [],
    leadNumber: "",
    leadDate: DateTime.now(),
    budget: 0,
    unitType: "",
    owner: "",
    purpose: "",
    source: "",
    clientType: "",
    project: "",
  };

  const rowKeyFunc = (record: DataType) => {
      console.log(modalType);
      if (record.propertyId) {
        return `property-${record.propertyId}`;
    }
    if (record.id) {
        return `id-${record.id}`;
    }
    return `fallback-${record.propertyId || 0}-${record.no}`;
  };

  return (
    <div className="mt-4">
      <Table<DataType>
        rowKey={rowKeyFunc}
        tableLayout="auto"
        expandable={defaultExpandable}
        loading={loading}
        size="small"
        className="text-center"
        columns={columns}
        scroll={{ x: 500, y: 500 }}
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

      <ModalLead
        selectedLead={selectedLead ?? emptyDataType}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        token={token}
      />
    </div>
  );
};

export default TableLead;