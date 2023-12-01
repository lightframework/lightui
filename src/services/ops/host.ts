// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 创建主机 POST /api/ops/hosts */
export async function hostCreateApiOpsHosts(
  body: OPS.HostCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.HostCreateResp>("/api/ops/hosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
