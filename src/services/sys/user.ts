// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get user list GET /api/sys/users/ */
export async function userPageListApiSysUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userPageListApiSysUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.UserPageListResp>('/api/sys/users/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add user POST /api/sys/users/ */
export async function userAddApiSysUsers(body: API.UserAddReq, options?: { [key: string]: any }) {
  return request<API.UserAddResp>('/api/sys/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get user info GET /api/sys/users/${param0} */
export async function userInfoApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userInfoApiSysUsersByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserInfoResp>(`/api/sys/users/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** update user info PUT /api/sys/users/${param0} */
export async function userEditApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userEditApiSysUsersByIdParams,
  body: API.UserEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserEditResp>(`/api/sys/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update user info DELETE /api/sys/users/${param0} */
export async function userDeleteApiSysUsersById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userDeleteApiSysUsersByIdParams,
  body: API.UserDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDelResp>(`/api/sys/users/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** reset user password POST /api/sys/users/${param0}/pass */
export async function userResetPassApiSysUsersByIdpass(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userResetPassApiSysUsersByIdpassParams,
  body: API.ResetPassReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResetPassResp>(`/api/sys/users/${param0}/pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** change user status POST /api/sys/users/${param0}/status */
export async function userChangeStatusApiSysUsersByIdstatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userChangeStatusApiSysUsersByIdstatusParams,
  body: API.ChangeStatusReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ChangeStatusResp>(`/api/sys/users/${param0}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get current user info GET /api/sys/users/current */
export async function userCurrentInfoApiSysUsersCurrent(options?: { [key: string]: any }) {
  return request<API.UserCurrentInfoResp>('/api/sys/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get user list GET /api/sys/users/list */
export async function userListApiSysUsersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userListApiSysUsersListParams,
  options?: { [key: string]: any },
) {
  return request<API.UserListResp>('/api/sys/users/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/sys/users/login */
export async function loginApiSysUserslogin(body: API.LoginReq, options?: { [key: string]: any }) {
  return request<API.LoginResp>('/api/sys/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
