// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询主机列表 GET /api/cmdb/hosts/ */
export async function hostPageListApiCmdbHosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostPageListApiCmdbHostsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPageListResp>("/api/cmdb/hosts/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加主机 POST /api/cmdb/hosts/ */
export async function hostCreateApiCmdbHosts(
  body: CMDB.HostCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostCreateResp>("/api/cmdb/hosts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看主机信息 GET /api/cmdb/hosts/${param0} */
export async function hostInfoApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostInfoApiCmdbHostsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostInfoResp>(`/api/cmdb/hosts/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改主机信息 PUT /api/cmdb/hosts/${param0} */
export async function hostUpdateApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostUpdateApiCmdbHostsByUidParams,
  body: CMDB.HostUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostUpdateResp>(`/api/cmdb/hosts/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除主机 DELETE /api/cmdb/hosts/${param0} */
export async function hostDeleteApiCmdbHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostDeleteApiCmdbHostsByUidParams,
  body: CMDB.HostDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostDelResp>(`/api/cmdb/hosts/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 环境-主机类型查询树 GET /api/cmdb/hosts/envhosttype */
export async function envHostTypeTreeApiCmdbHostsEnvhosttype(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envHostTypeTreeApiCmdbHostsEnvhosttypeParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvHostTypeResp>("/api/cmdb/hosts/envhosttype", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 主机类型-环境查询树 GET /api/cmdb/hosts/hosttypeenv */
export async function hostTypeEnvTreeApiCmdbHostsHosttypeenv(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostTypeEnvTreeApiCmdbHostsHosttypeenvParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostTypeEnvResp>("/api/cmdb/hosts/hosttypeenv", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询主机列表 GET /api/cmdb/hosts/list */
export async function hostListApiCmdbHostsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostListApiCmdbHostsListParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostListResp>("/api/cmdb/hosts/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
