import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';

type CloudType = API.CloudReadOneResp['data'];

type ContextType = {
  cloud?: CloudType;
};

const cloudContext = createContext<ContextType | null>(null);

export function CloudContextProvider({
  cloudUid,
  children,
}: {
  cloudUid: string;
  children: React.ReactNode;
}) {
  const { data: cloud } = useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }).then((res) => res.data),
  });

  return (
    <cloudContext.Provider
      value={{
        cloud,
      }}
    >
      {children}
    </cloudContext.Provider>
  );
}

export function useCloud() {
  return useContext(cloudContext)!;
}
