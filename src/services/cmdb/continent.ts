// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询大洲类型列表 GET /api/cmdb/continents/ */
export async function continentPageListApiCmdbContinents(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentPageListApiCmdbContinentsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ContinentPageListResp>('/api/cmdb/continents/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加大洲类型 POST /api/cmdb/continents/ */
export async function continentCreateApiCmdbContinents(
  body: CMDB.ContinentCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.ContinentCreateResp>('/api/cmdb/continents/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看大洲类型信息 GET /api/cmdb/continents/${param0} */
export async function continentReadOneApiCmdbContinentsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentReadOneApiCmdbContinentsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ContinentReadOneResp>(`/api/cmdb/continents/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改大洲类型信息 PUT /api/cmdb/continents/${param0} */
export async function continentUpdateApiCmdbContinentsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentUpdateApiCmdbContinentsByUidParams,
  body: CMDB.ContinentUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ContinentUpdateResp>(`/api/cmdb/continents/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除大洲类型 DELETE /api/cmdb/continents/${param0} */
export async function continentDeleteApiCmdbContinentsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentDeleteApiCmdbContinentsByUidParams,
  body: CMDB.ContinentDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.ContinentDeleteResp>(`/api/cmdb/continents/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询大洲类型列表 GET /api/cmdb/continents/options */
export async function continentOptionsApiCmdbContinentsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentOptionsApiCmdbContinentsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ContinentOptionsResp>('/api/cmdb/continents/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询大洲地域树 GET /api/cmdb/continents/places */
export async function continentPlacementApiCmdbContinentsPlaces(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentPlacementApiCmdbContinentsPlacesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ContinentPlacementResp>('/api/cmdb/continents/places', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询大洲地域树三层 GET /api/cmdb/continents/placesthree */
export async function continentPlacementThreeApiCmdbContinentsPlacesthree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.continentPlacementThreeApiCmdbContinentsPlacesthreeParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ContinentPlacementThreeResp>('/api/cmdb/continents/placesthree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
