import { useRequest } from '@umijs/max';
import React, { DependencyList } from 'react';

export declare type LightService<R, P extends any[]> = (...args: P) => Promise<R>;
export declare type noop = (...args: any[]) => void;

export declare type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export interface FetchResult<R, P extends any[]> {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
  params: P;
  cancel: noop;
  refresh: () => Promise<R>;
  mutate: Mutate<R>;
  run: (...args: P) => Promise<R>;
  unmount: () => void;
}

export declare type BaseOptions<D, R, P extends any[]> = {
  refreshDeps?: DependencyList;
  manual?: boolean;
  onSuccess?: (data: D) => void;
  onError?: (e: Error, resp: R) => void;
  messageRender?: (resp: R) => React.ReactElement;
  defaultLoading?: boolean;
  loadingDelay?: number;
  defaultParams?: P;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  fetchKey?: (...args: P) => string;
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;
  cacheKey?: string | number;
  cacheTime?: number;
  staleTime?: number;
  debounceInterval?: number;
  throttleInterval?: number;
  initialData?: R;
  requestMethod?: (service: any) => Promise<any>;
  ready?: boolean;
  throwOnError?: boolean;
};

export interface BaseResult<R, P extends any[]> extends FetchResult<R, P> {
  reset: () => void;
  fetches: {
    [key in string]: FetchResult<R, P>;
  };
}

declare type LightBaseRes = {
  code: number;
  msg: string;
  success: boolean;
};

declare type LightListData = {
  list: any[];
  total: number;
};

declare type LightData = Record<string, any>;

declare type LishtRes = {
  data?: LightListData | LightData;
  resp?: LightBaseRes;
};

function useLightApi<R extends LishtRes, P extends any[]>(
  service: LightService<R, P>,
  options: BaseOptions<R['data'], R['resp'], P>,
): BaseResult<R, P>;

function useLightApi(
  service: LightService<any, any>,
  { onSuccess, onError, messageRender, ...rest }: BaseOptions<any, any, any>,
) {
  return useRequest(
    () => {
      service()
        .then((d) => {
          if (d?.resp?.success) {
            onSuccess?.(d?.data);
          } else {
            onError?.(new Error('调用失败'), d?.resp);
            messageRender?.(d?.resp);
          }
        })
        .catch((e) => {
          onError?.(new Error('调用失败'), undefined);
        });
    },
    { ...rest },
  );
}

export { useLightApi };
