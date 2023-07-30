// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询应用列表 GET /api/cmdb/apps/ */
export async function appPageListApiCmdbApps(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.appPageListApiCmdbAppsParams,
  options?: { [key: string]: any },
) {
  return request<API.AppPageListResp>('/api/cmdb/apps/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加应用 POST /api/cmdb/apps/ */
export async function appAddApiCmdbApps(body: API.AppAddReq, options?: { [key: string]: any }) {
  return request<API.AppAddResp>('/api/cmdb/apps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改应用信息 PUT /api/cmdb/apps/${param0} */
export async function appEditApiCmdbAppsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.appEditApiCmdbAppsByUidParams,
  body: API.AppEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.AppEditResp>(`/api/cmdb/apps/${param0}`, {
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
  params: API.appDeleteApiCmdbAppsByUidParams,
  body: API.AppDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.AppDelResp>(`/api/cmdb/apps/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询应用列表 GET /api/cmdb/apps/list */
export async function appListApiCmdbAppsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.appListApiCmdbAppsListParams,
  options?: { [key: string]: any },
) {
  return request<API.AppListResp>('/api/cmdb/apps/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
