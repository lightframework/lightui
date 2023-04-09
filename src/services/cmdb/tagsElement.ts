// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get element tag list GET /cmdb/v1/tags/elements/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.ElementListResp>('/cmdb/v1/tags/elements/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add element tag POST /cmdb/v1/tags/elements/ */
export async function add(body: API.ElementAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/cmdb/v1/tags/elements/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get element tag GET /cmdb/v1/tags/elements/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ElementInfoResp>(`/cmdb/v1/tags/elements/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
