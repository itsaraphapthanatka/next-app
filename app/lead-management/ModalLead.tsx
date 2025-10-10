import { Button, Modal,Tabs } from "antd";
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
      children: <SaleTab token={token} />,
    },
  ];

  const handleSave = () => {
    console.log("save");
  };

  return (
    <Modal
      title="Lead Detail"
      open={isModalOpen} 
      onCancel={() => setIsModalOpen(false)}
      width={1000}
      style={{ top: 20 }}
      styles={{
        header: {
          padding: '10px',
          borderBottom: '1px solid #f0f0f0',
        },
        body: {
          padding: '10px',
        },
      }}
      footer={
        <div className="grid grid-cols-1 gap-1 w-full" style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
          <Button color="orange" size="large" variant="solid" onClick={handleSave}>Save</Button>
          <Button color="default" size="large" variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </div>
      }
    >
      <Tabs  
        items={items} 
        defaultActiveKey={"1"}
      />
    </Modal>
  );
};

