"use client";

import { useState } from "react";
import { Card, Input, Button } from "antd";

interface PropertySearchFormProps {
  className?: string;
}

export const PropertySearchForm = ({ className = "" }: PropertySearchFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [requestCount] = useState(0);
  const maxRequests = 20;

  const handleSearch = () => {
    console.log("Search clicked", { projectName });
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleRequestProp = () => {
    console.log("Request Property clicked");
  };

  return (
    <Card >
      <div className="space-y-4">
        <div className="flex gap-3">
            <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-1/2"
        />
        </div>
        <div className="flex gap-3">
            <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-1/2"
        />
        </div>
        <div className="flex gap-3">
          <Button
            variant="solid"
            onClick={handleSearch}
            className="flex-1"
          >
            Search
          </Button>
          <Button
            variant="solid"
            onClick={handleFilter}
            className="flex-1"
          >
            Filter
          </Button>
        </div>
        <div className="flex gap-3">
            <Button
            variant="solid"
            onClick={handleRequestProp}
            className="w-full"
            >
            Request Prop. ({requestCount}/{maxRequests})
            </Button>
        </div>
      </div>
    </Card>
  );
};