"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Card, Skeleton, Empty } from "antd";
import { getDashboardData, getDashboardDataPicture, getDashboardDataReadyForRent } from "@/app/server_actions/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type StatusChartData = { series: number[]; labels: string[] };
type ReadyForRentChartData = { series: number[]; labels: string[] };
type PictureChartData = { series: number[]; labels: string[] };
type DashboardResp = { statusChart: StatusChartData, pictureChart: PictureChartData, readyForRentChart: ReadyForRentChartData };

export function SummaryDashboard({ token }: { token: string }) {
  const [dashboardData, setDashboardData] = useState<DashboardResp>({
    statusChart: { series: [], labels: [] },
    pictureChart: { series: [], labels: [] },
    readyForRentChart: { series: [], labels: [] },
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
  
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const raw = await getDashboardData(token);
        const rawPicture = await getDashboardDataPicture(token);
        const rawReadyForRent = await getDashboardDataReadyForRent(token);

        const normalized = {
          statusChart: {
            series:
              raw?.series ??
              [],
            labels:
              raw?.lables ??
              rawPicture?.labels ??
              [],
          },
          pictureChart: {
            series:
              rawPicture?.series ??
              raw?.series ??
              [],
            labels:
              rawPicture?.labels ??
              raw?.labels ??
              rawPicture?.lables ??
              [],
          },
          readyForRentChart: {
            series:
              rawReadyForRent?.series ??
              raw?.series ??
              [],
            labels:
              rawReadyForRent?.labels ??
              raw?.labels ??
              rawReadyForRent?.lables ??
              [],
          },
        };
  
        if (!alive) return;
        setDashboardData(normalized as DashboardResp);  
      } catch (e: unknown) {
        if (!alive) return;
        setErr(e instanceof Error ? e.message : "Failed to load dashboard data");
      } finally {
        if (alive) setLoading(false);
      }
    };
  
    fetchDashboardData();
    return () => {
      alive = false;
    };
  }, [token]);
  

  const statusChart = useMemo(
    () => dashboardData.statusChart,
    [dashboardData]
  );

  const readyForRentChart = useMemo(
    () => dashboardData.readyForRentChart,
    [dashboardData]
  );

  const pictureChart = useMemo(
    () => dashboardData.pictureChart,
    [dashboardData]
  );

  const statusOptions = useMemo(
    () => ({
      labels: statusChart.labels,
      legend: { position: "top" as const },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { width: "100%" },
            legend: { position: "bottom" as const },
          },
        },
      ],
    }),
    [statusChart.labels]
  );

  const pictureOptions = useMemo(
    () => ({
      labels: pictureChart.labels,
      legend: { position: "top" as const },
    }),
    [pictureChart.labels]
  );

  const readyForRentOptions = useMemo(
    () => ({
      labels: readyForRentChart.labels,
      legend: { position: "top" as const },
    }),
    [readyForRentChart.labels]
  );

  return (
    <div>
      <div className="gap-4 w-full p-4">
        <Card>
          {loading ? (
            <Skeleton active />
          ) : err ? (
            <div className="text-red-500">{err}</div>
          ) : statusChart.series.length > 0 &&
            statusChart.labels.length > 0 ? (
              <Chart options={statusOptions} series={statusChart.series} type="donut" height={320} />

          ) : (
            <Empty description="No status data" />
          )}
        </Card>
      </div>

      <div className="gap-4 w-full p-4">
        <Card>
          {loading ? (
            <Skeleton active />
          ) : err ? (
            <div className="text-red-500">{err}</div>
          ) : pictureChart.series.length > 0 &&
            pictureChart.labels.length > 0 ? (
              <Chart options={pictureOptions} series={pictureChart.series} type="donut" height={320} />
          ) : (
            <Empty description="No picture data" />
          )}
        </Card>
      </div>

      <div className="gap-4 w-full p-4">
        <Card>
          {loading ? (
            <Skeleton active />
          ) : err ? (
            <div className="text-red-500">{err}</div>
          ) : readyForRentChart.series.length > 0 &&
            readyForRentChart.labels.length > 0 ? (
              <Chart options={readyForRentOptions} series={readyForRentChart.series} type="donut" height={320} />
          ) : (
            <Empty description="No ready for rent data" />
          )}
        </Card>
      </div>
    </div>
  );
}
