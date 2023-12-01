// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询资源回收分页列表 GET /api/ops/releases/ */
export async function releasePageListApiOpsReleases(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.releasePageListApiOpsReleasesParams,
  options?: { [key: string]: any },
) {
  return request<OPS.ReleasePageListResp>("/api/ops/releases/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询回收主机 POST /api/ops/releases/hosts */
export async function releaseHostApiOpsReleasesHosts(
  body: OPS.ReleaseHostReq,
  options?: { [key: string]: any },
) {
  return request<OPS.ReleaseHostResp>("/api/ops/releases/hosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询回收主机 POST /api/ops/releases/instances */
export async function releaseInstanceApiOpsReleasesInstances(
  body: OPS.ReleaseInstanceReq,
  options?: { [key: string]: any },
) {
  return request<OPS.ReleaseInstanceResp>("/api/ops/releases/instances", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
