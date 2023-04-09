// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get cloud tag list GET /cmdb/v1/tags/clouds/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudListResp>('/cmdb/v1/tags/clouds/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add cloud tag POST /cmdb/v1/tags/clouds/ */
export async function add(body: API.CloudAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/cmdb/v1/tags/clouds/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get cloud tag GET /cmdb/v1/tags/clouds/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudInfoResp>(`/cmdb/v1/tags/clouds/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
