// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 添加策略 POST /api/argus/event/ */
export async function EventCatchApiArgusEvent(
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
