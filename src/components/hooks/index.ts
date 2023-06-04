import { useRequest } from '@umijs/max';
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
): BaseResult<R, P>;

function useLightApi(service: any) {
  return useRequest(service, {});
}

export { useLightApi };
