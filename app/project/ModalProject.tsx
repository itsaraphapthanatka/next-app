import { ProjectDetailTabs } from "../components/projectDetail/ProjectDetailTabs";
import { TowerTabs } from "../components/projectDetail/TowerTabs";
import { JuristicTabs } from "../components/projectDetail/JuristicTabs";
import { PictureTabs } from "../components/projectDetail/PictureTabs";
import { MassTransitTabs } from "../components/projectDetail/MasTransitTabs";
import { MonthlyAveragePriceTabs } from "../components/projectDetail/MonthlyAveragePriceTabs";
import { FollowupTabs } from "../components/projectDetail/FollowupTabs";
import { DataEditTabs } from "../components/projectDetail/DataEditTabs";    

import { Button, Modal, Tabs } from "antd";
import { getGetLink, getSuggestionLinks } from "@/app/server_actions/suggestion-links";
import { App } from "antd";
import { FacilityTabs } from "../components/projectDetail/FacilityTabs";

type SelectedProject = {
  id?: number;
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
  text: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProject: SelectedProject;
  token: string;
}

export const ModalProject = ({
  isModalOpen,
  setIsModalOpen,
  selectedProject,
  token,
}: ModalPropertyProps) => {
  const { message } = App.useApp();
  const items = [
    {
      key: '1',
      label: 'Project Detail',
      children: <ProjectDetailTabs selectedProject={selectedProject as SelectedProject} token={token} />,
    },
    {
      key: '2',
      label: 'Tower',
      children: <TowerTabs selectedProject={selectedProject} token={token}/>,
    },
    {
      key: '3',
      label: 'Juristic',
      children: <JuristicTabs selectedProject={selectedProject} token={token}/>,
    },
    {
      key: '4',
      label: 'Picture',
      children: <PictureTabs selectedProject={selectedProject} token={token}/>,
    },
    {
      key: '5',
      label: 'Facility',
      children: <FacilityTabs selectedProject={selectedProject} token={token} modalType="project"/>,
    },
    {
      key: '6',
      label: 'Mass Transit',
      children: <MassTransitTabs selectedProject={selectedProject} token={token}/>,
    },
    {
      key: '7',
      label: 'Monthly Average Price',
      children: <MonthlyAveragePriceTabs selectedProject={selectedProject} token={token} />,
    },
    {
      key: '8',
      label: 'Follow up',
      children: <FollowupTabs selectedProject={selectedProject} token={token}/>,
    },
    {
      key: '9',
      label: 'Data Edit',
    children: <DataEditTabs selectedProject={selectedProject} token={token}/>,
    },
   
  ].filter(Boolean) as { key: string; label: string; children: React.ReactNode }[];



  const handleGetSuggestionLink = async () => {
    try {
      const response = await getSuggestionLinks(selectedProject?.propertyId ?? 0, token);
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
    const response = await getGetLink(selectedProject?.propertyId ?? 0, token);
    if (response.status === 200) {
      const url = response.data;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      message.error("Get Link Failed");
    }
  }
  


  return (
    <div className="w-full h-full"> 
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
          <Button color="default" variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </div>
      }
    >
      {/* <p>{text}</p> */}
      <Tabs  
        items={items} 
        defaultActiveKey={"1"}
      />
    </Modal>
    </div>
  );
};
