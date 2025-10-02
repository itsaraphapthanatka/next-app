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
  return <div>SaleManagerTab</div>;
};

export default SaleManagerTab;