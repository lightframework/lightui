// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询用户列表 GET /api/sys/roles/ */
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

/** 添加用户 POST /api/sys/roles/ */
export async function RoleCreateApiSysRoles(
  body: API.RoleCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.RoleCreateResp>('/api/sys/roles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看用户信息 GET /api/sys/roles/${param0} */
export async function roleReadOneApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleReadOneApiSysRolesByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleReadOneResp>(`/api/sys/roles/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 修改用户信息 PUT /api/sys/roles/${param0} */
export async function roleUpdateApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleUpdateApiSysRolesByIdParams,
  body: API.RoleUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleUpdateResp>(`/api/sys/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/sys/roles/${param0} */
export async function roleDeleteApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleDeleteApiSysRolesByIdParams,
  body: API.RoleDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleDeleteResp>(`/api/sys/roles/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询角色权限 GET /api/sys/roles/${param0}/auth */
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

/** 修改角色权限 POST /api/sys/roles/${param0}/auth */
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

/** 分页查询角色成员列表 GET /api/sys/roles/${param0}/users */
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

/** 添加角色成员 POST /api/sys/roles/${param0}/users */
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

/** 移除角色成员 DELETE /api/sys/roles/${param0}/users */
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

/** 查询用户列表 GET /api/sys/roles/options */
export async function roleOptionsApiSysRolesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleOptionsApiSysRolesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleOptionsResp>('/api/sys/roles/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
