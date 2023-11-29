// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询回收主机 GET /api/ops/releasehosts/ */
export async function releaseHostPageListApiOpsReleasehosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.releaseHostPageListApiOpsReleasehostsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.ReleaseHostPageListResp>("/api/ops/releasehosts/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
