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

           
            <div>
                <div className="text-sm">Selected Properties :</div>
                {selectedProperties.map((item, index) => (
                <span key={item.id}>
                    {item.address && item.address.trim() !== ""
                    ? item.address
                    : <span className="text-orange-500">{item.unitCode}</span>
                    }
                    {index < selectedProperties.length - 1 && ", "}
                </span>
                ))}
            </div>
        </Form>
    );
}