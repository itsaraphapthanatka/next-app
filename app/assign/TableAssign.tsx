"use client";
import { Table } from "antd";


export const TableAssign = ({token}: {token: string | null}) => {
    
    return (
        <>
        <Table />
        {token}
        </>
    );
};
