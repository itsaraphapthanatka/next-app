import { Form, Input } from "antd";
import { useEffect } from "react"; 

    export const RequestProp = ({ selectedIds, setEnqNo, enqNo }: { selectedIds: number[], setEnqNo: (enqNo: string) => void, enqNo: string }) => {

    useEffect(() => {
        console.log("selectedIds", selectedIds);
    }, [selectedIds]);

    return (
        <Form>  
            <Form.Item name="enqNo" label="Enq.No">
                <Input value={enqNo} onChange={(e) => setEnqNo(e.target.value)} />  
            </Form.Item>

            <Form.Item label="Selected Properties">
                <div hidden  className="text-sm">{selectedIds.join(", ") || "No selection"}</div>
            </Form.Item>
        </Form>
    );
}