// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询domainset列表 GET /api/ops/domainsets/ */
export async function domainsetPageListApiOpsDomainsets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetPageListApiOpsDomainsetsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetPageListResp>("/api/ops/domainsets/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加domainset集合 POST /api/ops/domainsets/ */
export async function domainsetCreateApiOpsDomainsets(
  body: OPS.DomainsetCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetCreateResp>("/api/ops/domainsets/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个domainset数据详情 GET /api/ops/domainsets/${param0} */
export async function domainsetReadOneApiOpsDomainsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetReadOneApiOpsDomainsetsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainsetReadOneResp>(`/api/ops/domainsets/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  })
}

/** 修改domainset信息 PUT /api/ops/domainsets/${param0} */
export async function domainsetUpdateApiOpsDomainsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetUpdateApiOpsDomainsetsByIdParams,
  body: OPS.DomainsetUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainsetUpdateResp>(`/api/ops/domainsets/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除domainset集合 DELETE /api/ops/domainsets/${param0} */
export async function domainsetDeleteApiOpsDomainsetsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetDeleteApiOpsDomainsetsByIdParams,
  body: OPS.DomainsetDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainsetDeleteResp>(`/api/ops/domainsets/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 获取domainset所有版本 GET /api/ops/domainsets/${param0}/versions */
export async function domainsetVersionsApiOpsDomainsetsByIdversions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetVersionsApiOpsDomainsetsByIdversionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.domainsetVersionsResp>(
    `/api/ops/domainsets/${param0}/versions`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 回退domainset POST /api/ops/domainsets/back */
export async function domainsetBackApiOpsDomainsetsBack(
  body: OPS.DomainsetBackReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetBackResp>("/api/ops/domainsets/back", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取env当前domainset及版本 GET /api/ops/domainsets/env/${param0} */
export async function domainsetVersionsOfEnvApiOpsDomainsetsByEnvuid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetVersionsOfEnvApiOpsDomainsetsByEnvuidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<OPS.DomainsetVersionsOfEnvResp>(
    `/api/ops/domainsets/env/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 上线domainset POST /api/ops/domainsets/online */
export async function domainsetOnlineApiOpsDomainsetsOnline(
  body: OPS.DomainsetOnlineReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetOnlineResp>("/api/ops/domainsets/online", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 推送domainset POST /api/ops/domainsets/push */
export async function domainsetPushApiOpsDomainsetsPush(
  body: OPS.DomainsetPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetPushResp>("/api/ops/domainsets/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询domainset推送记录 GET /api/ops/domainsets/pushrecords */
export async function domainsetPushRecordsPageListApiOpsDomainsetsPushrecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetPushRecordsPageListApiOpsDomainsetsPushrecordsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainsetPushRecordsPageListResp>(
    "/api/ops/domainsets/pushrecords",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}

/** 获取单个domainset推送记录 GET /api/ops/domainsets/pushrecords/${param0} */
export async function domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainsetPushRecordsReadOneResp>(
    `/api/ops/domainsets/pushrecords/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 获取所有tag GET /api/ops/domainsets/tag */
export async function domainsetListTagApiOpsDomainsetsTag(options?: {
  [key: string]: any
}) {
  return request<OPS.DomainsetListTagResp>("/api/ops/domainsets/tag", {
    method: "GET",
    ...(options || {}),
  })
}

/** 更新domainset的tag POST /api/ops/domainsets/tag/${param0} */
export async function domainsetUpdateTagApiOpsDomainsetsByTagid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainsetUpdateTagApiOpsDomainsetsByTagidParams,
  body: OPS.DomainsetUpdateTagReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainsetUpdateTagResp>(
    `/api/ops/domainsets/tag/${param0}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 获取全部Domainset的全部版本 GET /api/ops/domainsets/versions */
export async function domainsetAllVersionsApiOpsDomainsetsVersions(options?: {
  [key: string]: any
}) {
  return request<OPS.DomainsetAllVersionsResp>("/api/ops/domainsets/versions", {
    method: "GET",
    ...(options || {}),
  })
}
