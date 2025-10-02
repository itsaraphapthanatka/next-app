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
    return <div>SaleTab</div>;
};

export default SaleTab;