"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { getProperties } from '@/app/server_actions/property';
import { ModalProperty } from './ModalProperty';
import { getSaleLimit } from '../server_actions/saleLimit';
import { formatNumberShort } from '@/app/utils/formatNumber';
import { getPropertyFilter } from '@/app/server_actions/property-filter'; 

type ColumnsType<T extends object> = TableProps<T>['columns'];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  id: number;
  key: number;
  no: number;
  project: string;
  size: number;
  bed: number;
  bath: number;
  rental: number;
  selling: number;
  status: string;
  invid: string;
  tw: string;
  floor: string;
  RentalPG: string;
  vipStatusColor: string;
  salePG: number;
  rentPGColor: string;
  salePGColor: string;
  rentPGText: string;
  salePGText: string;
  availableOn: string;
  lastUpdate: string;
  selePG?: string;
  vipStatus?: string;
}

interface PropertyApiItem {
  id?: number;
  project?: string;
  size?: number;
  bed?: number;
  bath?: number;
  rental?: number;
  sellingPrice?: number;
  status?: string;
  allRecord?: number;
  totalPage?: number;
  currentPage?: number;
  recordPerPage?: number;
  recordStart?: number;
  recordEnd?: number;
  invid?: string;
  tw?: string;
  floor?: string;
  RentalPG?: string;
  vipStatusColor?: string;
  salePG?: number;
  selling?: number;
  rentPGColor?: string;
  salePGColor?: string;
  rentPGText?: string;
  salePGText?: string;
  availableOn?: string;
  lastUpdate?: string;
  selePG?: string;
  vipStatus?: string;
  // Add other fields if needed
}

interface GetPropertiesResponse {
  resultLists?: PropertyApiItem[];
  allRecord?: number;
  currentPage?: number;
  recordPerPage?: number;
}

// const saleLimit = 20;

