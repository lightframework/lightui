// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询项目列表 GET /api/cmdb/projects/ */
export async function projectPageListApiCmdbProjects(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectPageListApiCmdbProjectsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProjectPageListResp>('/api/cmdb/projects/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加项目 POST /api/cmdb/projects/ */
export async function projectAddApiCmdbProjects(
  body: API.ProjectAddReq,
  options?: { [key: string]: any },
) {
  return request<API.ProjectAddResp>('/api/cmdb/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改项目信息 PUT /api/cmdb/projects/${param0} */
export async function projectEditApiCmdbProjectsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectEditApiCmdbProjectsByUidParams,
  body: API.ProjectEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProjectEditResp>(`/api/cmdb/projects/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目 DELETE /api/cmdb/projects/${param0} */
export async function projectDeleteApiCmdbProjectsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectDeleteApiCmdbProjectsByUidParams,
  body: API.ProjectDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProjectDelResp>(`/api/cmdb/projects/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询项目列表 GET /api/cmdb/projects/list */
export async function projectListApiCmdbProjectsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectListApiCmdbProjectsListParams,
  options?: { [key: string]: any },
) {
  return request<API.ProjectListResp>('/api/cmdb/projects/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
