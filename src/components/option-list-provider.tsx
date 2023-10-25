import {
  QueryObserverResult,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type ResponseData<T> = { data?: { list?: T[]; total?: number } };

interface OptionListContextType<T> {
  options: T[];
  isPending: boolean;
  refetch: () => Promise<QueryObserverResult<ResponseData<T>>>;
  current: T | undefined;
  setCurrent: Dispatch<SetStateAction<T | undefined>>;
  status: 'pending' | 'error' | 'success';
}

export function createOptionListContext<T>(
  queryOptions: UseQueryOptions<ResponseData<T>>,
) {
  const OptionListContext = createContext<OptionListContextType<T> | undefined>(
    undefined,
  );

  function OptionListProvider({ children }: { children: React.ReactNode }) {
    const [current, setCurrent] = useState<T | undefined>();

    const { data, refetch, isPending, status } = useQuery(queryOptions);
    const options = data?.data?.list ?? [];

    return (
      <OptionListContext.Provider
        value={{ options, current, setCurrent, isPending, refetch, status }}
      >
        {children}
      </OptionListContext.Provider>
    );
  }

  function useOptionList() {
    const context = useContext(OptionListContext);

    if (!context) {
      throw new Error(
        'useOptionList has to be used within <OptionListContext.Provider>',
      );
    }

    return context;
  }

  return { OptionListProvider, useOptionList };
}