const TableProperty: React.FC<{ token: string }> = ({ token }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // ตั้ง default เท่ากับ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [saleLimit, setSaleLimit] = useState(0);
  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'no',
      sorter: (a, b) => a.no - b.no,
      width: 45,
      fixed: 'left',
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
      dataIndex: 'bed',
      sorter: (a, b) => a.bed - b.bed,
      width: 50,
      ellipsis: false,
      render: (text) => (
        <div className='text-center'>
          {text}
        </div>
      ),
    },
    {
      title: 'Bath',
      dataIndex: 'bath',
      sorter: (a, b) => a.bath - b.bath,
      width: 50,
      render: (text) => (
        <div className='text-center'>
          {text}
        </div>
      ),
    },
    {
      title: 'Rental',
      dataIndex: 'rental',
      sorter: (a, b) => a.rental - b.rental,
      width: 70,
      render: (text) => (
        <div className='text-center'>
          {formatNumberShort(text)}
        </div>
      ),
    },
    {
      title: 'Selling',
      dataIndex: 'selling',
      sorter: (a, b) => a.selling - b.selling,
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
      width: 70,
      ellipsis: false,
    },
    Table.EXPAND_COLUMN,
  ];

  const defaultExpandable: ExpandableConfig<DataType> = {
    expandedRowRender: (record) => 
    <table>
      <tbody className='text-xs'>
      <tr className='border-b-2 border-dashed border-gray-200 p-1'>
        <td className='p-1 underline'>INVID</td>
        <td className='p-1 text-right' style={{color: record.vipStatusColor}}>{record.invid}</td>
        <td className='pl-4 underline'>Sale PG</td>
        <td className='p-1 text-right' style={{color: record.salePGColor}}>
          {record.salePGText ? record.salePGText + " %" : "%"}
        </td>
      </tr>
      <tr className='border-b-2 border-dashed border-gray-200 p-1'>
        <td className='p-1 underline'>TW.</td>
        <td className='p-1 text-right'>{record.tw}</td>
        <td className='pl-4 underline'>Last Update</td>
        <td className='p-1 text-right'>{record.lastUpdate}</td>
      </tr>
      <tr className='border-b-2 border-dashed border-gray-200 p-1'>
        <td className='p-1 underline'>FL.</td>
        <td className='p-1 text-right'>{record.floor}</td>
        <td className='pl-4 underline'>Available On</td>
        <td className='p-1 text-right'>{record.availableOn}</td>
      </tr>
      <tr className='border-b-2 border-dashed border-gray-200 p-1'>
        <td className='p-1 underline'>Rent PG</td>
        <td className='p-1 text-right' style={{color: record.rentPGColor}}>
          {record.rentPGText ? record.rentPGText + " %" : "%"}
        </td>
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
    getSaleLimit(token).then((data) => {
      setSaleLimit(data);
    });
  }, [token]);

  useEffect(() => {
    setLoading(true);
    getProperties(
      { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
      token
    ).then((data: GetPropertiesResponse) => {
      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
  
      const mapped: DataType[] = items.map((item, index) => ({
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
      console.log("e.detail.projectName",e.detail.projectName);
      console.log("e.detail.unitTypeIds",e.detail.unitTypeIds);
      console.log("token send to server",token);
      setLoading(true);
      getPropertyFilter(
        { 
          projectName: e.detail.projectName ?? "",
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
          page: { current: page, size: pageSize },
          orderBy: 'asc',
          assignReportSortBy: 'Duration',
        },
        token
      ).then((data: GetPropertiesResponse) => {
        const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
        console.log("Data", data);
        const mapped: DataType[] = items.map((item, index) => ({
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
        }));
        setProperties(mapped);
        setTotalRecords(data.allRecord ?? 0);
        setPage(data.currentPage ?? 1);
        setPageSize(data.recordPerPage ?? 10);
        setLoading(false);
      });

      
    };
    window.addEventListener('propertyTableReload', handleTableReload as EventListener);
    return () => {
      window.removeEventListener('propertyTableReload', handleTableReload as EventListener);
    };
  }, [page, pageSize, token]);
 
  // useEffect(() => {
  //   const handleTableReload = (e: CustomEvent) => {
  //     console.log("Table reload", e.detail);
  //     console.log("e.detail.projectName",e.detail.projectName)
  //     console.log("e.detail.addressUnit",e.detail.addressUnit)
  //     setLoading(true);
  //     getProperties(
  //       { page: { current: page, size: pageSize }, orderBy: 'asc', assignReportSortBy: 'Duration' },
  //       token,
  //       e.detail.projectName ?? "",
  //       e.detail.addressUnit ?? ""
  //     ).then((data: GetPropertiesResponse) => {
  //       const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
  //       console.log("Data", data);
  //       const mapped: DataType[] = items.map((item, index) => ({
  //         id: item.id ?? 0,
  //         key: item.id ?? index,
  //         no: index + 1 + ((data?.currentPage ?? 1) - 1) * (data?.recordPerPage ?? 10),
  //         project: item.project ?? "-",
  //         size: item.size ?? 0,
  //         bed: item.bed ?? 0,
  //         bath: item.bath ?? 0,
  //         rental: item.rental ?? 0,
  //         selling: item.selling ?? 0,
  //         status: item.status ?? "-",
  //         invid: item.invid ?? "-",
  //         tw: item.tw ?? "-",
  //         floor: item.floor ?? "-",
  //         RentalPG: item.RentalPG ?? "-",
  //         vipStatusColor: item.vipStatusColor ?? "-",
  //         salePG: item.salePG ?? 0,
  //         rentPGColor: item.rentPGColor ?? "-",
  //         salePGColor: item.salePGColor ?? "-",
  //         rentPGText: item.rentPGText ?? "-",
  //         salePGText: item.salePGText ?? "-",
  //         availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
  //         lastUpdate: item.lastUpdate ? new Date(item.lastUpdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
  //         vipStatus: item.vipStatus ?? "-",
  //       }));
  //       setProperties(mapped);
  //       setTotalRecords(data.allRecord ?? 0);
  //       setPage(data.currentPage ?? 1);
  //       setPageSize(data.recordPerPage ?? 10);
  //       setLoading(false);
  //     });

      
  //   };
  //   window.addEventListener('propertyTableReload', handleTableReload as EventListener);
  //   return () => {
  //     window.removeEventListener('propertyTableReload', handleTableReload as EventListener);
  //   };
  // }, [page, pageSize, token]);

  // Instead of using `as any`, provide a default DataType object
  const emptyDataType: DataType = {
    id: 0,
    key: 0,
    no: 0,
    project: "",
    size: 0,
    bed: 0,
    bath: 0,
    rental: 0,
    selling: 0,
    status: "",
    invid: "",
    tw: "",
    floor: "",
    RentalPG: "",
    vipStatusColor: "",
    salePG: 0,
    rentPGColor: "",
    salePGColor: "",
    rentPGText: "",
    salePGText: "",
    availableOn: "",
    lastUpdate: "",
    selePG: "",
    vipStatus: "",
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
        scroll={{ x: 800, y: 500 }}
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

            if (newSelectedKeys.length > saleLimit) {
              limitedKeys = newSelectedKeys.slice(0, saleLimit);
            }

            setSelectedRowKeys(limitedKeys);
            const event = new CustomEvent('propertySelectionCount', { detail: limitedKeys.length });
            window.dispatchEvent(event);
          },
          getCheckboxProps: (record) => ({
            disabled: selectedRowKeys.length >= saleLimit && !selectedRowKeys.includes(record.key),
          }),
        }}
      />

      <ModalProperty
        selectedProperty={selectedProperty ?? emptyDataType}
        modalType={modalType}
        text={selectedProperty?.project ?? ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        token={token}
      />
    </div>
  );
};

export default TableProperty;