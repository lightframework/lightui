// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询人员类型列表 GET /api/cmdb/professions/ */
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

/** 添加人员类型 POST /api/cmdb/professions/ */
export async function professionCreateApiCmdbProfessions(
  body: API.ProfessionCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionCreateResp>('/api/cmdb/professions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看人员类型信息 GET /api/cmdb/professions/${param0} */
export async function professionReadOneApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionReadOneApiCmdbProfessionsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionReadOneResp>(`/api/cmdb/professions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改人员类型信息 PUT /api/cmdb/professions/${param0} */
export async function professionUpdateApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionUpdateApiCmdbProfessionsByUidParams,
  body: API.ProfessionUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionUpdateResp>(`/api/cmdb/professions/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除人员类型 DELETE /api/cmdb/professions/${param0} */
export async function professionDeleteApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionDeleteApiCmdbProfessionsByUidParams,
  body: API.ProfessionDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProfessionDeleteResp>(`/api/cmdb/professions/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询人员类型列表 GET /api/cmdb/professions/options */
export async function professionOptionsApiCmdbProfessionsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.professionOptionsApiCmdbProfessionsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProfessionOptionsResp>('/api/cmdb/professions/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
