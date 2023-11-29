// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询用户列表 GET /api/sys/roles/ */
export async function rolePageListApiSysRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.rolePageListApiSysRolesParams,
  options?: { [key: string]: any },
) {
  return request<SYS.RolePageListResp>("/api/sys/roles/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加用户 POST /api/sys/roles/ */
export async function RoleCreateApiSysRoles(
  body: SYS.RoleCreateReq,
  options?: { [key: string]: any },
) {
  return request<SYS.RoleCreateResp>("/api/sys/roles/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看用户信息 GET /api/sys/roles/${param0} */
export async function roleReadOneApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleReadOneApiSysRolesByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleReadOneResp>(`/api/sys/roles/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  })
}

/** 修改用户信息 PUT /api/sys/roles/${param0} */
export async function roleUpdateApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleUpdateApiSysRolesByIdParams,
  body: SYS.RoleUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleUpdateResp>(`/api/sys/roles/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除用户 DELETE /api/sys/roles/${param0} */
export async function roleDeleteApiSysRolesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleDeleteApiSysRolesByIdParams,
  body: SYS.RoleDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleDeleteResp>(`/api/sys/roles/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询角色权限 GET /api/sys/roles/${param0}/auth */
export async function roleAuthListApiSysRolesByIdauth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleAuthListApiSysRolesByIdauthParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleAuthListResp>(`/api/sys/roles/${param0}/auth`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改角色权限 POST /api/sys/roles/${param0}/auth */
export async function roleAuthEditApiSysRolesByIdauth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleAuthEditApiSysRolesByIdauthParams,
  body: SYS.RoleAuthEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleAuthEditResp>(`/api/sys/roles/${param0}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询角色成员列表 GET /api/sys/roles/${param0}/users */
export async function roleMemListApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleMemListApiSysRolesByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleMemListResp>(`/api/sys/roles/${param0}/users`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  })
}

/** 添加角色成员 POST /api/sys/roles/${param0}/users */
export async function roleMemAddApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleMemAddApiSysRolesByIdusersParams,
  body: SYS.RoleMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleMemAddResp>(`/api/sys/roles/${param0}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 移除角色成员 DELETE /api/sys/roles/${param0}/users */
export async function roleMemDelApiSysRolesByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleMemDelApiSysRolesByIdusersParams,
  body: SYS.RoleMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.RoleMemDelResp>(`/api/sys/roles/${param0}/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询用户列表 GET /api/sys/roles/options */
export async function roleOptionsApiSysRolesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.roleOptionsApiSysRolesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<SYS.RoleOptionsResp>("/api/sys/roles/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
