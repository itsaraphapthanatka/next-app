"use client";

import React from "react";
import { Pie } from "@ant-design/plots";
import { Card } from "antd";

interface Datum {
  type: string;
  value: number;
  percent: number;
}

export function SummaryDashboard() {
  const config = {
    data: [
      { type: "Have Picture", value: 27, percent: 46.3 },
      { type: "Not Have Picture", value: 30, percent: 53.7 },
    ],
    angleField: "percent",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: (datum: Datum) => `${datum.type} ${datum.percent}%`,
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "top",
        layout: "horizontal",
        align: "center",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Picture\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 20,
          fontStyle: "bold",
        },
      },
    ],
  };
  const config1 = {
    data: [
      { type: "Available", value: 27, percent: 27 },
      { type: "Contact เสียติดต่อไม่ได้", value: 25, percent: 25 },
      { type: "N/A", value: 12, percent: 12 },
      { type: "Pending to Available", value: 10, percent: 10 },
      { type: "Renovating", value: 5, percent: 5 },
    ],
    angleField: "percent",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: (datum: Datum) => `${datum.type} ${datum.percent}%`,
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "top",
        layout: "horizontal",
        align: "center",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Status\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 20,
          fontStyle: "bold",
        },
      },
    ],
  };
  const config2 = {
    data: [
      { type: "Ready for Rent", value: 27, percent: 20.9 },
      { type: "Not Ready for Rent", value: 30, percent: 79.1 },
    ],
    angleField: "percent",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: (datum: Datum) => `${datum.type} ${datum.percent}%`,
      style: {
        fontWeight: "bold", 
      },
    },
    legend: {
      color: {
        title: true,
        position: "top",
        layout: "horizontal",
        align: "center",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Ready fro Rent\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 20,
          fontStyle: "bold",
        },
      },
    ],
  };

  return (
    <div>
      <div className="gap-4 w-full p-4">
      <Card>
        <Pie {...config1} />
      </Card>
      </div>
      <div className="gap-4 w-full p-4">
      <Card>
        <Pie {...config} />
      </Card>
      </div>
      <div className="gap-4 w-full p-4">
        <Card>
          <Pie {...config2} />
        </Card>
      </div>
    </div>
  );
}
