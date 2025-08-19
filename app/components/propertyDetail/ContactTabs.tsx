import { Button, Empty, Table } from "antd";
import { getContacts } from "@/app/server_actions/contacts";
import { useState, useEffect } from "react";
import { PhoneCall, Smile, Trash } from "lucide-react";
import { getRevealStatus, updateRevealStatus } from "@/app/server_actions/property";

interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  telephone: string;
  email: string;
  lineId: string;
  whatsAPP: string;
  weCHAT: string;
  contactRemark: string;
  callOut: string;
  owner: string;
  unlink: string;
}

type SelectedProperty = {
  propertyId?: number;
};

export const ContactTabs = ({
  token,
  selectedProperty,
  modalType,
}: {
  token: string;
  selectedProperty: SelectedProperty;
  modalType: string;
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [loadingReveal, setLoadingReveal] = useState<boolean>(false);

  // ✅ Reset contacts + revealed เมื่อ selectedProperty.propertyId เปลี่ยน
  useEffect(() => {
    const fetchContacts = async () => {
        if (modalType === "request") {
            getContactsData();
        } else {
            const data = await getRevealStatus(token, selectedProperty.propertyId as number);
            console.log("data in ContactTabs getRevealStatus", data);
            if (data === "WaitForReveal") {
              console.log("data in ContactTabs WairForReveal", data);
                setRevealed(false);
                setContacts([]);
            } else {
              console.log("data in ContactTabs else", data);
                getContactsData();
            }
        }
    };
    fetchContacts();
  }, [selectedProperty.propertyId, modalType]);

  const getContactsData = async () => {
    const data = await getContacts(token, selectedProperty.propertyId as number);
    setContacts(data ?? []);
  }

  const handleToggle = async () => {
    setLoadingReveal(true);
    const data = await getContacts(token, selectedProperty.propertyId as number);
    await updateRevealStatus(token, selectedProperty.propertyId as number);     
    setContacts(data ?? []);
    setRevealed(true);
    setLoadingReveal(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      width: 150,
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      width: 150,
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      width: 150,
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "LineID",
      dataIndex: "lineId",
      key: "lineId",
      width: 150,
    },
    {
      title: "WhatsAPP",
      dataIndex: "whatsAPP",
      key: "whatsAPP",
      width: 150,
    },
    {
      title: "WeCHAT",
      dataIndex: "weCHAT",
      key: "weCHAT",
      width: 150,
    },
    {
      title: "Contact Remark",
      dataIndex: "contactRemark",
      key: "contactRemark",
      width: 200,
    },
    {
      title: "Call Out",
      dataIndex: "callOut",
      key: "callOut",
      width: 100,
      render: (record: Contact) => (
        <div className="text-center">
          <PhoneCall
            size={16}
            color="green"
            onClick={() => {
              window.open(`tel:${record.telephone}`, "_blank");
            }}
          />
        </div>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      width: 100,
      render: (text: string, record: Contact) => (
        <div className="text-center">
          {record.owner ? <Smile size={16} color="green" /> : null}
        </div>
      ),
    },
    {
      title: "Unlink",
      dataIndex: "unlink",
      key: "unlink",
      width: 100,
      render: (record: Contact) => (
        <div style={{ textAlign: "center" }}>
          <Trash
            size={16}
            color="red"
            onClick={() => {
              console.log("record in ContactTabs", record.unlink);
            }}
          />
        </div>
      ),
    },
  ];

  const toggleButton = (
    <Button type="primary" onClick={handleToggle}>
      Reveal Contacts
    </Button>
  );



  return (
    <div className="w-full h-full">
      <Table
        
        rowKey="id"
        columns={columns}
        dataSource={contacts}
        scroll={{ x: 1000, y: 500 }}
        pagination={false}
        loading={loadingReveal}
        locale={{
          emptyText: (
            <Empty
            description={false}
            >
              {!revealed ? toggleButton : null}
            </Empty>
          ),
        }}
      />
    </div>
  );
};
