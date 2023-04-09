// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get team list GET /sys/v1/teams/ */
export async function listSysTeams(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSysTeamsParams,
  options?: { [key: string]: any },
) {
  return request<API.TeamListResp>('/sys/v1/teams/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add team POST /sys/v1/teams/ */
export async function addSysTeams(body: API.TeamInfo, options?: { [key: string]: any }) {
  return request<API.BaseResp>('/sys/v1/teams/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get team info GET /sys/v1/teams/${param0} */
export async function infoSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoSysTeamsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TeamListResp>(`/sys/v1/teams/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update team info PUT /sys/v1/teams/${param0} */
export async function editSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editSysTeamsByIdParams,
  body: API.TeamEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/teams/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update team info DELETE /sys/v1/teams/${param0} */
export async function deleteSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSysTeamsByIdParams,
  body: API.PathIdReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/teams/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** get member list GET /sys/v1/teams/${param0}/users */
export async function memListSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memListSysTeamsByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserListResp>(`/sys/v1/teams/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** add member POST /sys/v1/teams/${param0}/users */
export async function memAddSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memAddSysTeamsByIdusersParams,
  body: API.TeamMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/teams/${param0}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove member DELETE /sys/v1/teams/${param0}/users */
export async function memDelSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memDelSysTeamsByIdusersParams,
  body: API.TeamMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResp>(`/sys/v1/teams/${param0}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
