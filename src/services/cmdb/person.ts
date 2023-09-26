// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询人员列表 GET /api/cmdb/persons/ */
export async function personPageListApiCmdbPersons(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.personPageListApiCmdbPersonsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.PersonPageListResp>('/api/cmdb/persons/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加人员 POST /api/cmdb/persons/ */
export async function PersonCreateApiCmdbPersons(
  body: CMDB.PersonCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.PersonCreateResp>('/api/cmdb/persons/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看人员信息 GET /api/cmdb/persons/${param0} */
export async function personReadOneApiCmdbPersonsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.personReadOneApiCmdbPersonsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.PersonReadOneResp>(`/api/cmdb/persons/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改人员信息 PUT /api/cmdb/persons/${param0} */
export async function personUpdateApiCmdbPersonsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.personUpdateApiCmdbPersonsByUidParams,
  body: CMDB.PersonUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.PersonUpdateResp>(`/api/cmdb/persons/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除人员 DELETE /api/cmdb/persons/${param0} */
export async function personDeleteApiCmdbPersonsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.personDeleteApiCmdbPersonsByUidParams,
  body: CMDB.PersonDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.PersonDeleteResp>(`/api/cmdb/persons/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询人员列表 GET /api/cmdb/persons/options */
export async function personOptionsApiCmdbPersonsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.personOptionsApiCmdbPersonsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.PersonOptionsResp>('/api/cmdb/persons/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
