import { Form, Input, Select, Checkbox, Col, Row, Table, TableProps  } from "antd";
import TextArea from "antd/es/input/TextArea";

type SelectedProperty = {
    rentPGColor?: string;
    rentPGText?: string;
    salePGColor?: string;
    salePGText?: string;
    vipStatusColor?: string;
    invid?: string;
    project?: string;
    vipStatus?: string;
  };

  type DataType = {
    no: number;
    duration: string;
    durationValue: string;
  };

  const colums: TableProps<DataType>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
        // title: 'Duration Value',
        dataIndex: 'durationValue',
        key: 'durationValue',
        render: (text: string) => {
            return <Input size="small" value={text} />
        }
    },
  ];    

  const data: DataType[] = [
    {
      no: 1,
      duration: 'Price for 1 Month',
      durationValue: '0',
    },
    {
        no: 2,
        duration: 'Price for 3 Month',
        durationValue: '0',
    },
    {
        no: 3,
        duration: 'Price for 6 Month',
        durationValue: '0',
    },
    

  ];

export const RentalTabs = ({ selectedProperty }: { selectedProperty: SelectedProperty }) => {
    console.log("RentalTabs", selectedProperty)
    const [form] = Form.useForm();
    return (
        <Form form={form}
            layout="vertical"
            name="tabsRentalDetail">
                <Form.Item name="rantalRateOnWeb" label="Rental rate on Web" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="rentalPerSQM" label="Rental per SQM" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                        readOnly
                        style={
                            {
                                backgroundColor: '#f0f0f0',
                            }
                        }
                    />
                </Form.Item>
                <Form.Item name="rentalRateBottom" label="Rental rate bottom" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="rentalCommission" label="Rental Commission" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <div className="gap-3 w-full">
                    <Form.Item
                    label="Minimum Rental Contract (Year)"
                    name="minimumRentalContract"
                    style={{ marginBottom: "10px" }}
                    >
                    <Select placeholder="Minimum Rental Contract (Year)" size="large">
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={6}>6</Select.Option>
                        <Select.Option value={12}>12</Select.Option>
                        <Select.Option value={24}>24</Select.Option>
                    </Select>
                    </Form.Item>
                </div>
                <Form.Item name="companyContact" style={{ marginBottom: "10px" }}>
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={12}>
                                <Checkbox value="">Company Contact</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="rentalCondition" label="Rental Condition" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <TextArea 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="commissionRemark" label="Commission Remark" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <TextArea 
                        size="large"
                    />
                </Form.Item>
                <Form.Item name="contractDuration" label="Contract Duration" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Table 
                        columns={colums} 
                        dataSource={data} 
                        pagination={false} 
                        rowKey={record => record.no || record.duration || record.durationValue || JSON.stringify(record)}
                    />
                </Form.Item>
        </Form>
    )
}