import React from 'react';

type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

const SaleTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {
    console.log("selectedLead in SaleTab", selectedLead);
    console.log("token in SaleTab", token);
    return <div>SaleTab</div>;
};

export default SaleTab;