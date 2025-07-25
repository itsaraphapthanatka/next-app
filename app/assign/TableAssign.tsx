"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getAssignReports } from '@/app/server_actions/assign-reports';
import { ModalProperty } from '../components/ModalProperty';
import { getAssignReportsFilter } from '@/app/server_actions/assign-reports-filter';


type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  id: number;
  key: number;
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

interface GetPropertiesResponse {
  resultLists?: PropertyApiItem[];
  allRecord?: number;
  currentPage?: number;
  recordPerPage?: number;
}

const MAX_SELECTION = 20;

const TableAssign: React.FC<{ token: string }> = ({ token }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // ตั้ง default เท่ากับ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'no',
      sorter: (a, b) => a.no - b.no,
      width: 35,
    },
    {
      title: 'Project',
        dataIndex: 'projectName',
      fixed: 'left',
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', color: '#1677ff' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
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
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a, b) => a.size - b.size,
      width: 50,
      ellipsis: false,
      render: (text) => (
        <div className='text-center'>
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
      render: (text) => (
        <div className='text-center'>
          {text}
        </div>
      ),
    },
    {
      title: 'Rental',
      dataIndex: 'rentalPrice',
      sorter: (a, b) => a.rentalPrice - b.rentalPrice,
      width: 70,
      render: (text) => (
        <div className='text-center'>
          {text.toLocaleString()}
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
          {text.toLocaleString()}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: 150,
      ellipsis: false,
    },
    Table.EXPAND_COLUMN,
  ];

  const defaultExpandable: ExpandableConfig<DataType> = {
    expandedRowRender: (record) => 
    <table>
      <tbody>
        <tr className='border-b border-dashed border-gray-200'>
          <td className='p-2'>Sale</td>
          <td className='p-2'>{record.saleName}</td>
          <td className='p-2'>Bath</td>
          <td className='p-2'>{record.bathRoom}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-2'>
          <td className='p-2'>Assign From</td>
          <td className='p-2'>{record.assignerName}</td>
          <td className='p-2'>Duration</td>
          <td className='p-2'>{record.displayDuration}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-2'>
          <td className='p-2'>Unit Code</td>
          <td className='p-2'>{record.unitCode}</td>
          <td className='p-2'>Lasted Update</td>
          <td className='p-2'>{record.lastedUpdate}</td>
        </tr>
        <tr className='border-b border-dashed border-gray-200 p-2'>
          <td className='p-2'>INVID</td>
          <td className='p-2'>{record.invId}</td>
          <td className='p-2'>Reveal Status</td>
          <td className='p-2'>{record.revealStatus}</td>
        </tr>
      </tbody>
    </table>,
    fixed: 'right',
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <UpCircleOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
      ),
  };

  useEffect(() => {
    setLoading(true);
    getAssignReports( 
      token,
      { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
      "",
      ""
    ).then((data: GetPropertiesResponse) => {
      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
  
      const mapped: DataType[] = items.map((item, index) => ({
        id: item.id ?? 0,
        key: item.id ?? index,
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
      }));
  
      setProperties(mapped);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
      setLoading(false);
    });
  }, [page, pageSize, token]);

  useEffect(() => {
    const handleTableReload = (e: CustomEvent) => {
      console.log("Table reload", e.detail);
      console.log("e.detail.projectName",e.detail.projectName)
      console.log("e.detail.addressUnit",e.detail.addressUnit)
      setLoading(true);
        getAssignReportsFilter(
          token,
          { page: { current: page, size: pageSize }, 
           orderBy: 'asc',
          assignReportSortType: 'Duration',
          sortType: 'Project',
          projectName: e.detail.projectName ?? "",
          addressUnit: e.detail.addressUnit ?? [],
          revealStatus: e.detail.revealStatus ?? "",
          assignFrom: e.detail.assignFrom ?? "",
          unitTypeIds: e.detail.unitTypeIds ?? [],
          startSize: e.detail.startSize ?? 0,
          toSize: e.detail.toSize ?? 0,
          bedRoom: e.detail.bedRoom ?? 0,
          bathRoom: e.detail.bathRoom ?? 0,
          startRentalRate: e.detail.startRentalRate ?? 0,
          toRentalRate: e.detail.toRentalRate ?? 0,
          startRentalRatePerSQM: e.detail.startRentalRatePerSQM ?? 0,
          toRentalRatePerSQM: e.detail.toRentalRatePerSQM ?? 0,
          startSellingRate: e.detail.startSellingRate ?? 0,
          toSellingRate: e.detail.toSellingRate ?? 0,
          startSellingRatePerSQM: e.detail.startSellingRatePerSQM ?? 0,
          toSellingRatePerSQM: e.detail.toSellingRatePerSQM ?? 0,
          decorationIds: e.detail.decorationIds ?? [],
          pictureStatusIds: e.detail.pictureStatusIds ?? [],
          startFloor: e.detail.startFloor ?? 0,
          toFloor: e.detail.toFloor ?? 0,
          propertyStatusIds: e.detail.propertyStatusIds ?? [],
          showOnWeb: e.detail.showOnWeb ?? 0,
          hotDeal: e.detail.hotDeal ?? 0,
          havePicture: e.detail.havePicture ?? 0,
          forRentOrSale: e.detail.forRentOrSale ?? 0,
          railwayStationId: e.detail.railwayStationId ?? 0,
          startDistance: e.detail.startDistance ?? 0,
          toDistance: e.detail.toDistance ?? 0,
          forwardMKT: e.detail.forwardMKT ?? 0,
          petFriendly: e.detail.petFriendly ?? 0,
          privateLift: e.detail.privateLift ?? 0,
          duplex: e.detail.duplex ?? 0,
          penthouse: e.detail.penthouse ?? 0,
          fixParking: e.detail.fixParking ?? 0,
          projectTypeIds: e.detail.projectTypeIds ?? [],
          bootedProppit: e.detail.bootedProppit ?? 0,
          vipStatusIds: e.detail.vipStatusIds ?? [],
          foreignerOwner: e.detail.foreignerOwner ?? 0,
        }
      ).then((data: GetPropertiesResponse) => {
        const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
        console.log("Data", data);
        const mapped: DataType[] = items.map((item, index) => ({
          id: item.id ?? 0,
          key: item.id ?? index,
          no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
          projectName: item.projectName ?? "-",
          address: item.address ?? "-",
          unitCode: item.unitCode ?? "-",
          invId: item.invId ?? "-",
          floor: item.floor ?? "-",
          tower: item.tower ?? "-",
          size: item.size ?? 0,
          bedRoom: item.bedRoom ?? 0,
          bathRoom: item.bathRoom ?? 0,
          rentalPrice: item.rentalPrice ?? 0,
          salePrice: item.salePrice ?? 0,
          status: item.status ?? "-",
          lastedUpdate: item.lastedUpdate ?? "-",
          saleName: item.saleName ?? "-",
          startDate: item.startDate ?? "-",
          toDate: item.toDate ?? "-",
          assignerName: item.assignerName ?? "-",
          displayDuration: item.displayDuration ?? "-",
          toSalePropertyId: item.toSalePropertyId ?? 0,
          propertyId: item.propertyId ?? 0,
          revealStatus: item.revealStatus ?? "-",
        }));
        setProperties(mapped);
        setTotalRecords(data.allRecord ?? 0);
        setPage(data.currentPage ?? 1);
        setPageSize(data.recordPerPage ?? 10);
        setLoading(false);
      });

      
    };
    window.addEventListener('assignTableReload', handleTableReload as EventListener);
    return () => {
      window.removeEventListener('assignTableReload', handleTableReload as EventListener);
    };
  }, [page, pageSize, token]);

  const emptyDataType: DataType = {
    id: 0,
    key: 0,
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

  return (
    <div className="mt-4">
      <Table<DataType>
        tableLayout="auto"
        expandable={defaultExpandable}
        loading={loading}
        // className="custom-table-font"
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
        rowSelection={{
          type: 'checkbox',
          fixed: 'left',
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
        selectedProperty={selectedProperty ?? emptyDataType}
        modalType={modalType}
        text={selectedProperty?.projectName ?? ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        token={token}
      />
    </div>
  );
};

export default TableAssign;