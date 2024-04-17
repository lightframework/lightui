// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 此处后端没有提供注释 GET /api/argus/alerts/ */
export async function alertPageListApiArgusAlerts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.alertPageListApiArgusAlertsParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.AlertPageListResp>("/api/argus/alerts/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/alerts/${param0} */
export async function alertReadOneRespApiArgusAlertsByHash(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.alertReadOneRespApiArgusAlertsByHashParams,
  options?: { [key: string]: any },
) {
  const { hash: param0, ...queryParams } = params
  return request<ARGUS.AlertReadOneResp>(`/api/argus/alerts/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/alerts/cards */
export async function alertCardsApiArgusAlertsCards(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.alertCardsApiArgusAlertsCardsParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.AlertCardsResp>("/api/argus/alerts/cards", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/alerts/his */
export async function hisAlertPageListApiArgusAlertsHis(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.hisAlertPageListApiArgusAlertsHisParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.HisAlertPageListResp>("/api/argus/alerts/his", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
