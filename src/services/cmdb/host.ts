// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询主机列表 GET /api/cmdb/hosts/ */
export async function hostPageListApiCmdbHosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostPageListApiCmdbHostsParams,
  options?: { [key: string]: any },
) {
  return request<API.HostPageListResp>('/api/cmdb/hosts/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加主机 POST /api/cmdb/hosts/ */
export async function hostAddApiCmdbHosts(body: API.HostAddReq, options?: { [key: string]: any }) {
  return request<API.HostAddResp>('/api/cmdb/hosts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看主机信息 GET /api/cmdb/hosts/${param0} */
export async function hostInfoApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostInfoApiCmdbHostsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostInfoResp>(`/api/cmdb/hosts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改主机信息 PUT /api/cmdb/hosts/${param0} */
export async function hostEditApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostEditApiCmdbHostsByUidParams,
  body: API.HostEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostEditResp>(`/api/cmdb/hosts/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除主机 DELETE /api/cmdb/hosts/${param0} */
export async function hostDeleteApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostDeleteApiCmdbHostsByUidParams,
  body: API.HostDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.HostDelResp>(`/api/cmdb/hosts/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询主机列表 GET /api/cmdb/hosts/list */
export async function hostListApiCmdbHostsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostListApiCmdbHostsListParams,
  options?: { [key: string]: any },
) {
  return request<API.HostListResp>('/api/cmdb/hosts/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
