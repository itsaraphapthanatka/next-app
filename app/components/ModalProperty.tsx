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
import { getDownloadOriginalFiles } from "@/app/server_actions/download-original-files";
import { getGetLink, getSuggestionLinks } from "@/app/server_actions/suggestion-links";
import { App } from "antd";
import { useEffect, useState } from "react";

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
  propertyId?: number;
};

interface ModalPropertyProps {
  modalType: string;
  text: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProperty: SelectedProperty;
  token: string;
  downloadOriginalFiles: Response | null;
}

export const ModalProperty = ({
  modalType,
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
  token,
  downloadOriginalFiles,
}: ModalPropertyProps) => {
  const { message } = App.useApp();
  const items = [
    {
      key: '1',
      label: 'Property',
      children: <FormProperty selectedProperty={selectedProperty as SelectedProperty} token={token} />,
    },
    selectedProperty.rental === 0 || selectedProperty.rental === null || selectedProperty.rentalPrice === 0 || selectedProperty.rentalPrice === null ? {
      key: '2',
      label: 'Rental',
      children: <RentalTabs selectedProperty={selectedProperty} token={token}/>,
      disabled: true,
    } : {
      key: '2',
      label: 'Rental',
      children: <RentalTabs selectedProperty={selectedProperty} token={token}/>,
    },
    selectedProperty.selling === 0 || selectedProperty.selling === null || selectedProperty.salePrice === 0 || selectedProperty.salePrice === null ? {
      key: '3',
      label: 'Selling',
      children: <SallingTabs selectedProperty={selectedProperty} token={token}/>,
      disabled: true,
    } : {
      key: '3',
      label: 'Selling',
      children: <SallingTabs selectedProperty={selectedProperty} token={token}/>,
    },
    {
      key: '4',
      label: 'Other',
      children: <OtherTabs selectedProperty={selectedProperty} token={token}/>,
    },
    modalType === "request"
      ? {
          key: '5',
          label: 'Contact',
          children: <ContactTabs token={token} selectedProperty={selectedProperty} />,
        }
      : undefined,
    {
      key: '6',
      label: 'Key Holder',
      children: <KeyHolderTabs selectedProperty={selectedProperty} token={token}/>,
    },
    {
      key: '7',
      label: 'Picture',
      children: <PictureTabs selectedProperty={selectedProperty} token={token}/>,
    },
    modalType === "property" ? {
      key: '8',
      label: 'Facility',
      children: <FacilityTabs token={token} selectedProperty={selectedProperty} modalType={modalType} />,
    } : {
      key: '8',
      label: 'Facility',
      children: <FacilityTabs token={token} selectedProperty={selectedProperty} modalType={"project"} />,
    },
    {
      key: '9',
      label: 'Follow up',
      children: <FollowupTabs token={token} modalType={modalType} selectedProperty={selectedProperty} />,
    },
    {
      key: '10',
      label: 'Data Edit',
      children: <DataEditProperty token={token} modalType={modalType} selectedProperty={selectedProperty}/>,
    },
  ].filter(Boolean) as { key: string; label: string; children: React.ReactNode }[];

  const handleDownloadOriginalFiles = async () => {
    const url = downloadOriginalFiles?.url;
    const link = document.createElement("a");
    link.href = url ?? "";
    link.setAttribute("download", "original.zip");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url ?? "");
  }

  const handleGetSuggestionLink = async () => {
    try {
      const response = await getSuggestionLinks(selectedProperty?.key ?? 0, token);
      if (response.status === 200) {
        const url = response.data;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        message.error("No suggestion link available");
      }
    } catch (error) {
      console.error("Failed to get suggestion link:", error);
      message.error("Failed to get suggestion link");
    }
  };
  
  const handleGetLink = async () => {
    const response = await getGetLink(selectedProperty?.key ?? 0, token);
    if (response.status === 200) {
      const url = response.data;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      message.error("Get Link Failed");
    }
  }
  


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
        <div className="grid grid-cols-1 gap-1 w-full" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
          {modalType === "property" && (
            <>
              {downloadOriginalFiles?.status === 200 && (
                <Button color="green" variant="solid" size="small" 
                onClick={() => {
                  handleDownloadOriginalFiles();
                }}
                >
                  {downloadOriginalFiles?.status === 200 ? "Download Original File" : "Not Have Original File"}
                </Button>
              )}
              <Button color="default" variant="solid" size="small" onClick={handleGetSuggestionLink}>Suggest</Button>
            </>
          )}
          <Button color="default" variant="solid" size="small" onClick={handleGetLink}>Get Link</Button>
          <Button color="default" variant="outlined" size="small" onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      }
    >
      {/* <p>{text}</p> */}
      <Tabs 
        items={items} 
        defaultActiveKey="1"
      />
    </Modal>
  );
};
