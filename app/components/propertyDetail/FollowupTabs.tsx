import { Table, Modal, Form, Col, Row, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getPropertyFollowup, savePropertyFollowup } from "@/app/server_actions/property";  
import { App as AntdApp } from "antd";
type SelectedProperty = {
     propertyId?: number;
    saleRequestId?: number;
    saleRequestItemId?: number;
    toSalePropertyId?: number;
  };
  type Followup = {
    id: number;
    sourceId: number;
    followUpType: string;
    date: string;
    followBy: string;
    remark: string;
  };
export const FollowupTabs = ({ token, modalType, selectedProperty }: { token: string, modalType: string, selectedProperty: SelectedProperty  }) => {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState<string>("");
  const [propertyFollowup, setPropertyFollowup] = useState<Followup[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPropertyFollowup(selectedProperty.propertyId as number, token).then((response) => {
      setPropertyFollowup(response);
      setLoading(false);
    });
  }, [selectedProperty.propertyId, token]);
  const openCommentDialog = (index: string) => {
    const remarkText = propertyFollowup[parseInt(index)]?.remark || "";
    setSelectedRemark(remarkText);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRemark("");
    
  };
  const handleSave = async () => {
    const followUp = form.getFieldValue("followUp");
    const closeJob = modalType === "request" ? form.getFieldValue("closeJob") : false;
    const followupData = {
      id: selectedProperty.propertyId as number,
      remark: followUp,
      closeJob: closeJob ? true : false,
      followUpType: 0,
      sourceId: selectedProperty.propertyId as number,
      saleRequestItemId: selectedProperty.saleRequestItemId as number,
      toSalePropertyId: selectedProperty.toSalePropertyId as number,
    };
    console.log("followUp", followUp);
    if(followUp === "" || followUp === null || followUp === undefined){
        message.error("Please enter a follow-up");
        setLoading(false);
    }else{
      const res = await savePropertyFollowup(followupData, token);
      if (res.status === 200) {
        message.success("Follow-up saved successfully");
        setLoading(true);
        getPropertyFollowup(selectedProperty.propertyId as number, token).then((data) => {
          setPropertyFollowup(data);
          form.resetFields();
          setLoading(false);
          if(modalType === "request"){
            const event = new CustomEvent('requestTableReload', { detail: { status: 1 } });
            window.dispatchEvent(event);
          }else{
            const event = new CustomEvent('propertyTableSearch', { detail: { projectName: "", addressUnit: "" } });
            window.dispatchEvent(event);
          }
        });
      } else {
        message.error("Failed to save follow-up");
      }
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: Followup, index: number) => {
        return text ? text : record.id ? index + 1 : index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Time",
      dataIndex: "date",
      
      render: (text: string) => {
        const date = new Date(text);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },  
    },
    {
      title: "Follow by",
      dataIndex: "followBy",
      key: "followBy",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (text: string, record: Followup, index: number) => ( 
        record.remark.substring(0, 8) === "Headline" || record.remark.substring(0, 8) === "Overview" ?   (
          <a onClick={() => openCommentDialog(index.toString())}>
            <div style={{ whiteSpace: "pre-line" }}>{text.substring(0, 8)} Change...</div>
          </a>
          ) : (
          <div style={{ whiteSpace: "pre-line" }}>{text}</div>
        )
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        scroll={{ x: 1000}} 
        dataSource={propertyFollowup} 
        columns={columns} 
        pagination={false} 
        style={{ marginBottom: "10px" }}
        rowKey={(record) => record.id + record.date} 
        
      />
      <Form layout="vertical" name="followupForm" form={form}>
        <Form.Item name="followUp" label="New Follow Up" style={{ marginBottom: "10px" }}>
          <TextArea rows={6} />
        </Form.Item>

      <Form.Item name="closeJob" style={{ marginBottom: "10px" }}>
          <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                  <Col span={12}>
                      <Checkbox value="close">Close Job</Checkbox>
                  </Col>
              </Row>
          </Checkbox.Group>
      </Form.Item>
      <div className="flex w-full mt-2">
          <Button block color="green" variant="solid" onClick={handleSave} loading={loading}>Save</Button>
      </div>
      </Form>
      <Modal
        title="Follow-up Detail"
        open={isModalOpen}
        onCancel={handleModalClose}
        cancelText="Cancel"
      >
        <TextArea 
          rows={10}
          value={selectedRemark}
        />
      </Modal>
    </div>
  );
};
