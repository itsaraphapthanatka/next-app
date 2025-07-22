"use client";

import { useEffect, useState } from "react";
import { Card, Button, Select} from "antd";

export const RequestSearchFrom = () => {
    const [status, setStatus] = useState<string>("");

    const handleSearch = () => {
        console.log(status);
    };

  return (
    <>
    <Card className={`p-6 w-full space-y-4`}>
      <div className="space-y-4">
        <div className="flex gap-3">
            <Select 
                size="large"
                options={[
                    {
                        label: "Show All Action",
                        value: "-1",
                    },{
                        label: "Wait for Approve",
                        value: "0",
                    },{
                        label: "Approve",
                        value: "1"
                    },{
                        label: "Reject",
                        value: "2",
                    },{
                        label: "Close",
                        value: "4"
                    }
                ]}
                 defaultValue="-1"
                className="w-full"
                onChange={(e) => setStatus(e)}
            />
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
