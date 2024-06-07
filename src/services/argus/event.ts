// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 通用推送接口 POST /api/argus/event/ */
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

/** 夜莺告警推送接口 POST /api/argus/event/n9e */
export async function N9eEventCatchApiArgusEventN9e(
  body: ARGUS.EventReq,
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

/** 查询请求时间列表 GET /api/argus/event/requests */
export async function eventRequestPageListApiArgusEventRequests(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.eventRequestPageListApiArgusEventRequestsParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.EventRequestPageListResp>("/api/argus/event/requests", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询请求时间列表 GET /api/argus/event/requests/${param0} */
export async function eventRequestReadOneApiArgusEventByRequestsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.eventRequestReadOneApiArgusEventByRequestsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.EventRequestReadOnetResp>(
    `/api/argus/event/requests/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}
