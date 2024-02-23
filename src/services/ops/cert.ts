// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询cert列表 GET /api/ops/certs/ */
export async function certPageListApiOpsCerts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certPageListApiOpsCertsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.CertPageListResp>("/api/ops/certs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加cert集合 POST /api/ops/certs/ */
export async function certCreateApiOpsCerts(
  body: OPS.CertCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.CertCreateResp>("/api/ops/certs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个cert详情 GET /api/ops/certs/${param0} */
export async function certReadOneApiOpsCertsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certReadOneApiOpsCertsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertReadOneResp>(`/api/ops/certs/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 更新cert集合 PUT /api/ops/certs/${param0} */
export async function certUpdateApiOpsCertsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certUpdateApiOpsCertsByIdParams,
  body: OPS.CertUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertUpdateResp>(`/api/ops/certs/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除cert集合 DELETE /api/ops/certs/${param0} */
export async function certDeleteApiOpsCertsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certDeleteApiOpsCertsByIdParams,
  body: OPS.CertDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertDeleteResp>(`/api/ops/certs/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 告警cert到期 POST /api/ops/certs/alarm */
export async function certAlarmApiOpsCertsAlarm(
  body: OPS.CertAlarmReq,
  options?: { [key: string]: any },
) {
  return request<OPS.CertAlarmResp>("/api/ops/certs/alarm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 导出cert证书 POST /api/ops/certs/export/${param0} */
export async function certExportApiOpsCertsByExportid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certExportApiOpsCertsByExportidParams,
  body: OPS.CertExportReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertExportResp>(`/api/ops/certs/export/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 获取cert列表 GET /api/ops/certs/list */
export async function certListApiOpsCertsList(options?: {
  [key: string]: any
}) {
  return request<OPS.CertListResp>("/api/ops/certs/list", {
    method: "GET",
    ...(options || {}),
  })
}

/** 推送cert POST /api/ops/certs/push */
export async function certPushApiOpsCertsPush(
  body: OPS.CertPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.CertPushResp>("/api/ops/certs/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询certRecord列表 GET /api/ops/certs/records */
export async function certRecordPageListApiOpsCertsRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certRecordPageListApiOpsCertsRecordsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.CertRecordPageListResp>("/api/ops/certs/records", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取单个certRecord详情 GET /api/ops/certs/records/${param0} */
export async function certRecordReadOneApiOpsCertsByRecordsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certRecordReadOneApiOpsCertsByRecordsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertRecordReadOneResp>(
    `/api/ops/certs/records/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 自动删除cert证书 POST /api/ops/certs/remove */
export async function certRemoveApiOpsCertsRemove(
  body: OPS.CertRemoveReq,
  options?: { [key: string]: any },
) {
  return request<OPS.CertRemoveResp>("/api/ops/certs/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 同步cert数据 POST /api/ops/certs/sync */
export async function certSyncApiOpsCertsSync(
  body: OPS.CertSyncReq,
  options?: { [key: string]: any },
) {
  return request<OPS.CertSyncResp>("/api/ops/certs/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
