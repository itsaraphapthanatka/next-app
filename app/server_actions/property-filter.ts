import axios, { AxiosResponse } from "axios";

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
  
interface GetPropertiesParams {
  projectName?: string;
  addressUnit?: string;
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
  page?: PropertyPageParams;
  sortType?: PropertyBackOfficeSortType;
  orderBy?: string;
  assignReportSortBy?: string;
}

interface PropertyPageParams {
  current: number;
  size: number;
}


    export const getPropertyFilter = async (body?: GetPropertiesParams,token?:string) => {
        console.log("body send to server getPropertyFilter",body);
        // console.log("token send to server getPropertyFilter",token);
        console.log("body.page.current send to server getPropertyFilter",body?.page?.current);
        console.log("body.page.size send to server getPropertyFilter",body?.page?.size);
    const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/properties/filter`,
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
  return response.data;
};