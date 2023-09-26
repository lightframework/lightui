// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询应用列表 GET /api/cmdb/apps/ */
export async function appPageListApiCmdbApps(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appPageListApiCmdbAppsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppPageListResp>('/api/cmdb/apps/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加应用 POST /api/cmdb/apps/ */
export async function appCreateApiCmdbApps(
  body: CMDB.AppCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppCreateResp>('/api/cmdb/apps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看应用信息 GET /api/cmdb/apps/${param0} */
export async function appReadOneApiCmdbAppsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appReadOneApiCmdbAppsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.AppReadOneResp>(`/api/cmdb/apps/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改应用信息 PUT /api/cmdb/apps/${param0} */
export async function appUpdateApiCmdbAppsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appUpdateApiCmdbAppsByUidParams,
  body: CMDB.AppUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.AppUpdateResp>(`/api/cmdb/apps/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除应用 DELETE /api/cmdb/apps/${param0} */
export async function appDeleteApiCmdbAppsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appDeleteApiCmdbAppsByUidParams,
  body: CMDB.AppDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.AppDeleteResp>(`/api/cmdb/apps/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询应用列表 GET /api/cmdb/apps/options */
export async function appOptionsApiCmdbAppsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appOptionsApiCmdbAppsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppOptionsResp>('/api/cmdb/apps/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
