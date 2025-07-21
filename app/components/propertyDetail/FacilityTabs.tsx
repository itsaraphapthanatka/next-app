import { Form, Checkbox, Col, Row } from "antd";

export const FacilityTabs = ({  token }: { token: string }) => {
    console.log("token in FacilityTabs", token);


    return (
        <Form>
            <Row>
                <Col span={12}>
                    <Form.Item name="washingMachine" >
                        <Checkbox>Washing Machine</Checkbox>
                        <i className="icofont-washing-machine icofont-2x" aria-label="washing machine" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="refrigerator">
                        <Checkbox>Refrigerator</Checkbox>
                        <i className="icofont-refrigerator icofont-2x" aria-label="refrigerator" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="bathtub" >
                        <Checkbox>Bathtub</Checkbox>
                        <i className="icofont-bathtub icofont-2x" aria-label="bathtub" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="tv" >
                        <Checkbox>TV</Checkbox>
                        <i className="icofont-monitor icofont-2x" aria-label="tv" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="airCondition" >
                        <Checkbox>Air Condition</Checkbox>
                        <i className="icofont-snow-temp icofont-2x" aria-label="air conditioner" />
                    </Form.Item>
                </Col>
                
                <Col span={12}>
                    <Form.Item name="waterHeater" >
                        <Checkbox>Water Heater</Checkbox>
                        <i className="icofont-water-drop icofont-2x" aria-label="water heater" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="security" >
                        <Checkbox>24hr. security</Checkbox>
                        <i className="icofont-police icofont-2x" aria-label="24hr. security" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="carPark" >
                        <Checkbox>Car Park</Checkbox>
                        <i className="icofont-car-alt-4 icofont-2x" aria-label="car park" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="petFriendly" >
                        <Checkbox>Pet Friendly</Checkbox>
                        <i className="icofont-cat-dog icofont-2x" aria-label="pet friendly" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="patio" >
                        <Checkbox>Patio</Checkbox>
                        <i className="icofont-beach-bed icofont-2x" aria-label="patio" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="wifi" >
                        <Checkbox>Wifi</Checkbox>
                        <i className="icofont-wifi icofont-2x" aria-label="wifi" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="cableTV" >
                        <Checkbox>Cable TV</Checkbox>
                        <i className="icofont-wifi-router icofont-2x" aria-label="cable tv" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="hillView" >
                        <Checkbox>Hill View</Checkbox>
                        <i className="icofont-hill icofont-2x" aria-label="hill view" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="seaView" >
                        <Checkbox>Sea View</Checkbox>
                        <i className="icofont-island-alt icofont-2x" aria-label="sea view" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}