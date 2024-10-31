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

/** 删除主机 DELETE /api/cmdb/hosts/ */
export async function hostDeleteApiCmdbHosts(
  body: CMDB.HostDelReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostDelResp>("/api/cmdb/hosts/", {
    method: "DELETE",
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

/** 获取所有主机 GET /api/cmdb/hosts/adminable */
export async function getHostsByAdminApiCmdbHostsAdminable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.getHostsByAdminApiCmdbHostsAdminableParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPageListResp>("/api/cmdb/hosts/adminable", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取有权编辑的主机 GET /api/cmdb/hosts/editable */
export async function getHostsByEditAbleApiCmdbHostsEditable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.getHostsByEditAbleApiCmdbHostsEditableParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPageListResp>("/api/cmdb/hosts/editable", {
    method: "GET",
    params: {
      ...params,
    },
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

/** 获取有权操作的主机 GET /api/cmdb/hosts/execable */
export async function getHostsByExecAbleApiCmdbHostsExecable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.getHostsByExecAbleApiCmdbHostsExecableParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPageListResp>("/api/cmdb/hosts/execable", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 导出主机列表 POST /api/cmdb/hosts/export */
export async function hostExportApiCmdbHostsExport(
  body: CMDB.HostExportReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostExportResp>("/api/cmdb/hosts/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询可导出字段 GET /api/cmdb/hosts/fields */
export async function hostFieldsApiCmdbHostsFields(options?: {
  [key: string]: any
}) {
  return request<CMDB.HostFieldsResp>("/api/cmdb/hosts/fields", {
    method: "GET",
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

/** 查询主机列表 GET /api/cmdb/hosts/options */
export async function hostOptionsApiCmdbHostsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostOptionsApiCmdbHostsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostOptionsResp>("/api/cmdb/hosts/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取主机公网ip通过app GET /api/cmdb/hosts/publicip */
export async function hostPublicIpByAppApiCmdbHostsPublicip(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hostPublicIpByAppApiCmdbHostsPublicipParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPublicIpByAppResp>("/api/cmdb/hosts/publicip", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取有权查看的主机 GET /api/cmdb/hosts/readable */
export async function getHostsByReadAbleApiCmdbHostsReadable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.getHostsByReadAbleApiCmdbHostsReadableParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostPageListResp>("/api/cmdb/hosts/readable", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取主机秘钥名称列表 GET /api/cmdb/hosts/secrets */
export async function secretApiCmdbHostsSecrets(options?: {
  [key: string]: any
}) {
  return request<CMDB.HostSecretResp>("/api/cmdb/hosts/secrets", {
    method: "GET",
    ...(options || {}),
  })
}

/** 同步主机 POST /api/cmdb/hosts/sync */
export async function syncApiCmdbHostsSync(
  body: CMDB.HostSyncReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostSyncResp>("/api/cmdb/hosts/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取团队的权限主机 POST /api/cmdb/hosts/teamable */
export async function getHostsByTeamApiCmdbHostsTeamable(
  body: CMDB.GetHostsByTeamReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.TeamHostPageListResp>("/api/cmdb/hosts/teamable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取主机树形结构 GET /api/cmdb/hosts/tree */
export async function treeApiCmdbHostsTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.treeApiCmdbHostsTreeParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostTreeResp>("/api/cmdb/hosts/tree", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 上传主机 POST /api/cmdb/hosts/upload */
export async function hostUploadApiCmdbHostsUpload(
  body: CMDB.HostUploadReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostUploadResp>("/api/cmdb/hosts/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
