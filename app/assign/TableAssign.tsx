"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getAssignReports } from '@/app/server_actions/assign-reports';
import { ModalProperty } from '../components/ModalProperty';
import { getAssignReportsFilter } from '@/app/server_actions/assign-reports-filter';
import { formatNumberShort } from '@/app/utils/formatNumber';

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  id: number;
  // key: number;
  no: number;
  projectName: string,
  address: string,
  unitCode: string,
  invId: string,
  floor: number,
  tower: string,
  size: number,
  bedRoom: number,
  bathRoom: number,
  rentalPrice: number,
  salePrice: number,
  lastedUpdate: string,
  status: string,
  saleName: string,
  startDate: string,
  toDate: string,
  assignerName: string,
  displayDuration: string,
  toSalePropertyId: number,
  propertyId: number,
  revealStatus: string
}

interface PropertyApiItem {
  id?: number;
  projectName: string,
  address: string,
  unitCode: string,
  invId: string,
  floor: number,
  tower: string,
  size: number,
  bedRoom: number,
  bathRoom: number,
  rentalPrice: number,
  salePrice: number,
  lastedUpdate: string,
  status: string,
  saleName: string,
  startDate: string,
  toDate: string,
  assignerName: string,
  displayDuration: string,
  toSalePropertyId: number,
  propertyId: number,
  revealStatus: string
  // Add other fields if needed
}

interface FilterParams {
  projectNameFilter?: string;
  unitTypeIds?: string[];
  startSize?: number;
  toSize?: number;
  bedRoom?: number;
  bathRoom?: number;
  startRentalRate?: number;
  toRentalRate?: number;  
  startRentalRatePerSQM?: number;
  toRentalRatePerSQM?: number;
  startSellingRate?: number;
  toSellingRate?: number;
  startSellingRatePerSQM?: number;
  toSellingRatePerSQM?: number;
  decorationIds?: string[];
  pictureStatusIds?: string[];
  startFloor?: number;
  toFloor?: number;
  propertyStatusIds?: string[];
  showOnWeb?: number;
  hotDeal?: number;
  havePicture?: number;
  forRentOrSale?: number;
  railwayStationId?: number;
  startDistance?: number;
  toDistance?: number;
  forwardMKT?: number;
  petFriendly?: number;
  privateLift?: number;
  duplex?: number;
  penthouse?: number;
  fixParking?: number;
  projectTypeIds?: string[];
  bootedProppit?: number;
  vipStatusIds?: string[];
  foreignerOwner?: number;
  propertyId?: number;
  projectID?: number;
  assignFrom?: string;
  revealStatus?: string;
}

// const MAX_SELECTION = 20;

  const TableAssign: React.FC<{ token: string }> = ({ token }) => {
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
  const [searchParams, setSearchParams] = useState<{ projectName: string, addressUnit: string }>({ projectName: "", addressUnit: "" });
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'no',
      fixed: 'left',
      sorter: (a, b) => a.no - b.no,
      width: 35,
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
      title: 'Project',
      dataIndex: 'projectName',
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
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
      title: 'Address',
      dataIndex: 'address',
      width: 100,
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
          {text}
        </div>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a, b) => a.size - b.size,
      width: 50,
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
          {text}
        </div>
      ),
    },
    {
      title: 'Bed',
      dataIndex: 'bedRoom',
      sorter: (a, b) => a.bedRoom - b.bedRoom,
      width: 50,
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
          {text}
        </div>
      ),
    },
    {
      title: 'Rental',
      dataIndex: 'rentalPrice',
      sorter: (a, b) => a.rentalPrice - b.rentalPrice,
      width: 70,
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
      title: 'Selling',
      dataIndex: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice,
      width: 70,
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
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: 100,
      ellipsis: false,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer'}}
          onClick={() => handleToggleExpand(record)}
        >
          {text}
        </div>
      ),
    },
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
      

      if (loadMode === "search" && searchParams) {
        data = await
        getAssignReports( 
          token,
          { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
          searchParams.projectName,
          searchParams.addressUnit
          );
      } else if (loadMode === "filter" && filterParams) {
        console.log("filterParams", filterParams);
        data = await getAssignReportsFilter(
          token, 
          { ...filterParams, page: { current: page, size: pageSize }, orderBy: "asc", assignReportSortType: "Duration", sortType: "Project" },
          );
      } else {
        data = await getAssignReports( 
          token,
          { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
          "",
          ""
          );
      }

      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];

      const mapped = items.map((item: PropertyApiItem, index: number) => ({
        id: item.id ?? 0,
        // key: item.propertyId ?? index,
        no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
        projectName: item.projectName ?? "-",
        address: item.address ?? "-",
        size: item.size ?? 0,
        bedRoom: item.bedRoom ?? 0,
        bathRoom: item.bathRoom ?? 0,
        rentalPrice: item.rentalPrice ?? 0,
        salePrice: item.salePrice ?? 0,
        status: item.status ?? "-",
        invId: item.invId ?? "-",
        tower: item.tower ?? "-",
        floor: item.floor ?? "-",
        unitCode: item.unitCode ?? "-",
        lastedUpdate: item.lastedUpdate ?? "-",
        saleName: item.saleName ?? "-",
        startDate: item.startDate ?? "-",
        toDate: item.toDate ?? "-",
        assignerName: item.assignerName ?? "-",
        displayDuration: item.displayDuration ?? "-",
        toSalePropertyId: item.toSalePropertyId ?? 0,
        propertyId: item.propertyId ?? 0,
        revealStatus: item.revealStatus ?? "-",
        salePG: item.salePrice ?? 0,
        rentPG: item.rentalPrice ?? 0,
      }));

      setProperties(mapped);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, loadMode, searchParams, filterParams, token]);

  // 🎯 Search Event
  useEffect(() => {
    const handleTableSearch = (e: CustomEvent) => {
      setPage(1); // Reset to first page
      setSearchParams({ projectName: e.detail.projectName ?? "", addressUnit: e.detail.addressUnit ?? "" });
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
      setFilterParams(e.detail);
      setLoadMode("filter");
    };
    window.addEventListener("assignTableReload", handleTableReload as EventListener);
    return () => window.removeEventListener("assignTableReload", handleTableReload as EventListener);
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
  };

  const rowKeyFunc = (record: DataType) => {
    if (record.propertyId && record.propertyId) {
        return `${record.propertyId}-${record.propertyId}`;
    }
    if (record.id && record.id !== 0) {
        return `id-${record.id}`;
    }
    // ใช้การรวม propertyId กับ no เพื่อสร้าง unique key
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
        columns={columns}
        scroll={{ x: 1000, y: 500 }}
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

        // rowSelection={{
        //   type: 'checkbox',
        //   columnTitle: <span className="hidden-checkbox-header" />,
        //   selectedRowKeys,
        //   onChange: (newSelectedKeys) => {
        //     let limitedKeys = newSelectedKeys;

        //     if (newSelectedKeys.length > MAX_SELECTION) {
        //       limitedKeys = newSelectedKeys.slice(0, MAX_SELECTION);
        //     }

        //     setSelectedRowKeys(limitedKeys);
        //     onSelectionChange(limitedKeys.map(key => Number(key)));
        //   },
        //   getCheckboxProps: (record) => ({
        //     disabled: selectedRowKeys.length >= MAX_SELECTION && !selectedRowKeys.includes(record.key),
        //   }),
        // }}
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

export default TableAssign;