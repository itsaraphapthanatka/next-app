import axios from "axios";

interface AssignReportsFilterParams {
  projectName?: string;
  addressUnit?: string[];
  revealStatus?: string;
  assignFrom?: string;
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
  page: {
    current: number;
    size: number;
  };
  sortType: string;
  orderBy: string;
  assignReportSortType: string;

}

export const getAssignReportsFilter = async (token: string, body: AssignReportsFilterParams) => {
    console.log("body assign-reports-filter", body);
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/assign-reports/filter`,
        {
            ...body,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }

    );
    console.log("response.data assign-reports-filter", response.data);
    return response.data;
};

