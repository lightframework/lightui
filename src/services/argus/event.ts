// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 夜莺告警推送接口 POST /api/argus/event/n9e */
export async function N9eEventCatchApiArgusEventN9e(
  body: ARGUS.N9eEventReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/n9e", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** Orch告警推送接口 POST /api/argus/event/orch */
export async function OrchEventCatchApiArgusEventOrch(
  body: ARGUS.OrchEventReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/orch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 腾讯云告警推送接口 POST /api/argus/event/tencent */
export async function TencentEventCatchApiArgusEventTencent(
  body: ARGUS.TencentEventReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/tencent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
