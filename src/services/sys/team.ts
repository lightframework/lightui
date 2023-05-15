// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get team list GET /api/sys/teams/ */
export async function listApiSysTeams(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listApiSysTeamsParams,
  options?: { [key: string]: any },
) {
  return request<API.TeamListResp>('/api/sys/teams/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add team POST /api/sys/teams/ */
export async function addApiSysTeams(body: API.TeamInfo, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/api/sys/teams/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get team info GET /api/sys/teams/${param0} */
export async function infoApiSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoApiSysTeamsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TeamListResp>(`/api/sys/teams/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update team info PUT /api/sys/teams/${param0} */
export async function editApiSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editApiSysTeamsByIdParams,
  body: API.TeamEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/api/sys/teams/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update team info DELETE /api/sys/teams/${param0} */
export async function deleteApiSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteApiSysTeamsByIdParams,
  body: API.PathIdReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/api/sys/teams/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get member list GET /api/sys/teams/${param0}/users */
export async function memListApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memListApiSysTeamsByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserListResp>(`/api/sys/teams/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** add member POST /api/sys/teams/${param0}/users */
export async function memAddApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memAddApiSysTeamsByIdusersParams,
  body: API.TeamMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/api/sys/teams/${param0}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove member DELETE /api/sys/teams/${param0}/users */
export async function memDelApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memDelApiSysTeamsByIdusersParams,
  body: API.TeamMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/api/sys/teams/${param0}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
