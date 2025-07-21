import { FormProperty } from "./propertyDetail/FormProperty";
import { RentalTabs } from "./propertyDetail/RentalTabs";
import { SallingTabs } from "./propertyDetail/SallingTabs";
import { OtherTabs } from "./propertyDetail/OtherTabs";
import { KeyHolderTabs } from "./propertyDetail/KeyHolderTabs";
import { PictureTabs } from "./propertyDetail/PictureTabs";
import { Button, Modal, Tabs } from "antd";
import { FacilityTabs } from "./propertyDetail/FacilityTabs";
import { FollowupTabs } from "./propertyDetail/FollowupTabs";
import { DataEditProperty } from "./propertyDetail/DataEditProperty";

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

interface ModalPropertyProps {
  text: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProperty: SelectedProperty;
  token: string;
}

export const ModalProperty = ({
  text,
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
  token,
}: ModalPropertyProps) => {
  console.log("selectedProperty in modal", selectedProperty);
  const items = [
    {
      key: '1',
      label: 'Property',
      children: <FormProperty selectedProperty={selectedProperty} token={token} />,
    },
    {
      key: '2',
      label: 'Rental',
      children: <RentalTabs selectedProperty={selectedProperty} />,
    },
    {
      key: '3',
      label: 'Selling',
      children: <SallingTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '4',
      label: 'Other',
      children: <OtherTabs selectedProperty={selectedProperty} token={token}/>,
    },
    {
      key: '5',
      label: 'Key Holder',
      children: <KeyHolderTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '6',
      label: 'Picture',
      children: <PictureTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '7',
      label: 'Facility',
      children: <FacilityTabs token={token}/>,
    },
    {
      key: '8',
      label: 'Follow up',
      children: <FollowupTabs token={token}/>,
    },
    {
      key: '9',
      label: 'Data Edit',
      children: <DataEditProperty token={token}/>,
    },
  ];
  return (
    <Modal 
      title="Property Detail" 
      open={isModalOpen} 
      onCancel={() => setIsModalOpen(false)}
      width={1000}
      style={{ top: 20 }}
      styles={{
        header: {
          padding: '10px',
          borderBottom: '1px solid #f0f0f0', // ✅ เส้นใต้ title
        },
        body: {
          padding: '10px',
        },
      }}
      footer={
        <div className="flex justify-end gap-1 w-full" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
          <Button color="green" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Not have Original File</Button>
          <Button color="default" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Suggest</Button>
          <Button color="default" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Get Link</Button>
          <Button color="default" variant="outlined" size="small" onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      }
    >
      <p>{text}</p>
      <Tabs 
        items={items} 
        defaultActiveKey="1"
      />
    </Modal>
  );
};
