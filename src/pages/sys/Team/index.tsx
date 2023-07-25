import React from 'react';

import LeftTreeLayout from '@/components/layouts/LeftTreeLayout';
import LightTable from '@/components/LightTable';

const Page: React.FC = () => {
  return (
    <LeftTreeLayout>
      <LightTable />
    </LeftTreeLayout>
  );
};

export default Page;
