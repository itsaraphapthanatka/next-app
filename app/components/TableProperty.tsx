"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { getProperties } from "@/app/server_actions/property";
import { getPropertyFilter } from "@/app/server_actions/property-filter";
import { getSaleLimit } from "../server_actions/saleLimit";
import { ModalProperty } from "./ModalProperty";
import type { TableProps } from "antd/es/table";
import { getDownloadOriginalFiles } from "@/app/server_actions/download-original-files";
import { formatNumberShort } from "@/app/utils/formatNumber";
import { SorterResult } from "antd/es/table/interface"; // 💡 NEW

type LoadMode = "default" | "search" | "filter";
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
  projectID?: number;
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
  projectID?: number;
  // Add other fields if needed
}


interface SearchParams {
  projectName?: string;
  addressUnit?: string;
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
}

type PropertyBackOfficeSortType =
  | "Project"
  | "Address"
  | "UnitCode"
  | "INVID"
  | "Tower"
  | "Floor"
  | "Size"
  | "BedRoom"
  | "BathRoom"
  | "RentalPrice"
  | "SellingPrice"
  | "LastedUpdate"
  | "Status"
  | "RentalPG"
  | "SalePG";

  const columnSortMap: Record<string, PropertyBackOfficeSortType> = {
    project: "Project",
    size: "Size",
    bed: "BedRoom",
    bath: "BathRoom",
    rental: "RentalPrice",
    selling: "SellingPrice",
    status: "Status",
    no: "UnitCode",
  };

// const saleLimit = 20;

