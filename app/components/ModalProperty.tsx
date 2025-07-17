import { Modal } from "antd";

export const ModalProperty = ({ text, isModalOpen, setIsModalOpen }: { text: string, isModalOpen: boolean, setIsModalOpen: (open: boolean) => void }) => {
  return (
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
      <p>{text}</p>
    </Modal>
  );
};
