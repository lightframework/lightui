// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询团队列表 GET /api/sys/teams/ */
export async function teamListApiSysTeams(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamListApiSysTeamsParams,
  options?: { [key: string]: any },
) {
  return request<SYS.TeamListResp>("/api/sys/teams/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加团队 POST /api/sys/teams/ */
export async function TeamCreateApiSysTeams(
  body: SYS.TeamCreateReq,
  options?: { [key: string]: any },
) {
  return request<SYS.Empty>("/api/sys/teams/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改团队信息 PUT /api/sys/teams/${param0} */
export async function teamUpdateApiSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamUpdateApiSysTeamsByIdParams,
  body: SYS.TeamUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除团队 DELETE /api/sys/teams/${param0} */
export async function teamDeleteApiSysTeamsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamDeleteApiSysTeamsByIdParams,
  body: SYS.TeamDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 编辑团队资源权限 PUT /api/sys/teams/${param0}/perms */
export async function TeamPermUpdateApiSysTeamsByIdperms(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.TeamPermUpdateApiSysTeamsByIdpermsParams,
  body: SYS.TeamPermUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}/perms`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 添加团队资源权限 POST /api/sys/teams/${param0}/perms */
export async function TeamPermAddApiSysTeamsByIdperms(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.TeamPermAddApiSysTeamsByIdpermsParams,
  body: SYS.TeamPermsAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}/perms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 移除团队资源权限 DELETE /api/sys/teams/${param0}/perms */
export async function TeamPermsDelApiSysTeamsByIdperms(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.TeamPermsDelApiSysTeamsByIdpermsParams,
  body: SYS.TeamPermsDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}/perms`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询团队成员列表 GET /api/sys/teams/${param0}/users */
export async function teamMemListApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamMemListApiSysTeamsByIdusersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.TeamMemListResp>(`/api/sys/teams/${param0}/users`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 添加团队成员 POST /api/sys/teams/${param0}/users */
export async function teamMemAddApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamMemAddApiSysTeamsByIdusersParams,
  body: SYS.TeamMemAddReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 移除团队成员 DELETE /api/sys/teams/${param0}/users */
export async function teamMemDelApiSysTeamsByIdusers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.teamMemDelApiSysTeamsByIdusersParams,
  body: SYS.TeamMemDelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.Empty>(`/api/sys/teams/${param0}/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
