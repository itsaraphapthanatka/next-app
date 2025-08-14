import { Form, Input } from "antd";
import { useEffect, useState } from "react"; 
import { getProperties } from "@/app/server_actions/property";

interface Property {
    id: number;
    address: string;
    unitCode: string;
}

export const RequestProp = ({ selectedIds, setEnqNo, enqNo }: { selectedIds: number[], setEnqNo: (enqNo: string) => void, enqNo: string }) => {

    const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

    useEffect(() => {
        console.log("selectedIds", selectedIds);
    }, [selectedIds]);

    useEffect(() => {
        getProperties({
            page: { current: 0, size: 0 },
            sortBy: "LastedUpdate",
            orderBy: "DESC",
            assignReportSortBy: "Duration"
        }).then((data) => {
            
            const selectedProps = (data.resultLists || []).filter((item: Property) =>
                selectedIds.includes(item.id)
            );
            setSelectedProperties(selectedProps);
        });
    }, [selectedIds]);
    

    return (
        <Form>  
            <Form.Item name="enqNo" label="Enq.No">
                <Input value={enqNo} onChange={(e) => setEnqNo(e.target.value)} />  
            </Form.Item>

            <Form.Item label="Selected Properties">
                 [{selectedProperties.map((item) => item.address && item.address.trim() !=="" ? item.address : item.unitCode).join(", ")}]
            </Form.Item>
        </Form>
    );
}