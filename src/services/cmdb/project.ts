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
export async function ProjectCreateApiCmdbProjects(
  body: API.ProjectCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.ProjectCreateResp>('/api/cmdb/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看项目信息 GET /api/cmdb/projects/${param0} */
export async function projectReadOneApiCmdbProjectsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectReadOneApiCmdbProjectsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProjectReadOneResp>(`/api/cmdb/projects/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改项目信息 PUT /api/cmdb/projects/${param0} */
export async function projectUpdateApiCmdbProjectsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectUpdateApiCmdbProjectsByUidParams,
  body: API.ProjectUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProjectUpdateResp>(`/api/cmdb/projects/${param0}`, {
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
  body: API.ProjectDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.ProjectDeleteResp>(`/api/cmdb/projects/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询项目列表 GET /api/cmdb/projects/options */
export async function projectOptionsApiCmdbProjectsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.projectOptionsApiCmdbProjectsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProjectOptionsResp>('/api/cmdb/projects/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
