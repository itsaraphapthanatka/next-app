"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Tabs } from "antd";

import { SummaryDashboard } from "./SummaryDashboard";
import { PropertyReadyForRent } from "./PropertyReadyForRent";
import { PropertyNotReadyForRent } from "./PropertyNotReadyForRent";
import { SearchKeyword } from "./SearchKeyword";
import { ProjectLessThenPicture } from "./ProjectLessThenPicture";


export default function DashboardClient({ token }: { token: string }) {
  const items = [
    {
      key: "1",
      label: "Summary Dashboard",
      children: <SummaryDashboard token={token} />,
    },
    {
      key: "2",
      label: "Property ready for rent",
      children: <PropertyReadyForRent token={token} />,
    },
    {
      key: "3",
      label: "Property Not Ready for rent",
      children: <PropertyNotReadyForRent token={token} />,
    },
    {
      key: "4",
      label: "Search Keyword",
      children: <SearchKeyword token={token} />,
    },
    {
      key: "5",
      label: "Project less then picture",
      children: <ProjectLessThenPicture token={token} />,
    },
  ];

  return (
    <div className="mx-auto p-4">
      <div className="flex items-center gap-2">
        <Link href="/menu" passHref>
          <ArrowLeftCircleIcon className="w-10 h-10 cursor-pointer text-amber-500" />
        </Link>
        <h1>Dashboard</h1>
      </div>
      <div className="mt-4">
        <Tabs items={items} />
      </div>
    </div>
  );
}
