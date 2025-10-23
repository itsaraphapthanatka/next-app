"use client";
import React, { useEffect, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { deleteLead, leadSearch } from '@/app/server_actions/lead';
import { formatNumberShort } from '../utils/formatNumber';
import { DateTime } from 'luxon';
import { ModalLead } from './ModalLead';
import { App as AntdApp } from "antd";

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
  startDate: string;
  toDate: string;
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
  revealStatus: number;
  clientType: string;
  leadStatusId: number;
  leadPurposeId: number;
  leadSourceId: number;
  saleManagerId: number;
  sale: string;
}

interface FilterParams {
  startDate: string;
  toDate: string;
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
  revealStatus: number;
}

const defaultPayload = {
  search: "",
  page: {
    current: 0,
    size: 0
  },
  userId: 0,
  startDate: "2025-10-23T04:18:21.528Z",
  toDate: "2025-10-23T04:18:21.528Z",
  branchId: 0,
  groupId: 0,
  getAllRecord: true,
  projectId: 0,
  developerBrandId: 0,
  parentObjectId: 0,
  searchFromFront: true,
  selectedMode: true,
  propertyFilter: {
    projects: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: "",
        address: "",
        latitude: "",
        longtitude: "",
        petFriendly: true,
        petLimit: 0,
        isLeaseHold: true,
        parkingSpace: 0,
        fixParkingSpace: true,
        buildYear: 0,
        towerCount: 0,
        totalRoom: 0,
        maintainanceFee: 0,
        singkingFund: 0,
        place: "",
        nearlyCondo: "",
        maximumClass: 0,
        developerBrand: {
          errors: [
            {
              code: "",
              message: ""
            }
          ],
          returnObjectId: 0,
          successMessage: "",
          id: 0,
          name: "",
          createUser: "",
          createDate: "2025-10-23T04:18:21.528Z",
          updateUser: "",
          updateDate: "2025-10-23T04:18:21.528Z",
          thaiName: ""
        },
        towers: [
          {
            errors: [
              {
                code: "",
                message: ""
              }
            ],
            returnObjectId: 0,
            successMessage: "",
            id: 0,
            name: "",
            totalRoom: 0,
            totalClass: 0,
            projectId: 0
          }
        ],
        pictures: [
          {
            errors: [
              {
                code: "",
                message: ""
              }
            ],
            returnObjectId: 0,
            successMessage: "",
            id: 0,
            filename: "",
            applicationType: "",
            extension: "",
            guId: "",
            sourceType: "",
            sourceId: 0,
            fileSize: 0,
            sortIndex: 0,
            imageHeight: 0,
            imageWidth: 0,
            filePath: "",
            url: "",
            originalURL: "",
            watermarkURL: "",
            caption: ""
          }
        ],
        overview: "",
        projectView: 0,
        website: "",
        rentRoom: 0,
        rentMinimum: 0,
        saleRoom: 0,
        saleMinimum: 0,
        seo: {
          title: "",
          keyword: "",
          description: "",
          thaiTitle: "",
          thaiDescription: "",
          thaiKeyword: ""
        },
        ddpropertyId: "",
        canonical: "",
        facilities: [
          {
            id: 0,
            name: "",
            icon: "",
            createUsername: "",
            createDate: "2025-10-23T04:18:21.528Z",
            updateUsername: "",
            updateDate: "2025-10-23T04:18:21.528Z",
            facilityType: "Project",
            forProject: true,
            forProperty: true,
            errors: [
              {
                code: "",
                message: ""
              }
            ]
          }
        ],
        vdoList: "",
        projectType: {
          errors: [
            {
              code: "",
              message: ""
            }
          ],
          returnObjectId: 0,
          successMessage: "",
          id: 0,
          name: "",
          createUser: "",
          createDate: "2025-10-23T04:18:21.528Z",
          updateUser: "",
          updateDate: "2025-10-23T04:18:21.528Z",
          thaiName: ""
        },
        baaniaId: "",
        privateLift: true,
        duplex: true,
        proppitId: "",
        rentMarketPrice: 0,
        saleMarketPrice: 0,
        areaId: 0,
        areaShortName: "",
        areaThaiShortName: "",
        massTransitLineId: 0,
        massTransitLineStationType: "",
        nearStationId: 0,
        airTableId: "",
        disable: true,
        subDistrictId: 0,
        thaiAddress: "",
        provinceId: 0,
        districtId: 0,
        thaiNearlyCondo: "",
        thaiOverView: "",
        juristicCompanyName: "",
        juristicContactName: "",
        juristicContactPosition: "",
        juristicContactPhoneNumber: "",
        parkingRemark: "",
        subDistrictName: "",
        provinceName: "",
        districtName: "",
        fullName: "",
        seoID: 0,
        marketintTeamID: 0
      }
    ],
    unitTypes: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: ""
      }
    ],
    startSize: 0,
    toSize: 0,
    bedRoom: 0,
    bathRoom: 0,
    startRentalRateOnWeb: 0,
    toRentalRateOnWeb: 0,
    startRentalRatePerSQM: 0,
    toRentalRatePerSQM: 0,
    startSellingRateOnWeb: 0,
    toSellingRateOnWeb: 0,
    startSellingPerSQM: 0,
    toSellingPerSQM: 0,
    decorations: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: ""
      }
    ],
    pictureStatuses: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: ""
      }
    ],
    projectId: 0,
    unitTypeId: [
      ""
    ],
    decorationId: [
      ""
    ],
    pictureStatusId: [
      ""
    ],
    projectName: "",
    permission: {
      menuId: 0,
      canCreate: true,
      canView: true,
      canUpdate: true,
      canDelete: true,
      canAssignContact: true,
      requestProperty: true
    },
    propertyStatuses: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: ""
      }
    ],
    startFloor: 0,
    toFloor: 0,
    propertyStatusId: [
      ""
    ],
    showOnWeb: 0,
    hotDeal: 0,
    picture: 0,
    forRentOrSale: 0,
    realwayStations: [
      {
        id: 0,
        thaiName: "",
        englishName: "",
        latitude: "",
        longtitude: "",
        stationTypeValue: "",
        stationType: "BTS",
        updateUsername: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        keywords: "",
        massTransitLineId: 0
      }
    ],
    realwayStationId: 0,
    startDistance: 0,
    toDistance: 0,
    forwardMKT: 0,
    petFriendly: 0,
    privateLift: 0,
    duplex: 0,
    penthouse: 0,
    fixParking: 0,
    projectTypes: [
      {
        errors: [
          {
            code: "",
            message: ""
          }
        ],
        returnObjectId: 0,
        successMessage: "",
        id: 0,
        name: "",
        createUser: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateUser: "",
        updateDate: "2025-10-23T04:18:21.528Z",
        thaiName: ""
      }
    ],
    projectTypeId: [
      ""
    ],
    boostedProppit: 0,
    assignedReportMode: true,
    vipStatuses: [
      {
        id: 0,
        name: "",
        color: "",
        createDate: "2025-10-23T04:18:21.528Z",
        updateName: ""
      }
    ],
    vipStatus: [
      ""
    ],
    propertyStatus: "",
    revealStatus: "",
    propertyStatusSingleId: 0,
    foreignerOwner: "",
    massTransitLineId: [
      ""
    ]
  },
  projectSearch: {
    forRent: true,
    forSale: true,
    priceRange: "",
    roomType: "",
    projectName: ""
  },
  searchAllFilter: {
    projectName: "",
    type: "",
    roomType: "",
    priceRange: "",
    orderBy: "MostRelevant",
    bedroom: 0,
    bathroom: 0,
    projectTypeId: 0,
    roomSizeRange: "",
    petFriendly: true,
    privateLift: true,
    fixedParking: true,
    duplex: true,
    penthouse: true,
    projectId: 0,
    distanceMin: 0,
    distanceMax: 0,
    minPrice: 0,
    maxPrice: 0,
    rentBuy: "",
    propertyType: [
      ""
    ],
    roomTypeList: [
      ""
    ],
    roomSizeMin: 0,
    roomSizeMax: 0
  },
  backOfficeViewFilter: {
    searchType: "All",
    propertyId: 0,
    projectId: 0
  },
  ipAddress: "",
  propertyBackOfficeSortType: "Project",
  sortBy: "ASC",
  contactFormStatus: 0,
  currentLanguage: "",
  forRent: true,
  forSale: true,
  ids: [
    0
  ],
  homeCategoryType: "PropertyType",
  saleId: 0,
  assignerId: 0,
  revealStatus: 0,
  viewMode: "",
  saleName: "",
  assignerName: "",
  massTransit: "",
  minBudget: 0,
  maxBudget: 0,
  assignContactReportSortBy: "Duration",
  dataEditReportSortBy: "RequestDate",
  roomType: "",
  projectDataEditReportSortBy: "RequestDate",
  invIDs: "",
  favoriteMode: true
};



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
  const { message } = AntdApp.useApp();
   


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
            setIsModalOpen(true);
          }}
        >
          {text
            ? DateTime.fromISO(text.toString()).setLocale("th").toFormat("dd/MM/yyyy")
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
      render: (record) => (
        <div className='flex flex-row gap-2'>
          <DeleteOutlined onClick={() => handleDelete(record.id)} />
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

  const fetchData = async () => {
    setLoading(true);
  
    const startDate = searchParams?.startDate ?? filterParams?.startDate ?? new Date('2025-10-23T04:18:21.528Z');
    const toDate = searchParams?.toDate ?? filterParams?.toDate ?? new Date('2025-10-23T04:18:21.528Z');
  
    // ✅ convert เป็น format ที่ .NET ชอบ
    const startDateStr = DateTime.fromJSDate(new Date(startDate)).toFormat("yyyy-MM-dd'T'HH:mm:ss");
    const toDateStr = DateTime.fromJSDate(new Date(toDate)).toFormat("yyyy-MM-dd'T'HH:mm:ss");
  
    const leadFilter = {
      leadFilter: {
        clientType: "Client" as const,
        leadStatusId: searchParams?.leadStatusId ?? 0,
        leadPurposeId: searchParams?.leadPurposeId ?? 0,
        leadSourceId: searchParams?.leadSourceId ?? 0,
        saleManagerId: searchParams?.saleManagerId ?? 0,
        sale: searchParams?.sale ?? "",
        projectName: searchParams?.projectName ?? "",
      }
    };
  
    const payloadBase = {
      token,
      page: { current: page, size: pageSize },
      searcher: "web-client", 
      startDate: startDateStr,
      toDate: toDateStr,
    };
  
    let data;
  
    if (loadMode === "search" && searchParams) {
      data = await leadSearch(token, {
        ...defaultPayload,
        search: searchParams?.addressUnit ?? "",
        ...payloadBase,
        revealStatus: Number(searchParams?.revealStatus),
        ...leadFilter,
      });
    } else if (loadMode === "filter" && filterParams) {
      data = await leadSearch(token, {
        ...defaultPayload,
        search: searchParams?.addressUnit ?? "",
        ...payloadBase,
        revealStatus: Number(searchParams?.revealStatus),
        ...leadFilter,
      });
    } else {
      data = await leadSearch(token, {
        ...defaultPayload,
        ...payloadBase,
        revealStatus: 0,
      });
    }
  
    const items = Array.isArray(data?.resultLists) ? data.resultLists : [];
    setProperties(items);
    setTotalRecords(data.allRecord ?? 0);
    setPage(data.currentPage ?? 1);
    setPageSize(searchParams?.pageSize ?? 10);
    setLoading(false);
  };
  
  
  

  useEffect(() => {
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
      if (record.propertyId) {
        console.log("modalType", modalType);
        return `property-${record.propertyId}`;
    }
    if (record.id) {
        return `id-${record.id}`;
    }
    return `fallback-${record.propertyId || 0}-${record.no}`;
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    deleteLead(id, token).then((response) => {
      console.log("response in handleDelete", response);
      if (response.status === 200) {
        message.success("Delete lead successfully");
        fetchData(); 
      } else {
        message.error("Delete lead failed");
        fetchData();
      }
    });
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