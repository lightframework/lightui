// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询au列表 GET /api/ops/au/ */
export async function auPageListApiOpsAu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.auPageListApiOpsAuParams,
  options?: { [key: string]: any },
) {
  return request<OPS.AuPageListResp>("/api/ops/au/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加au集合 POST /api/ops/au/ */
export async function auCreateApiOpsAu(
  body: OPS.AuCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.AuCreateResp>("/api/ops/au/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个au数据详情 GET /api/ops/au/${param0} */
export async function auReadOneApiOpsAuById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.auReadOneApiOpsAuByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.AuReadOneResp>(`/api/ops/au/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改au的ip信息 PUT /api/ops/au/${param0} */
export async function auUpdateApiOpsAuById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.auUpdateApiOpsAuByIdParams,
  body: OPS.AuUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.AuUpdateResp>(`/api/ops/au/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除au集合 DELETE /api/ops/au/${param0} */
export async function auDeleteApiOpsAuById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.auDeleteApiOpsAuByIdParams,
  body: OPS.AuDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.AuDeleteResp>(`/api/ops/au/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询AU的操作列表 GET /api/ops/au/options */
export async function auOptionsApiOpsAuOptions(options?: {
  [key: string]: any
}) {
  return request<OPS.AuOptionsResp>("/api/ops/au/options", {
    method: "GET",
    ...(options || {}),
  })
}

/** 推送au POST /api/ops/au/push */
export async function auPushApiOpsAuPush(
  body: OPS.AuPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.AuPushResp>("/api/ops/au/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询au记录的列表 GET /api/ops/au/record */
export async function auRecordPageListApiOpsAuRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.auRecordPageListApiOpsAuRecordParams,
  options?: { [key: string]: any },
) {
  return request<OPS.AuRecordPageListResp>("/api/ops/au/record", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
