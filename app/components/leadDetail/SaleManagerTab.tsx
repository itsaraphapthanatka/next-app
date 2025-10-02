import React from 'react';

type SelectedLead = {
  id?: number;
  no?: number;
  leadNumber?: string;
  projectName?: string;
  saleManager?: string;
  sale?: string;
};

const SaleManagerTab = ({
  selectedLead,
  token,
}: {
  selectedLead: SelectedLead;
  token: string;
}) => {
    console.log("selectedLead in SaleManagerTab", selectedLead);
    console.log("token in SaleManagerTab", token);
  return <div>SaleManagerTab</div>;
};

export default SaleManagerTab;