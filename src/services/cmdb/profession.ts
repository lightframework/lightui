// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询云商列表 GET /api/cmdb/professions/ */
export async function professionPageListApiCmdbProfessions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionPageListApiCmdbProfessionsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionPageListResp>('/api/cmdb/professions/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加云商 POST /api/cmdb/professions/ */
export async function professionAddApiCmdbProfessions(
  body: API.ProfessionAddReq,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionAddResp>('/api/cmdb/professions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看云商信息 GET /api/cmdb/professions/${param0} */
export async function professionInfoApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionInfoApiCmdbProfessionsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionInfoResp>(`/api/cmdb/professions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改云商信息 PUT /api/cmdb/professions/${param0} */
export async function professionEditApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionEditApiCmdbProfessionsByUidParams,
  body: API.ProfessionEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionEditResp>(`/api/cmdb/professions/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除云商 DELETE /api/cmdb/professions/${param0} */
export async function professionDeleteApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionDeleteApiCmdbProfessionsByUidParams,
  body: API.ProfessionDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionDelResp>(`/api/cmdb/professions/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询云商列表 GET /api/cmdb/professions/list */
export async function professionListApiCmdbProfessionsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionListApiCmdbProfessionsListParams,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionListResp>('/api/cmdb/professions/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