const TableProperty: React.FC<{ token: string, onSelectionChange: (selectedIds: number[]) => void }> = ({ token, onSelectionChange }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [properties, setProperties] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [saleLimit, setSaleLimit] = useState(0);
  const [loadMode, setLoadMode] = useState<LoadMode>("default"); // 💡 NEW
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [downloadOriginalFiles, setDownloadOriginalFiles] = useState<Response | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [sortParams, setSortParams] = useState<PropertyBackOfficeSortType>("LastedUpdate");
  const [orderBy, setOrderBy] = useState<string>("DESC");

  const columns: ColumnsType<DataType> = [
    { 
      key: 'no',
      title: 'No.',
      dataIndex: 'no',
      sorter: (a, b) => a.no - b.no,
      width: 45,
      fixed: 'left',
      render: (_text, _record, index) => {
        const actualIndex = (page - 1) * pageSize + index + 1;
        return (
          <div className='text-center'>
            {actualIndex}
          </div>
        );
      }
    },
    {
      key: 'project',
      title: 'Project',
      dataIndex: 'project',
      sorter: true,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {text}
        </div>
      ),
      width: 70,
    },
    {
      key: 'size',
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
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {text}
        </div>
      ),
    },
    {
      key: 'bed',
      title: 'Bed',
      dataIndex: 'bed',
      sorter: (a, b) => a.bed - b.bed,
      width: 50,
      ellipsis: false,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {text}
        </div>
      ),
    },
    {
      key: 'bath',
      title: 'Bath',
      dataIndex: 'bath',
      sorter: (a, b) => a.bath - b.bath,
      width: 50,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {text}
        </div>
      ),
    },
    {
      key: 'rental',
      title: 'Rental',
      dataIndex: 'rental',
      sorter: (a, b) => a.rental - b.rental,
      width: 70,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {formatNumberShort(text)}
        </div>
      ),
    },
    {
      key: 'selling',
      title: 'Selling',
      dataIndex: 'selling',
      sorter: (a, b) => a.selling - b.selling,
      width: 70,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedProperty(record);
            setModalType("property");
            setIsModalOpen(true);
            handleDownloadOriginalFiles(record.key);
          }}
        >
          {formatNumberShort(text)}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      width: 70,
      ellipsis: false,
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', color: record.vipStatusColor}}
          onClick={() => handleToggleExpand(record)}
        >
          {text}
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

  const handleDownloadOriginalFiles = async (key: number) => {
    const response = await getDownloadOriginalFiles(key, token);
    setDownloadOriginalFiles(response.data);
  }

  const handleToggleExpand = (record: DataType) => {
    setExpandedRowKeys((prevKeys) => {
      if (prevKeys.includes(record.key)) {
        return prevKeys.filter((key) => key !== record.key); // ยุบ
      } else {
        return [...prevKeys, record.key]; // ขยาย
      }
    });
  };
  

  useEffect(() => {
    getSaleLimit(token).then((data) => {
      setSaleLimit(data);
    });
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      

      if (loadMode === "search" && searchParams) {
        data = await getProperties({
          page: { current: page, size: pageSize },
          sortBy: sortParams || "LastedUpdate",
          orderBy: orderBy || "DESC",
          assignReportSortBy: "Duration"}, 
          token, 
          searchParams.projectName, 
          searchParams.addressUnit
        );
      } else if (loadMode === "filter" && filterParams) {
        data = await getPropertyFilter({ 
          ...filterParams,
           page: { current: page, size: pageSize }, 
           sortBy: sortParams || "LastedUpdate" , 
           orderBy: orderBy || "DESC", 
           assignReportSortBy: "Duration" }, 
           token
        );
      } else {

        data = await getProperties({
          page: { current: page, size: pageSize },
          sortBy: sortParams || "LastedUpdate",
          orderBy: orderBy || "DESC",
          assignReportSortBy: "Duration"}, 
          token
        );
      }

      const items = Array.isArray(data?.resultLists) ? data.resultLists : [];

      const mapped = items.map((item: PropertyApiItem, index: number) => ({
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
        availableOn: item.availableOn ? new Date(item.availableOn).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-",
        lastUpdate: item.lastUpdate ? new Date(item.lastUpdate).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-",
        vipStatus: item.vipStatus ?? "-",
        propertyId: item.id ?? 0,
      }));

      setProperties(mapped);
      setTotalRecords(data.allRecord ?? 0);
      setPage(data.currentPage ?? 1);
      setPageSize(data.recordPerPage ?? 10);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, loadMode, searchParams, filterParams, token, sortParams, orderBy]);

  // 🎯 Search Event
  useEffect(() => {
    const handleTableSearch = (e: CustomEvent) => {
      console.log("Search Triggered", e.detail);
      setPage(1); // Reset to first page
      setSearchParams({ projectName: e.detail.projectName ?? "", addressUnit: e.detail.addressUnit ?? "" });
      setLoadMode("search");
    };
    window.addEventListener("propertyTableSearch", handleTableSearch as EventListener);
    return () => window.removeEventListener("propertyTableSearch", handleTableSearch as EventListener);
  }, []);

   // 🎯 Filter Event
  useEffect(() => {
    const handleTableReload = (e: CustomEvent) => {
      console.log("Filter Triggered", e.detail);
      setPage(1); // Reset to first page
      setFilterParams(e.detail);
      setLoadMode("filter");
    };
    window.addEventListener("propertyTableReload", handleTableReload as EventListener);
    return () => window.removeEventListener("propertyTableReload", handleTableReload as EventListener);
  }, []); 

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
    projectID: 0,
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
        onChange={(pagination, filters, sorter: SorterResult<any> | SorterResult<any>[]) => {
          const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
        
          console.log("sorter", singleSorter);
          console.log("sorter.field", singleSorter?.field);
        
          if (singleSorter && singleSorter.field && singleSorter.order) {
            const columnSortMap: Record<string, PropertyBackOfficeSortType> = {
              project: "Project",
              size: "Size",
              bed: "BedRoom",
              bath: "BathRoom",
              rental: "RentalPrice",
              selling: "SellingPrice",
              status: "Status",
              no: "UnitCode",
            };
        
            const sortField = columnSortMap[singleSorter.field as string] || "LastedUpdate";
            const sortOrder = singleSorter.order === "ascend" ? "ASC" : "DESC";
            console.log("sortField", sortField);
            console.log("sortOrder", sortOrder);
            setSortParams(sortField);
            setOrderBy(sortOrder);
            const event = new CustomEvent('propertyTableSort', { detail: { sortField, sortOrder } });
            window.dispatchEvent(event);
          }
        }}
        
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

            if (onSelectionChange) {
              onSelectionChange(limitedKeys as number[]);
            }
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
        downloadOriginalFiles={downloadOriginalFiles}
      />
    </div>
  );
};

export default TableProperty;