// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询实例列表 GET /api/cmdb/instances/ */
export async function instancePageListApiCmdbInstances(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instancePageListApiCmdbInstancesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstancePageListResp>('/api/cmdb/instances/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加实例 POST /api/cmdb/instances/ */
export async function instanceCreateApiCmdbInstances(
  body: CMDB.InstanceCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceCreateResp>('/api/cmdb/instances/', {
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
  params: CMDB.instanceReadOneApiCmdbInstancesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.InstanceReadOneResp>(`/api/cmdb/instances/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改实例信息 PUT /api/cmdb/instances/${param0} */
export async function instanceUpdateApiCmdbInstancesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceUpdateApiCmdbInstancesByUidParams,
  body: CMDB.InstanceUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.InstanceUpdateResp>(`/api/cmdb/instances/${param0}`, {
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
  params: CMDB.instanceDeleteApiCmdbInstancesByUidParams,
  body: CMDB.InstanceDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.InstanceDeleteResp>(`/api/cmdb/instances/${param0}`, {
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
  params: CMDB.instanceOptionsApiCmdbInstancesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceOptionsResp>('/api/cmdb/instances/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步实例资源 POST /api/cmdb/instances/sync */
export async function instanceSyncApiCmdbInstancesSync(
  body: CMDB.InstanceSyncReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceSyncResp>('/api/cmdb/instances/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
