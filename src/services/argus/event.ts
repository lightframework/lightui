// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 通用推送接口 POST /api/argus/event/ */
export async function EventCathApiArgusEvent(
  body: ARGUS.EventReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

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

/** Orch告警创建 POST /api/argus/event/orch/alerts/create */
export async function orchAlertCreateApiArgusEventOrchalertscreate(
  body: ARGUS.OrchAlertCreateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/orch/alerts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** Orch告警更新 POST /api/argus/event/orch/alerts/update */
export async function orchAlertUpdateApiArgusEventOrchalertsupdate(
  body: ARGUS.OrchAlertUpdateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventResp>("/api/argus/event/orch/alerts/update", {
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
