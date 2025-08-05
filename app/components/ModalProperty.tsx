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
// import { App } from "antd";
import { useState } from "react";

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
}

export const ModalProperty = ({
  modalType,
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
  token,
}: ModalPropertyProps) => {
  // const { message } = App.useApp();
  const [downloadOriginalFiles, setDownloadOriginalFiles] = useState(false);
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
          label: 'Contract',
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
  console.log("selectedProperty", selectedProperty);


  // const handleDownloadOriginalFiles = async () => {
  //   console.log("selectedProperty.propertyId", selectedProperty.key);
  //   const response = await getDownloadOriginalFiles(selectedProperty.key as number, token);
  //   console.log(response);
  //   if (response.status === 200) {
  //     message.success("Download Original Files Success");
  //     setDownloadOriginalFiles(true);
  //   } else {
  //     message.error("Download Original Files Failed");
  //   }
  // }

  const handleDownloadOriginalFiles = async () => {
    try {
      const blob = await getDownloadOriginalFiles(selectedProperty.key as number, token);
      console.log("blob", blob);

      if (blob) {
        setDownloadOriginalFiles(true);
                    
      } else {
        setDownloadOriginalFiles(false);
      }
      // // สร้างลิงก์ดาวน์โหลด
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", `property-${selectedProperty.key}.zip`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Download failed:", err.message);
      }
    }
  };

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
              <Button color="green" variant="solid" size="small" onClick={() => handleDownloadOriginalFiles()}>{downloadOriginalFiles ? "Download Original File" : "Not have Original File"}</Button>
              {/* <Button color="green" variant="solid" size="small" onClick={() => handleDownloadOriginalFiles()}>{downloadOriginalFiles ? "Download Original File" : "Not have Original File"}</Button> */}
              <Button color="default" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Suggest</Button>
            </>
          )}
          <Button color="default" variant="solid" size="small" onClick={() => setIsModalOpen(false)}>Get Link</Button>
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
