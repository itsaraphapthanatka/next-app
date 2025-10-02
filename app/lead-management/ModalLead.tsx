import { Modal,Tabs } from "antd";
import LeadDetailTab from "../components/leadDetail/LeadDetailTab";
import SaleManagerTab from "../components/leadDetail/SaleManagerTab";
import SaleTab from "../components/leadDetail/SaleTab";

interface ModalLeadProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  selectedLead: SelectedLead;
  token: string;
}

type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

export const ModalLead = ({ isModalOpen, setIsModalOpen, selectedLead, token }: ModalLeadProps) => {
  const items = [
    {
      key: '1',
      label: 'Lead Detail',
      children: <LeadDetailTab selectedLead={selectedLead} token={token} />,
    },
    {
      key: '2',
      label: 'Sale Manager',
      children: <SaleManagerTab selectedLead={selectedLead} token={token} />,
    },
    {
      key: '3',
      label: 'Sale',
      children: <SaleTab selectedLead={selectedLead} token={token} />,
    },
  ];
  return (
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
      <Tabs  
        items={items} 
        defaultActiveKey={"1"}
      />
    </Modal>
  );
};

