"use client";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Tabs } from "antd";

import { SummaryDashboard } from "./SummaryDashboard";
import { PropertyReadyForRent } from "./PropertyReadyForRent";
import { SearchKeyword } from "./SearchKeyword";
import { ProjectLessThenPicture } from "./ProjectLessThenPicture";


export default function DashboardClient() {
  const items = [
    {
      key: "1",
      label: "Summary Dashboard",
      children: <SummaryDashboard />,
    },
    {
      key: "2",
      label: "Property ready for rent",
      children: <PropertyReadyForRent />,
    },
    {
      key: "3",
      label: "Search Keyword",
      children: <SearchKeyword />,
    },
    {
      key: "4",
      label: "Project less then picture",
      children: <ProjectLessThenPicture />,
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
