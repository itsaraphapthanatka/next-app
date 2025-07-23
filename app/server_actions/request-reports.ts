import axios from "axios";

export const getRequestReports = async ({
  token,
  sortType = "Project",
  orderBy = "ASC",
  currentPage = 1,
  size = 50,
  saleRequestStatus = "",
}: {
  token: string;
  sortType?: string;
  orderBy?: "ASC" | "DESC";
  currentPage?: number;
  size?: number;
  saleRequestStatus?: string | number;
}) => {
  const params = new URLSearchParams();
  params.append("sortType", sortType);
  params.append("orderBy", orderBy);
  params.append("currentPage", String(currentPage));
  params.append("size", String(size));
  if (saleRequestStatus !== "" && saleRequestStatus !== undefined && saleRequestStatus !== null) {
    params.append("saleRequestStatus", String(saleRequestStatus));
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/users/request-reports?${params.toString()}`;

  const response = await axios.get(url, {
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return response.data;
};
