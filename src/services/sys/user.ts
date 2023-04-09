// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** login POST /sys/v1/user/login */
export async function loginSysUserlogin(body: API.LoginReq, options?: { [key: string]: any }) {
  return request<API.LoginResp>('/sys/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get user list GET /sys/v1/users/ */
export async function listSysUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSysUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.UserListResp>('/sys/v1/users/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add user POST /sys/v1/users/ */
export async function addSysUsers(body: API.UserAddReq, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/sys/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get user info GET /sys/v1/users/${param0} */
export async function infoSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoSysUsersByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserInfoResp>(`/sys/v1/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update user info PUT /sys/v1/users/${param0} */
export async function editSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editSysUsersByIdParams,
  body: API.UserEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update user info DELETE /sys/v1/users/${param0} */
export async function deleteSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSysUsersByIdParams,
  body: API.PathIdReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/users/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** reset user password POST /sys/v1/users/${param0}/pass */
export async function resetPassSysUsersByIdpass(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPassSysUsersByIdpassParams,
  body: API.ResetPassReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/users/${param0}/pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** change user status POST /sys/v1/users/${param0}/status */
export async function changeStatusSysUsersByIdstatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeStatusSysUsersByIdstatusParams,
  body: API.ChangeStatusReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/users/${param0}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get current user info GET /sys/v1/users/current */
export async function currentUserSysUsersCurrent(options?: { [key: string]: any }) {
  return request<API.CurrentUserResp>('/sys/v1/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}
