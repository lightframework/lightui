// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询实例列表 GET /api/cmdb/instances/ */
export async function instancePageListApiCmdbInstances(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.instancePageListApiCmdbInstancesParams,
  options?: { [key: string]: any },
) {
  return request<API.InstancePageListResp>('/api/cmdb/instances/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加实例 POST /api/cmdb/instances/ */
export async function instanceCreateApiCmdbInstances(
  body: API.InstanceCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.InstanceCreateResp>('/api/cmdb/instances/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看实例信息 GET /api/cmdb/instances/${param0} */
export async function instanceReadOneApiCmdbInstancesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.instanceReadOneApiCmdbInstancesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.InstanceReadOneResp>(`/api/cmdb/instances/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改实例信息 PUT /api/cmdb/instances/${param0} */
export async function instanceUpdateApiCmdbInstancesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.instanceUpdateApiCmdbInstancesByUidParams,
  body: API.InstanceUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.InstanceUpdateResp>(`/api/cmdb/instances/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除实例 DELETE /api/cmdb/instances/${param0} */
export async function instanceDeleteApiCmdbInstancesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.instanceDeleteApiCmdbInstancesByUidParams,
  body: API.InstanceDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.InstanceDeleteResp>(`/api/cmdb/instances/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询实例列表 GET /api/cmdb/instances/options */
export async function instanceOptionsApiCmdbInstancesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.instanceOptionsApiCmdbInstancesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.InstanceOptionsResp>('/api/cmdb/instances/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步实例资源 POST /api/cmdb/instances/sync */
export async function instanceSyncApiCmdbInstancesSync(
  body: API.InstanceSyncReq,
  options?: { [key: string]: any },
) {
  return request<API.InstanceSyncResp>('/api/cmdb/instances/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
