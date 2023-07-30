// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询区域列表 GET /api/cmdb/regions/ */
export async function regionPageListApiCmdbRegions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regionPageListApiCmdbRegionsParams,
  options?: { [key: string]: any },
) {
  return request<API.RegionPageListResp>('/api/cmdb/regions/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加区域 POST /api/cmdb/regions/ */
export async function RegionCreateApiCmdbRegions(
  body: API.RegionCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.RegionCreateResp>('/api/cmdb/regions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看区域信息 GET /api/cmdb/regions/${param0} */
export async function regionReadOneApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regionReadOneApiCmdbRegionsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.RegionReadOneResp>(`/api/cmdb/regions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改区域信息 PUT /api/cmdb/regions/${param0} */
export async function regionUpdateApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regionUpdateApiCmdbRegionsByUidParams,
  body: API.RegionUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.RegionUpdateResp>(`/api/cmdb/regions/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除区域 DELETE /api/cmdb/regions/${param0} */
export async function regionDeleteApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regionDeleteApiCmdbRegionsByUidParams,
  body: API.RegionDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.RegionDeleteResp>(`/api/cmdb/regions/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询区域列表 GET /api/cmdb/regions/options */
export async function regionOptionsApiCmdbRegionsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regionOptionsApiCmdbRegionsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.RegionOptionsResp>('/api/cmdb/regions/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步区域信息 POST /api/cmdb/regions/sync */
export async function regionSyncApiCmdbRegionsSync(
  body: API.RegionSyncReq,
  options?: { [key: string]: any },
) {
  return request<API.RegionSyncResp>('/api/cmdb/regions/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
