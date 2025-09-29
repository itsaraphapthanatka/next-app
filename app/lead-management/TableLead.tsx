"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getLeads } from '@/app/server_actions/lead';
import { ModalProperty } from '../components/ModalProperty';
import { formatNumberShort } from '../utils/formatNumber';
import { DateTime } from 'next-auth/providers/kakao';

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
  lastedUpdate: string;
  status: string;
  saleName: string;
  startDate: string;
  toDate: string;
  assignerName: string;
  displayDuration: string;
  toSalePropertyId: number;
  propertyId: number;
  revealStatus: string;
  unitTypeId: string[];
  leadNumber: string;
  leadDate: string;
  budget: number;
}

interface FilterParams {
  startDate: DateTime;
  toDate: DateTime;
  parentObjectId: number;

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
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [loadMode, setLoadMode] = useState<string>("default");
  const [searchParams, setSearchParams] = useState<{ projectName: string, addressUnit: string, startDate: DateTime, toDate: DateTime, parentObjectId: number, startSize: number, toSize: number, bedRoom: number, bathRoom: number, startRentalRate: number, toRentalRate: number, startRentalRatePerSQM: number, toRentalRatePerSQM: number, startSellingRate: number, toSellingRate: number, startSellingRatePerSQM: number, toSellingRatePerSQM: number, decorationIds: string[], pictureStatusIds: string[], startFloor: number, toFloor: number, propertyStatusIds: string[], showOnWeb: number, hotDeal: number, havePicture: number, forRentOrSale: number, railwayStationId: number, startDistance: number, toDistance: number, forwardMKT: number, petFriendly: number, privateLift: number, duplex: number, penthouse: number, fixParking: number, projectTypeIds: string[], bootedProppit: number, vipStatusIds: string[], foreignerOwner: number, propertyId: number, projectID: number, assignFrom: string, revealStatus: string, propertyFilter: string[], favoriteMode: boolean }>(); 
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
            setSelectedProperty(record);
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
            setSelectedProperty(record);
            setModalType("assign");
            setIsModalOpen(true);
          }}
        >
          
          {record.leadDate ? new Date(record.leadDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric'}) : "-"}
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
            setSelectedProperty(record);
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
          <td className='pl-4 underline'>Bath</td>
          <td className='p-1 text-right'>{record.bathRoom}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Assign From</td>
          <td className='p-1 text-right'>{record.assignerName}</td>
          <td className='pl-4 underline'>Duration</td>
          <td className='p-1 text-right'>{record.displayDuration}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>Unit Code</td>
          <td className='p-1 text-right'>{record.unitCode}</td>
          <td className='pl-4 underline'>Lasted Update</td>
          <td className='p-1 text-right'>{record.lastedUpdate}</td>
        </tr>
          <tr className='border-b border-dashed border-gray-200 p-1'>
          <td className='p-1 underline'>INVID</td>
          <td className='p-1 text-right'>{record.invId}</td>
          <td className='pl-4 underline'>Reveal Status</td>
          <td className='p-1 text-right'>{record.revealStatus}</td>
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
      let data;
      const startDate = searchParams?.startDate ?? new Date();
      const toDate = searchParams?.toDate ?? new Date();
      if (loadMode === "search" && searchParams) {
        console.log("searchParams", searchParams);
        data = await getLeads(
          token,
          searchParams.projectName,
          page,
          pageSize,
          0,
          startDate.toString(),
          toDate.toString(),
          0, 0, false, 0, 0, searchParams?.parentObjectId ?? 0, true, true, searchParams, searchParams?.favoriteMode ?? false
        );
      } else if (loadMode === "filter" && filterParams) {
        data = await getLeads(token, "", page, pageSize, 0, startDate.toString(), toDate.toString(), 0, 0, false, 0, 0, filterParams?.parentObjectId ?? 0, true, true, filterParams, filterParams?.favoriteMode ?? false);
      } else {
        data = await getLeads(token, "", page, pageSize, 0, startDate.toString(), toDate.toString(), 0, 0, false, 0, 0, 0, true, true, {}, false);
      }

      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
      setProperties(items); 
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
      setLoading(false);
    }

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
    lastedUpdate: "",
    status: "",
    saleName: "",
    startDate: "",
    toDate: "",
    assignerName: "",
    displayDuration: "",
    toSalePropertyId: 0,
    propertyId: 0,
    revealStatus: "",
    unitTypeId: [],
    leadNumber: "",
    leadDate: "",
    budget: 0,
  };

  const rowKeyFunc = (record: DataType) => {
    // if (record.propertyId && record.propertyId) {
    //     return `${record.propertyId}-${record.propertyId}`;
    // }
    // if (record.id && record.id !== 0) {
    //     return `id-${record.id}`;
    // }
    // // ใช้การรวม propertyId กับ no เพื่อสร้าง unique key
    // return `fallback-${record.propertyId || 0}-${record.no}`;
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

      <ModalProperty
        selectedProperty={selectedProperty ?? emptyDataType}
        modalType={modalType}
        text={selectedProperty?.projectName ?? ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        token={token}
        downloadOriginalFiles={null}
      />
    </div>
  );
};

export default TableLead;