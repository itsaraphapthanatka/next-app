"use client";

import { useEffect, useState } from "react";
import { Card, Button, Select} from "antd";
import { getSaleRequestStatuses } from "../server_actions/salerequest-statuses";

type SaleRequestStatus = {
    id: number;
    name: string;
}

export const RequestSearchFrom = ({token}: {token: string}) => {
    const [status, setStatus] = useState("");
    const [statusOptions, setStatusOptions] = useState<SaleRequestStatus[]>([]);
    console.log("RequestSearchFrom token",token);
    const handleSearch = () => {
        const statusValue = status === "" ? 1 : status;
        const event = new CustomEvent('requestTableReload', {
            detail: { status: statusValue }
        });
        window.dispatchEvent(event);
    };
    
    useEffect(() => {
        const fetchStatuses = async () => {
        const statuses = await getSaleRequestStatuses(token);
        setStatusOptions(statuses);
        };
        fetchStatuses();
        }, [token]);

  return (
    <>
    <Card className={`p-6 w-full space-y-4`}>
      <div className="space-y-4">
        <div className="flex gap-3">
            <Select 
                size="large"
                className="w-full"
                onChange={(e) => setStatus(e.toString())}
                defaultValue={1}
            >
                {statusOptions.map((status) => (
                    <Select.Option key={status.id} value={status.id}>{status.name}</Select.Option>
                ))}
            </Select>
        </div>
        <div className="flex gap-3">
           <Button 
                block 
                color="green" 
                variant="solid" 
                size="large"
                onClick={handleSearch}
            >Search</Button>
        </div>
      </div>
    </Card>
    </>
  );
};
