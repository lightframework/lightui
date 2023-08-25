// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询云商列表 GET /api/cmdb/clouds/ */
export async function cloudPageListApiCmdbClouds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cloudPageListApiCmdbCloudsParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudPageListResp>('/api/cmdb/clouds/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加云商 POST /api/cmdb/clouds/ */
export async function cloudCreateApiCmdbClouds(
  body: API.CloudCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.CloudCreateResp>('/api/cmdb/clouds/', {
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
  params: API.cloudReadOneApiCmdbCloudsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudReadOneResp>(`/api/cmdb/clouds/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改云商信息 PUT /api/cmdb/clouds/${param0} */
export async function cloudUpdateApiCmdbCloudsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cloudUpdateApiCmdbCloudsByUidParams,
  body: API.CloudUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudUpdateResp>(`/api/cmdb/clouds/${param0}`, {
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
  params: API.cloudDeleteApiCmdbCloudsByUidParams,
  body: API.CloudDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.CloudDeleteResp>(`/api/cmdb/clouds/${param0}`, {
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
  params: API.cloudOptionsApiCmdbCloudsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudOptionsResp>('/api/cmdb/clouds/options', {
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
  params: API.cloudPlacementApiCmdbCloudsPlacesParams,
  options?: { [key: string]: any },
) {
  return request<API.CloudPlacementResp>('/api/cmdb/clouds/places', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步云商资源 POST /api/cmdb/clouds/sync */
export async function cloudSyncApiCmdbCloudsSync(
  body: API.CloudSyncReq,
  options?: { [key: string]: any },
) {
  return request<API.CloudSyncResp>('/api/cmdb/clouds/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
