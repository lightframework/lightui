// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get team list GET sys/v1/teams/ */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.TeamListResp>(`api/sys/v1/teams/`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add team POST sys/v1/teams/ */
export async function add(body: API.TeamAddReq, options?: { [key: string]: any }) {
  return request<API.Team>(`api/sys/v1/teams/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get team info GET sys/v1/teams/${param0} */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Team>(`api/sys/v1/teams/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update team info PUT sys/v1/teams/${param0} */
export async function edit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editParams,
  body: API.TeamEditReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultResp>(`api/sys/v1/teams/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update team info DELETE sys/v1/teams/${param0} */
export async function deleteUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  body: API.TeamDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultResp>(`api/sys/v1/teams/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET sys/v1/teams/${param0}/users */
export async function memList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memListParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserListResp>(`api/sys/v1/teams/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST sys/v1/teams/${param0}/users */
export async function memAdd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memAddParams,
  body: API.TeamMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultResp>(`api/sys/v1/teams/${param0}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE sys/v1/teams/${param0}/users */
export async function memDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memDelParams,
  body: API.TeamMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultResp>(`api/sys/v1/teams/${param0}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
