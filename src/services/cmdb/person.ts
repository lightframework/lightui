// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get person list GET /cmdb/v1/persons/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.PersonListResp>('/cmdb/v1/persons/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add person POST /cmdb/v1/persons/ */
export async function add(body: API.PersonAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/cmdb/v1/persons/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get person info GET /cmdb/v1/persons/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.PersonInfoResp>(`/cmdb/v1/persons/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
