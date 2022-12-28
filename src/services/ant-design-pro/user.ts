// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST sys/v1/user/login */
export async function login(body: sys.LoginReq, options?: { [key: string]: any }) {
  return request<sys.LoginResp>(`api/sys/v1/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get user list GET sys/v1/users */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: sys.listParams,
  options?: { [key: string]: any },
) {
  return request<sys.UserListResp>(`api/sys/v1/users`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add user POST sys/v1/users */
export async function add(body: sys.UserAddReq, options?: { [key: string]: any }) {
  return request<sys.User>(`api/sys/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get user info GET sys/v1/users/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: sys.infoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<sys.User>(`api/sys/v1/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update user info PUT sys/v1/users/${param0} */
export async function edit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: sys.editParams,
  body: sys.UserEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<sys.UserEditResp>(`api/sys/v1/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** reset user password POST sys/v1/users/${param0} */
export async function post(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: sys.postParams,
  body: sys.ResetPassReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`api/sys/v1/users/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update user info DELETE sys/v1/users/${param0} */
export async function deleteUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: sys.deleteUsingDELETEParams,
  body: sys.UserDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<sys.UserDelResp>(`api/sys/v1/users/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
