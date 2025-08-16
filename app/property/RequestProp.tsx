import { Form, Input } from "antd";
import { useEffect, useState } from "react"; 
import { getPropertyById } from "@/app/server_actions/property";

interface Property {
    id: number;
    addressNo: string;
    unitCode: string;
}

export const RequestProp = ({ selectedIds, setEnqNo, enqNo, token }: { selectedIds: number[], setEnqNo: (enqNo: string) => void, enqNo: string, token: string }) => {

    const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
    useEffect(() => {
        if (selectedIds.length > 0 && token !== "") {
            Promise.all(selectedIds.map(id => getPropertyById(id, token)))
                .then((results) => {
                    const properties = results.map(data => data.propertyDetail);
                    setSelectedProperties(properties);
                });
        }
    }, [selectedIds, token]);
    

    return (
        <Form>  
            <Form.Item name="enqNo" label="Enq.No">
                <Input value={enqNo} onChange={(e) => setEnqNo(e.target.value)} />  
            </Form.Item>

           
            <div>
                <div className="text-sm">Selected Properties :</div>
                {selectedProperties?.map((item, index) => (
                <span key={index}>
                    {item.addressNo && item.addressNo.trim() !== ""
                    ? item.addressNo
                    : <span className="text-orange-500">{item.unitCode}</span>
                    }
                    {index < selectedProperties?.length - 1 && ", "}
                </span>
                ))}
            </div>
        </Form>
    );
}