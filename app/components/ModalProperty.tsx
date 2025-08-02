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
import { ContactTabs } from "./propertyDetail/ContactTabs";

type SelectedProperty = {
  id?: number;
  key?: number;
  no?: number;
  project?: string;
  size?: number;
  bed?: number;
  bath?: number;
  rental?: number;
  selling?: number;
  status?: string;
  rentPGColor?: string;
  rentPGText?: string;
  salePGColor?: string;
  salePGText?: string;
  vipStatusColor?: string;
  invid?: string;
  vipStatus?: string;
  rentalPrice?: number;
  salePrice?: number;
};

interface ModalPropertyProps {
  modalType: string;
  text: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProperty: SelectedProperty;
  token: string;
}

export const ModalProperty = ({
  modalType,
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
      children: <FormProperty selectedProperty={selectedProperty as SelectedProperty} token={token} />,
    },
    selectedProperty.rental === 0 || selectedProperty.rental === null || selectedProperty.rentalPrice === 0 || selectedProperty.rentalPrice === null ? {
      key: '2',
      label: 'Rental',
      children: <RentalTabs selectedProperty={selectedProperty} />,
      disabled: true,
    } : {
      key: '2',
      label: 'Rental',
      children: <RentalTabs selectedProperty={selectedProperty} />,
    },
    selectedProperty.selling === 0 || selectedProperty.selling === null || selectedProperty.salePrice === 0 || selectedProperty.salePrice === null ? {
      key: '3',
      label: 'Selling',
      children: <SallingTabs selectedProperty={selectedProperty}/>,
      disabled: true,
    } : {
      key: '3',
      label: 'Selling',
      children: <SallingTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '4',
      label: 'Other',
      children: <OtherTabs selectedProperty={selectedProperty} token={token}/>,
    },
    modalType === "request"
      ? {
          key: '5',
          label: 'Contract',
          children: <ContactTabs />,
        }
      : undefined,
    {
      key: '6',
      label: 'Key Holder',
      children: <KeyHolderTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '7',
      label: 'Picture',
      children: <PictureTabs selectedProperty={selectedProperty}/>,
    },
    {
      key: '8',
      label: 'Facility',
      children: <FacilityTabs token={token}/>,
    },
    {
      key: '9',
      label: 'Follow up',
      children: <FollowupTabs token={token} modalType={modalType}/>,
    },
    {
      key: '10',
      label: 'Data Edit',
      children: <DataEditProperty token={token} modalType={modalType}/>,
    },
  ].filter(Boolean) as { key: string; label: string; children: React.ReactNode }[];
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
          {modalType === "property" && (
            <>
              <Button color="green" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Not have Original File</Button>
              <Button color="default" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Suggest</Button>
            </>
          )}
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
