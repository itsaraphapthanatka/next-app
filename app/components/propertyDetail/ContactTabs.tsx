import { Table } from "antd";
import { getContacts } from "@/app/server_actions/contacts";
import { useState, useEffect } from "react";
import { PhoneCall, Smile, Trash } from "lucide-react";

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
export const ContactTabs = ({ token, selectedProperty }: { token: string, selectedProperty: SelectedProperty }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    useEffect(() => {
        getContacts(token, selectedProperty.propertyId as number).then((data) => {
            setContacts(data ?? []);
        });
    }, [token, selectedProperty.propertyId]);
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
            render: ( record: Contact) => {
                return <div className="text-center">
                    <PhoneCall size={16} color="green" onClick={() => {
                        console.log("record in ContactTabs", record.telephone);
                        window.open(`tel:${record.telephone}`, '_blank');
                    }} />
                </div>
            }
        },
        {
            title: "Owner",
            dataIndex: "owner",
            key: "owner",
            width: 100,
            render: (text: string, record: Contact) => {
                console.log(text);
                return <div className="text-center">
                    {record.owner ? <Smile size={16} color="green" /> : null }
                </div>
            }
        },
        {
            title: "Unlink",
            dataIndex: "unlink",
            key: "unlink",
            width: 100,
            render: ( record: Contact) => {
                return <div style={{ textAlign: "center" }}>
                    <Trash size={16} color="red" onClick={() => {
                        console.log("record in ContactTabs", record.unlink);
                    }} />
                </div>
            }
        },
    ];
    return (
        <div className="w-full h-full">
            <Table
                rowKey="id"
                columns={columns} 
                dataSource={contacts} 
                scroll={{ x: 1000, y: 500 }}
                pagination={false}
             />
        </div>
    );
};
