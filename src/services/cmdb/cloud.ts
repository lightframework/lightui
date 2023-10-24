// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询云商列表 GET /api/cmdb/clouds/ */
export async function cloudPageListApiCmdbClouds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudPageListApiCmdbCloudsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudPageListResp>('/api/cmdb/clouds/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加云商 POST /api/cmdb/clouds/ */
export async function cloudCreateApiCmdbClouds(
  body: CMDB.CloudCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudCreateResp>('/api/cmdb/clouds/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看云商信息 GET /api/cmdb/clouds/${param0} */
export async function cloudReadOneApiCmdbCloudsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudReadOneApiCmdbCloudsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudReadOneResp>(`/api/cmdb/clouds/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改云商信息 PUT /api/cmdb/clouds/${param0} */
export async function cloudUpdateApiCmdbCloudsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudUpdateApiCmdbCloudsByUidParams,
  body: CMDB.CloudUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudUpdateResp>(`/api/cmdb/clouds/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除云商 DELETE /api/cmdb/clouds/${param0} */
export async function cloudDeleteApiCmdbCloudsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudDeleteApiCmdbCloudsByUidParams,
  body: CMDB.CloudDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CloudDeleteResp>(`/api/cmdb/clouds/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询云商列表 GET /api/cmdb/clouds/options */
export async function cloudOptionsApiCmdbCloudsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudOptionsApiCmdbCloudsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudOptionsResp>('/api/cmdb/clouds/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询云商地区树 GET /api/cmdb/clouds/places */
export async function cloudPlacementApiCmdbCloudsPlaces(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudPlacementApiCmdbCloudsPlacesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudPlacementResp>('/api/cmdb/clouds/places', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步云商资源 POST /api/cmdb/clouds/sync */
export async function cloudSyncApiCmdbCloudsSync(
  body: CMDB.CloudSyncReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudSyncResp>('/api/cmdb/clouds/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据城市和资源组查询可用云商区域信息 GET /api/cmdb/clouds/usables */
export async function cloudUseablesApiCmdbCloudsUsables(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cloudUseablesApiCmdbCloudsUsablesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CloudUseablesResp>('/api/cmdb/clouds/usables', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
