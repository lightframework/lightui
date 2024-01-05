// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询ipset列表 GET /api/ops/ipsets/ */
export async function ipsetPageListApiOpsIpsets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetPageListApiOpsIpsetsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetPageListResp>("/api/ops/ipsets/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加ipset集合 POST /api/ops/ipsets/ */
export async function ipsetCreateApiOpsIpsets(
  body: OPS.IpsetCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetCreateResp>("/api/ops/ipsets/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个ipset数据详情 GET /api/ops/ipsets/${param0} */
export async function ipsetReadOneApiOpsIpsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetReadOneApiOpsIpsetsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetReadOneResp>(`/api/ops/ipsets/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  })
}

/** 修改ipset信息 PUT /api/ops/ipsets/${param0} */
export async function ipsetUpdateApiOpsIpsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetUpdateApiOpsIpsetsByIdParams,
  body: OPS.IpsetUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetUpdateResp>(`/api/ops/ipsets/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除ipset集合 DELETE /api/ops/ipsets/${param0} */
export async function ipsetDeleteApiOpsIpsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetDeleteApiOpsIpsetsByIdParams,
  body: OPS.IpsetDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetDeleteResp>(`/api/ops/ipsets/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 获取ipset所有版本 GET /api/ops/ipsets/${param0}/versions */
export async function ipsetVersionsApiOpsIpsetsByIdversions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetVersionsApiOpsIpsetsByIdversionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.ipsetVersionsResp>(`/api/ops/ipsets/${param0}/versions`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 回退ipset POST /api/ops/ipsets/back */
export async function ipsetBackApiOpsIpsetsBack(
  body: OPS.IpsetBackReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetBackResp>("/api/ops/ipsets/back", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 推送ipset POST /api/ops/ipsets/push */
export async function ipsetPushApiOpsIpsetsPush(
  body: OPS.IpsetPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetPushResp>("/api/ops/ipsets/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询ipset推送记录 GET /api/ops/ipsets/pushrecords */
export async function ipsetPushRecordsPageListApiOpsIpsetsPushrecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetPushRecordsPageListApiOpsIpsetsPushrecordsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetPushRecordsPageListResp>(
    "/api/ops/ipsets/pushrecords",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}

/** 获取单个ipset推送记录 GET /api/ops/ipsets/pushrecords/${param0} */
export async function ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetPushRecordsReadOneResp>(
    `/api/ops/ipsets/pushrecords/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 获取全部Ipset的全部版本 GET /api/ops/ipsets/versions */
export async function allIpsetVersionsApiOpsIpsetsVersions(options?: {
  [key: string]: any
}) {
  return request<OPS.AllIpsetVersionsResp>("/api/ops/ipsets/versions", {
    method: "GET",
    ...(options || {}),
  })
}
