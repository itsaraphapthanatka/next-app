import { Form, Input, Select, Checkbox, Col, Row, Table, TableProps  } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getPropertyById } from "@/app/server_actions/property";
import { useEffect, useState } from "react";

type SelectedProperty = {
     propertyId?: number;
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
    contractDurationID: number;
    duration: string;
    durationValue: string;
  };

  type Rental = {
    rentalPrice: number;
    rentalPerSQM: number;
    rentalRateBottom: number;
    rentalCommission: number;
    contractDurations: DataType[];
  };

  const colums: TableProps<DataType>['columns'] = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) =>
      {
        return text ? text : record.contractDurationID ? index + 1 : index + 1;
      }
    },
    {
      title: 'Duration',
      dataIndex: 'name',
      key: 'name',
    },
    {
        dataIndex: 'amount',
        key: 'amount',
        render: (text: string) => {
            return <Input size="small" value={text} />
        }
    },
  ];    


export const RentalTabs = ({ selectedProperty, token }: { selectedProperty: SelectedProperty, token: string }) => {
    console.log("RentalTabs", selectedProperty)
    const [form] = Form.useForm();
    const [propertyRental, setPropertyRental] = useState<Rental | null>(null);
    useEffect(() => {
        getPropertyById(selectedProperty.propertyId as number, token).then((response) => {
            console.log("response rental", response.rental);
            const detail = response.rental;
            setPropertyRental(detail);
            form.setFieldsValue({
                rentalPrice: detail.rentalPrice != null ? Number(detail.rentalPrice).toLocaleString() : "",
                rentalPerSQM: detail.rentalPerSQM != null ? Number(detail.rentalPerSQM).toLocaleString() : "",
                rentalRateBottom: detail.rentalRateBottom != null ? Number(detail.rentalRateBottom).toLocaleString() : "",
                rentalCommission: detail.rentalCommission != null ? Number(detail.rentalCommission).toLocaleString() : "",
                contractDurations: detail.contractDurations,
            });
        });
    }, [selectedProperty.propertyId, token]);
    
    return (
        <>
        <Form form={form}
            layout="vertical"
            name="tabsRentalDetail">
                <Form.Item name="rentalPrice" label="Rental rate on Web" className="text-[12px]" style={{ marginBottom: "10px" }}>
                    <Input size="large" readOnly />
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
                <Form.Item name="rentalPriceButton" label="Rental rate bottom" className="text-[12px]"  style={{ marginBottom: "10px" }}>
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
                <Form.Item name="contractDurations" label="Contract Duration" className="text-[12px]"  style={{ marginBottom: "10px" }}>
                    <Table 
                        columns={colums} 
                        dataSource={propertyRental?.contractDurations} 
                        pagination={false} 
                        rowKey={record => record.contractDurationID}
                    />
                </Form.Item>
        </Form>
        </>
    )
}