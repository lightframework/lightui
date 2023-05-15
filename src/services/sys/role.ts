// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get role list GET /api/sys/roles/ */
export async function rolePageListApiSysRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rolePageListApiSysRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.RolePageListResp>('/api/sys/roles/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add role POST /api/sys/roles/ */
export async function roleAddApiSysRoles(body: API.RoleAddReq, options?: { [key: string]: any }) {
  return request<API.RoleAddResp>('/api/sys/roles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get role info GET /api/sys/roles/${param0} */
export async function roleInfoApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleInfoApiSysRolesByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleInfoResp>(`/api/sys/roles/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** update role info PUT /api/sys/roles/${param0} */
export async function roleEditApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleEditApiSysRolesByIdParams,
  body: API.RoleEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleEditResp>(`/api/sys/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update role info DELETE /api/sys/roles/${param0} */
export async function roleDeleteApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleDeleteApiSysRolesByIdParams,
  body: API.RoleDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDelResp>(`/api/sys/roles/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** role auth list GET /api/sys/roles/${param0}/auth */
export async function roleAuthListApiSysRolesByIdauth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleAuthListApiSysRolesByIdauthParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleAuthListResp>(`/api/sys/roles/${param0}/auth`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** edit role auth POST /api/sys/roles/${param0}/auth */
export async function roleAuthEditApiSysRolesByIdauth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleAuthEditApiSysRolesByIdauthParams,
  body: API.RoleAuthEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleAuthEditResp>(`/api/sys/roles/${param0}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get member list GET /api/sys/roles/${param0}/users */
export async function roleMemListApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleMemListApiSysRolesByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleMemListResp>(`/api/sys/roles/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** add member POST /api/sys/roles/${param0}/users */
export async function roleMemAddApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleMemAddApiSysRolesByIdusersParams,
  body: API.RoleMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleMemAddResp>(`/api/sys/roles/${param0}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove member DELETE /api/sys/roles/${param0}/users */
export async function roleMemDelApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleMemDelApiSysRolesByIdusersParams,
  body: API.RoleMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleMemDelResp>(`/api/sys/roles/${param0}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get role list GET /api/sys/roles/list */
export async function roleListApiSysRolesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleListApiSysRolesListParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleListResp>('/api/sys/roles/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
