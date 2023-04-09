// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get team list GET /sys/v1/roles/ */
export async function listSysRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSysRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleListResp>('/sys/v1/roles/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add team POST /sys/v1/roles/ */
export async function addSysRoles(body: API.Role, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/sys/v1/roles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get team info GET /sys/v1/roles/${param0} */
export async function infoSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoSysRolesByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleInfo>(`/sys/v1/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update team info PUT /sys/v1/roles/${param0} */
export async function editSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editSysRolesByIdParams,
  body: API.RoleEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update team info DELETE /sys/v1/roles/${param0} */
export async function deleteSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSysRolesByIdParams,
  body: API.PathIdReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/roles/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** edit auth POST /sys/v1/roles/${param0}/auth */
export async function authEditSysRolesByIdauth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.authEditSysRolesByIdauthParams,
  body: API.RoleAuthEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/roles/${param0}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get member list GET /sys/v1/roles/${param0}/users */
export async function memListSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memListSysRolesByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserListResp>(`/sys/v1/roles/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** add member POST /sys/v1/roles/${param0}/users */
export async function memAddSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memAddSysRolesByIdusersParams,
  body: API.RoleMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/roles/${param0}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove member DELETE /sys/v1/roles/${param0}/users */
export async function memDelSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memDelSysRolesByIdusersParams,
  body: API.RoleMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/roles/${param0}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
