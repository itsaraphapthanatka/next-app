import { Form, Input, Select } from "antd";

import { FormInstance } from "antd/es/form";

export const ModalFilter = ({form, moduleType}: {form: FormInstance, moduleType: string}) => {
    return (
        <Form
            form={form}
            layout="vertical"
            name="propertyFilter"
          
          >
          <div className="gap-3 w-full">
            <Form.Item
              label="Project"
              name="projectNameFilter"
              style={{ marginBottom: "10px" }}
            >
              <Input placeholder="Project Name" size="large" />
            </Form.Item>
          </div>
          <div className="gap-3 w-full">
            <Form.Item
              label="Unit Type"
              name="addressUnitFilter"
              style={{ marginBottom: "10px" }}
            >
              <Input placeholder="Unit Type" size="large" />
            </Form.Item>
          </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Size"
                name="minSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Size" size="large" />
              </Form.Item>
              <Form.Item
                label="Max. Size"
                name="maxSize"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Size" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Bed Room"
                name="bedRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bed Room" size="large" />
              </Form.Item>
              <Form.Item
                label="Bath Room"
                name="bathRoom"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Bath Room" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate On  Web"
                name="minRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate On Web" size="large"/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate On Web"
                name="maxRentalRateOnWeb"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate On Web" size="large"/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Rental Rate Per SQM"
                name="minRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Rental Rate Per SQM"
                name="maxRentalRatePerSQM"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Rental Rate Per SQM" size="large" value={0}/>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">  
              <Form.Item
                label="Min. Floor"
                name="minFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Min. Floor" size="large" value={0}/>
              </Form.Item>
              <Form.Item
                label="Max. Floor"
                name="maxFloor"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Max. Floor" size="large" />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Status"
                name="propertyStatus"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Property Status" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Have Picture"
                name="havePicture"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Show on Web"
                name="showOnWeb"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Hot Deal"
                name="hotDeal"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="For Rent/Sale Status"
                name="forRentSaleStatus"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Foreigner Owner"
                name="foreignerOwner"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Mass Transit"
                name="massTransit"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Mass Transit" size="large" disabled />
              </Form.Item>
            </div>
            <div className="gap-3 flex w-full">
              <Form.Item
                label="Start Distance (Meter)"
                name="startDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Start Distance (Meter)" size="large" />
              </Form.Item>
              <Form.Item
                label="To Distance (Meter)"
                name="toDistance"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="To Distance (Meter)" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Fix Parking"
                name="fixParking"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Duplex Loft"
                name="duplexLoft"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex gap-3 w-full">
              <Form.Item
                label="Pet Friendly"
                name="petFriendly"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Private Lift"
                name="privateLift"
                className="w-full"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Penthouse"
                name="penthouse"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Show All Status" size="large">
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Property Type"
                name="propertyType"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Property Type" size="large" disabled />
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="VIP Status"
                name="vipStatus"
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="VIP Status" size="large" disabled />
              </Form.Item>
            </div>
            {moduleType === "assign" && (
                <>
            <div className="gap-3 w-full">
              <Form.Item
                label="Reveal Status"
                name="revealStatus"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Reveal Status" size="large">
                  <Select.Option value="0">Show all Reveal Status</Select.Option>
                  <Select.Option value="1">Wait For Reveal</Select.Option>
                  <Select.Option value="2">Revealing</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="gap-3 w-full">
              <Form.Item
                label="Assign From"
                name="assignFrom"
                style={{ marginBottom: "10px" }}
              >
                <Select placeholder="Assign From" size="large">
                  <Select.Option value="0">Show all assigner</Select.Option>
                  <Select.Option value="1">Preechakorn Tanngam</Select.Option>
                  <Select.Option value="2">Suthinop Pannapayuk</Select.Option>
                  <Select.Option value="3">Karn Assawaniwest</Select.Option>
                </Select>
              </Form.Item>
            </div>
            </>
            )}
        </Form>
    )
}