import axios from "axios";

interface propertyFilter {
  projectName?: string;
  addressUnit?: string;
  startSize?: number;
  toSize?: number;
  bedRoom?: number;
} 

interface LeadSearchParams {
  token: string;
  search?: string;
  page?: number;
  size?: number;
  userId?: number;
  startDate?: string;
  toDate?: string;
  branchId?: number;
  groupId?: number;
  projectId?: number;
  developerBrandId?: number;
  parentObjectId?: number;
  selectedMode?: boolean;
  propertyFilter?: propertyFilter;
  favoriteMode?: boolean;
}

// 🟢 Base request payload with defaults
const defaultPayload = {
  page: { current: 1, size: 20 },
  getAllRecord: true,
  searchFromFront: true,
  selectedMode: false,
  propertyFilter: {},
  projectSearch: {},
  searchAllFilter: {},
  backOfficeViewFilter: {},
  propertyBackOfficeSortType: "Project",
  sortBy: "ASC",
  leadFilter: { clientType: "Client" },
  contactFormStatus: 0,
  currentLanguage: "",
  forRent: true,
  forSale: true,
  ids: [],
  homeCategoryType: "PropertyType",
  assignContactReportSortBy: "Duration",
  dataEditReportSortBy: "RequestDate",
  projectDataEditReportSortBy: "RequestDate",
};

// 🟢 getLeads optimized
export const getLeads = async (params: LeadSearchParams) => {
  const {
    token,
    search = "",
    page = 1,
    size = 20,
    userId,
    startDate,
    toDate,
    branchId,
    groupId,
    projectId,
    developerBrandId,
    parentObjectId,
    selectedMode = false,
    propertyFilter = {},
    favoriteMode = false,
  } = params;

  const payload = {
    ...defaultPayload,
    search,
    page: { current: page, size },
    userId,
    branchId,
    groupId,
    projectId,
    developerBrandId,
    parentObjectId,
    selectedMode,
    propertyFilter,
    favoriteMode,
    startDate: startDate ? new Date(startDate).toISOString() : undefined,
    toDate: toDate ? new Date(toDate).toISOString() : undefined,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/leads/search`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

// 🟢 getLeadById stays simple
export const getLeadById = async (id: number, token: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/leads/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const newLead = async (
  token: string,
  {
    projectName,
    leadStatusId,
    leadPurposeId,
    leadSourceId,
    clientType,
    ownerId,
    unitTypeId,
  }: {
    projectName: string;
    leadStatusId: number;
    leadPurposeId: number;
    leadSourceId: number;
    clientType: string;
    ownerId: number;
    unitTypeId: number;
  }
) => {
  const payload = {
    projectName,
    leadStatusId,
    leadPurposeId,
    leadSourceId,
    clientType,
    ownerId,
    unitTypeId,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/leads/create`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteLead = async (id: number, token: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/leads/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return {data: response.data, status: response.status};
};