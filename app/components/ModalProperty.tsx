import { FormProperty } from "./FormProperty";
import { Button, Modal, Tabs } from "antd";

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
}

export const ModalProperty = ({
  text,
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
}: ModalPropertyProps) => {
  console.log("selectedProperty in modal", selectedProperty);
  const items = [
    {
      key: '1',
      label: 'Property',
      children: <FormProperty selectedProperty={selectedProperty} />,
    },
    {
      key: '2',
      label: 'Rental',
      children: <p>Content of Tab Pane 2</p>,
    },
    {
      key: '3',
      label: 'Selling',
      children: <p>Content of Tab Pane 3</p>,
    },
    {
      key: '4',
      label: 'Other',
      children: <p>Content of Tab Pane 4</p>,
    },
    {
      key: '5',
      label: 'Key Holder',
      children: <p>Content of Tab Pane 5</p>,
    },
    {
      key: '6',
      label: 'Picture',
      children: <p>Content of Tab Pane 6</p>,
    },
    {
      key: '7',
      label: 'Facility',
      children: <p>Content of Tab Pane 7</p>,
    },
    {
      key: '8',
      label: 'Follow up',
      children: <p>Content of Tab Pane 8</p>,
    },
    {
      key: '9',
      label: 'Data Edit',
      children: <p>Content of Tab Pane 9</p>,
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
