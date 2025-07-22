import { Table, Modal, Form, Col, Row, Checkbox } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

export const FollowupTabs = ({ token, modalType }: { token: string, modalType: string }) => {
  console.log("token in FollowupTabs", token);
  const [form] = Form.useForm();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedRemark, setSelectedRemark] = useState<string>("");

  const openCommentDialog = (key: string) => {
    const remarkText = "Headline --> Condo For Rent Pathumwan Resort Good Location BTS Phaya Thai 200 m.\nOverview --> Condo For Rent Pathumwan Resort Good Location BTS Phaya Thai 200 m.\n- 2 Beds 2 Baths\n- 60 sq.m.\n- City view\n- Fully furnished with Electric stove, Hood\n- Close to BTS Phaya Thai 200 m. & Airport Link Phaya Thai 200 m.\n- Close to King Power Rangnam, Siam Discovery, Siam Center, Siam Paragon, Bumrungrad Hospital, Mater Dei School, Triam Udom Suksa School\n\n** View the property via live video. Just let us know and we will set up a live video for you.\n\n#Ready to move in\n#Condo For Rent in Bangkok"
    setSelectedKey(key);
    setSelectedRemark(remarkText);
    setIsModalOpen(true);
    console.log("selectedKey", selectedKey);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedKey(null);
    setSelectedRemark("");
  };

  const dataSource = [
    {
      key: "1",
      no: 1,
      date: "21-Jul-2025",
      time: "10:00",
      followBy: "natnaree@serve.co.th",
      remark: "Rental Rate on Web 36 --> 36,000\nRental per SQM 0 --> 600",
    },
    {
      key: "2",
      no: 2,
      date: "21-Jul-2025",
      time: "11:00",
      followBy: "tidarat@serve.co.th",
      remark: (
        <a onClick={() => openCommentDialog("2")}>
          Headline Change...
        </a>
      ),
    },
    {
      key: "3",
      no: 3,
      date: "21-Jul-2025",
      time: "12:00",
      followBy: "tidarat@serve.co.th",
      remark:
        "Floor 1 --> 10\nFlow alias name --> 10\nSizes 40 --> 60\nBedroom 1 --> 2\nBathroom 1 --> 2\nDecoration N/A --> Fully Furnished - ห้องตกแต่ง พร้อมเข้าอยู่",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
      ),
    },
  ];

  return (
    <div>
      <Table scroll={{ x: 1000}} dataSource={dataSource} columns={columns} pagination={false} style={{ marginBottom: "10px" }}/>
      <Form layout="vertical" name="followupForm" form={form}>
        <Form.Item name="followUp" label="New Follow Up" style={{ marginBottom: "10px" }}>
          <TextArea rows={6} />
        </Form.Item>

      {modalType === "request" && (
      <Form.Item name="closeJob" style={{ marginBottom: "10px" }}>
          <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                  <Col span={12}>
                      <Checkbox value="close">Close Job</Checkbox>
                  </Col>
              </Row>
          </Checkbox.Group>
      </Form.Item>
      )}
      </Form>
      <Modal
        title="Follow-up Detail"
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleModalClose}
        okText="OK"
        cancelText="Cancel"
      >
        {/* <p>{selectedRemark}</p> */}
        <TextArea disabled
          rows={6}
          value={selectedRemark}
          onChange={(e) => setSelectedRemark(e.target.value)}
        />
      </Modal>
    </div>
  );
};
