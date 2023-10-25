// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询用户列表 GET /api/sys/users/ */
export async function userPageListApiSysUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userPageListApiSysUsersParams,
  options?: { [key: string]: any },
) {
  return request<SYS.UserPageListResp>("/api/sys/users/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加用户 POST /api/sys/users/ */
export async function UserCreateApiSysUsers(
  body: SYS.UserCreateReq,
  options?: { [key: string]: any },
) {
  return request<SYS.UserCreateResp>("/api/sys/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看用户信息 GET /api/sys/users/${param0} */
export async function userReadOneApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userReadOneApiSysUsersByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.UserReadOneResp>(`/api/sys/users/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改用户信息 PUT /api/sys/users/${param0} */
export async function userUpdateApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userUpdateApiSysUsersByIdParams,
  body: SYS.UserUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.UserUpdateResp>(`/api/sys/users/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除用户 DELETE /api/sys/users/${param0} */
export async function userDeleteApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userDeleteApiSysUsersByIdParams,
  body: SYS.UserDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.UserDeleteResp>(`/api/sys/users/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 重置用户密码 POST /api/sys/users/${param0}/pass */
export async function userResetPassApiSysUsersByIdpass(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userResetPassApiSysUsersByIdpassParams,
  body: SYS.ResetPassReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.ResetPassResp>(`/api/sys/users/${param0}/pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 启用/禁用用户 POST /api/sys/users/${param0}/status */
export async function userChangeStatusApiSysUsersByIdstatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userChangeStatusApiSysUsersByIdstatusParams,
  body: SYS.ChangeStatusReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.ChangeStatusResp>(`/api/sys/users/${param0}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 获取当前用户信息 GET /api/sys/users/current */
export async function userCurrentInfoApiSysUsersCurrent(options?: {
  [key: string]: any
}) {
  return request<SYS.UserCurrentInfoResp>("/api/sys/users/current", {
    method: "GET",
    ...(options || {}),
  })
}

/** 登录 POST /api/sys/users/login */
export async function loginApiSysUserslogin(
  body: SYS.LoginReq,
  options?: { [key: string]: any },
) {
  return request<SYS.LoginResp>("/api/sys/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询用户列表 GET /api/sys/users/options */
export async function userOptionsApiSysUsersOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.userOptionsApiSysUsersOptionsParams,
  options?: { [key: string]: any },
) {
  return request<SYS.UserOptionsResp>("/api/sys/users/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
