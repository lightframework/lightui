import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@umijs/max';
import React, {
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
  refetchItems: () => Promise<void>;
  selectedItem?: T;
  setSelectedItem: Dispatch<SetStateAction<T | undefined>>;
};

export function createListDataContext<
  T extends DataType,
  Params extends RequestParamsType = RequestParamsType,
>(
  requestFn: (params: Params) => Promise<RequestRespType<T> | undefined>,
  options: {
    key: keyof T;
    queryKey: string;
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

    const { data: items, refetch } = useQuery({
      queryKey: ['option-list', options.queryKey],
      queryFn: () => requestFn(params).then((res) => res?.data?.list),
    });

    useEffect(() => {
      if (
        items &&
        !items.find((item) => item[options.key] === selectedItem?.[options.key])
      ) {
        console.log('set 0');
        setSelectedItem(items.at(0));
      } else if (!items || items.length === 0) {
        console.log('set undefined');
        setSelectedItem(undefined);
      }
    }, [items, selectedItem]);

    return (
      <context.Provider
        value={{
          items,
          refetchItems: async () => {
            await refetch();
          },
          selectedItem,
          setSelectedItem,
        }}
      >
        {children}
      </context.Provider>
    );
  };

  const useListData = () => {
    const listDataContext = useContext(context);

    if (!listDataContext) {
      throw new Error(
        'useListData has to be used within <listDataContext.Provider>',
      );
    }

    return listDataContext;
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
  const { pathname, search } = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      if (slug && items) {
        const item = items.find(
          (item) =>
            item[key] ===
            (slugType === 'string' ? slug : Number.parseInt(slug)),
        );
        if (item && item[key] !== items[0][key]) {
          setSelectedItem(item);
        } else if (!item) {
          // 子路由处理（暂时）
          // message.error('资源不存在');
        }
        setIsFirstLoad(false);
        return;
      }
    }

    if (selectedItem !== undefined) {
      const url = pathname + search;
      let updatedUrl = '';
      const hexPattern = /\/(0x)?[0-9A-Fa-f]+\//;
      const cloudHexPattern = /\/clouds\/(0x)?[0-9A-Fa-f]+\/regions\/$/;

      let replace = false;

      if (cloudHexPattern.test(pathname + '/')) {
        replace = false;
      } else if (hexPattern.test(pathname + '/')) {
        replace = true;
      } else {
        replace = false;
      }

      if (replace) {
        if (pathname.includes('/roles')) {
          const numPattern = /\/[0-9]+\//;
          updatedUrl = url.replace(numPattern, '/' + selectedItem[key] + '/');
        } else {
          const lastHexPattern =
            /\/(?:0x)([0-9a-fA-F]+)(?!.*\/(?:0x)[0-9a-fA-F]+)/;
          updatedUrl = url.replace(lastHexPattern, '/' + selectedItem[key]);
        }
      } else {
        updatedUrl = `${selectedItem[key]}/${to}`;
      }

      navigate(updatedUrl);
    }
  }, [selectedItem]);
}

export const {
  ListDataContextProvider: RegionListContextProvider,
  useListData: useRegionList,
} = createListDataContext(regionOptionsApiCmdbRegionsOptions, {
  key: 'Uid',
  queryKey: 'regions',
});

export const {
  ListDataContextProvider: EnvListContextProvider,
  useListData: useEnvList,
} = createListDataContext(envOptionsApiCmdbEnvsOptions, {
  key: 'Uid',
  queryKey: 'envs',
});

export const {
  ListDataContextProvider: RoleListContextProvider,
  useListData: useRoleList,
} = createListDataContext(roleOptionsApiSysRolesOptions, {
  key: 'id',
  queryKey: 'roles',
});

export const {
  ListDataContextProvider: ProfessionListContextProvider,
  useListData: useProfessionList,
} = createListDataContext(professionOptionsApiCmdbProfessionsOptions, {
  key: 'Uid',
  queryKey: 'professions',
});

export const {
  ListDataContextProvider: TeamListContextProvider,
  useListData: useTeamList,
} = createListDataContext(
  async () => ({
    msg: 'OK',
    code: 2000,
    data: {
      list: [
        {
          TeamId: '1',
          TeamName: '团队1',
          Uid: '0x1242',
        },
        {
          TeamId: '2',
          TeamName: '团队2',
          Uid: '0x1241',
        },
      ],
      total: 2,
    },
  }),
  {
    key: 'Uid',
    queryKey: 'teams',
  },
);
