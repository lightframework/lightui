// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST sys/v1/user/login */
export async function login(body: API.LoginReq, options?: { [key: string]: any }) {
  return request<API.LoginResp>(`api/sys/v1/user/login`, {
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
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.UserListResp>(`api/sys/v1/users`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add user POST sys/v1/users */
export async function add(body: API.UserAddReq, options?: { [key: string]: any }) {
  return request<API.User>(`api/sys/v1/users`, {
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
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`api/sys/v1/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update user info PUT sys/v1/users/${param0} */
export async function edit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editParams,
  body: API.UserEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserEditResp>(`api/sys/v1/users/${param0}`, {
    method: 'PUT',
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
  params: API.deleteUsingDELETEParams,
  body: API.UserDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDelResp>(`api/sys/v1/users/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** reset user password POST sys/v1/users/${param0}/pass */
export async function resetPass(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPassParams,
  body: API.ResetPassReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`api/sys/v1/users/${param0}/pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** login POST sys/v1/users/current */
export async function currentUser(body: API.CurrentUserReq, options?: { [key: string]: any }) {
  return request<API.CurrentUserResp>(`api/sys/v1/users/current`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
