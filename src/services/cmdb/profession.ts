// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询人员类型列表 GET /api/cmdb/professions/ */
export async function professionPageListApiCmdbProfessions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.professionPageListApiCmdbProfessionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ProfessionPageListResp>('/api/cmdb/professions/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加人员类型 POST /api/cmdb/professions/ */
export async function professionCreateApiCmdbProfessions(
  body: CMDB.ProfessionCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.ProfessionCreateResp>('/api/cmdb/professions/', {
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
  params: CMDB.professionReadOneApiCmdbProfessionsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ProfessionReadOneResp>(`/api/cmdb/professions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改人员类型信息 PUT /api/cmdb/professions/${param0} */
export async function professionUpdateApiCmdbProfessionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.professionUpdateApiCmdbProfessionsByUidParams,
  body: CMDB.ProfessionUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ProfessionUpdateResp>(`/api/cmdb/professions/${param0}`, {
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
  params: CMDB.professionDeleteApiCmdbProfessionsByUidParams,
  body: CMDB.ProfessionDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ProfessionDeleteResp>(`/api/cmdb/professions/${param0}`, {
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
  params: CMDB.professionOptionsApiCmdbProfessionsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ProfessionOptionsResp>('/api/cmdb/professions/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
