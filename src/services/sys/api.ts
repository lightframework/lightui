// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询接口列表 GET /api/sys/apis/ */
export async function apiListApiSysApis(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiListApiSysApisParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiListResp>('/api/sys/apis/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
