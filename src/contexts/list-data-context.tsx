import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { useNavigate, useRequest } from '@umijs/max';
import React, {
  DependencyList,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type DataType = Record<string, any>;

type RequestRespType<T extends DataType> = {
  data?: { list?: T[] | undefined; total?: number | undefined };
};

type RequestParamsType = Record<string, any>;

type ListDataContextType<T extends DataType> = {
  items?: T[];
  refreshItems: () => Promise<RequestRespType<T>['data'] | undefined>;
  selectedItem?: T;
  setSelectedItem: Dispatch<SetStateAction<T | undefined>>;
};

export function createListDataContext<
  T extends DataType,
  Params extends RequestParamsType = RequestParamsType,
>(
  requestFn: (params: Params) => Promise<RequestRespType<T> | undefined>,
  options: {
    refreshDeps?: DependencyList;
    key: keyof T;
    slug?: string;
  },
) {
  const context = createContext<ListDataContextType<T> | null>(null);

  const ListDataContextProvider = ({
    params,
    children,
  }: {
    params: Params;
    children: React.ReactNode;
  }) => {
    const [selectedItem, setSelectedItem] = useState<T>();

    const { data, refresh: refreshItems } = useRequest<RequestRespType<T>>(
      () => requestFn(params),
      { refreshDeps: options?.refreshDeps },
    );

    const items = data?.list as T[];

    useEffect(() => {
      if (
        items &&
        !items.find((item) => item[options.key] === selectedItem?.[options.key])
      ) {
        setSelectedItem(items.at(0));
      }
    }, [items]);

    return (
      <context.Provider
        value={{
          items,
          refreshItems,
          selectedItem,
          setSelectedItem,
        }}
      >
        {children}
      </context.Provider>
    );
  };

  const useListData = () => {
    return useContext(context)!;
  };

  return { ListDataContextProvider, useListData };
}

export function useAutoRouter<T extends DataType>({
  items,
  setSelectedItem,
  selectedItem,
  key,
  slug,
  slugType = 'string',
  to,
}: ListDataContextType<T> & {
  key: keyof T;
  slug: string | undefined;
  slugType?: 'string' | 'number';
  to: string;
}) {
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      if (slug && items) {
        const item = items.find(
          (item) =>
            item[key] ===
            (slugType === 'string' ? slug : Number.parseInt(slug)),
        );
        if (item) {
          setSelectedItem(item);
        } else {
          // 子路由处理（暂时）
        }
        setIsFirstLoad(false);
        return;
      }
    }
    if (selectedItem) {
      navigate(`${selectedItem[key]}/${to}`);
    }
  }, [selectedItem]);
}

export const {
  ListDataContextProvider: RegionListContextProvider,
  useListData: useRegionList,
} = createListDataContext(regionOptionsApiCmdbRegionsOptions, { key: 'Uid' });

export const {
  ListDataContextProvider: EnvListContextProvider,
  useListData: useEnvList,
} = createListDataContext(envOptionsApiCmdbEnvsOptions, {
  key: 'Uid',
});

export const {
  ListDataContextProvider: RoleListContextProvider,
  useListData: useRoleList,
} = createListDataContext(roleOptionsApiSysRolesOptions, { key: 'id' });
