// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询环境列表 GET /api/cmdb/envs/ */
export async function envPageListApiCmdbEnvs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envPageListApiCmdbEnvsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvPageListResp>("/api/cmdb/envs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加环境 POST /api/cmdb/envs/ */
export async function EnvCreateApiCmdbEnvs(
  body: CMDB.EnvCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvCreateResp>("/api/cmdb/envs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看环境信息 GET /api/cmdb/envs/${param0} */
export async function envReadOneApiCmdbEnvsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envReadOneApiCmdbEnvsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.EnvReadOneResp>(`/api/cmdb/envs/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改环境信息 PUT /api/cmdb/envs/${param0} */
export async function envUpdateApiCmdbEnvsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envUpdateApiCmdbEnvsByUidParams,
  body: CMDB.EnvUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.EnvUpdateResp>(`/api/cmdb/envs/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除环境 DELETE /api/cmdb/envs/${param0} */
export async function envDeleteApiCmdbEnvsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envDeleteApiCmdbEnvsByUidParams,
  body: CMDB.EnvDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.EnvDeleteResp>(`/api/cmdb/envs/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 获取全部env的info信息 GET /api/cmdb/envs/list */
export async function envListApiCmdbEnvsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envListApiCmdbEnvsListParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvListResp>("/api/cmdb/envs/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 对env加解锁 POST /api/cmdb/envs/lock */
export async function envLockApiCmdbEnvsLock(
  body: CMDB.EnvLockReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvLockResp>("/api/cmdb/envs/lock", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询环境列表 GET /api/cmdb/envs/options */
export async function envOptionsApiCmdbEnvsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.envOptionsApiCmdbEnvsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvOptionsResp>("/api/cmdb/envs/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 环境的Owner权限 POST /api/cmdb/envs/owners */
export async function envOwnerApiCmdbEnvsOwners(
  body: CMDB.EnvOwnerReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvOwnerResp>("/api/cmdb/envs/owners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 环境的pipline POST /api/cmdb/envs/piplines */
export async function envPiplineApiCmdbEnvsPiplines(
  body: CMDB.EnvPiplineReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvPiplineResp>("/api/cmdb/envs/piplines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 环境的piplineState POST /api/cmdb/envs/piplinestate */
export async function envPiplineStateApiCmdbEnvsPiplinestate(
  body: CMDB.EnvPiplineStateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.EnvPiplineStateResp>("/api/cmdb/envs/piplinestate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
