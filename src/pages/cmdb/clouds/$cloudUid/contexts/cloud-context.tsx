import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useRequest } from '@umijs/max';
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
  const { data: cloud } = useRequest(
    () => cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }),
    {
      refreshDeps: [cloudUid],
    },
  );

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
