// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get person tag list GET /cmdb/v1/tags/professions/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionListResp>('/cmdb/v1/tags/professions/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add person tag POST /cmdb/v1/tags/professions/ */
export async function add(body: API.ProfessionAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/cmdb/v1/tags/professions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get person tag GET /cmdb/v1/tags/professions/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionInfoResp>(`/cmdb/v1/tags/professions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
