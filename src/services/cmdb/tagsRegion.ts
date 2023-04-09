// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get region tag list GET /cmdb/v1/tags/regions/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.RegionListResp>('/cmdb/v1/tags/regions/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add region tag POST /cmdb/v1/tags/regions/ */
export async function add(body: API.RegionAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/cmdb/v1/tags/regions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get region tag GET /cmdb/v1/tags/regions/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.RegionInfoResp>(`/cmdb/v1/tags/regions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
