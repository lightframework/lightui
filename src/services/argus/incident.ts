// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 此处后端没有提供注释 GET /api/argus/incidents/ */
export async function incidentPageListApiArgusIncidents(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentPageListApiArgusIncidentsParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.IncidentPageListResp>("/api/argus/incidents/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/incidents/${param0} */
export async function incidentReadOneApiArgusIncidentsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentReadOneApiArgusIncidentsByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.IncidentReadOneResp>(`/api/argus/incidents/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/incidents/${param0}/alerts */
export async function incidentAlertsApiArgusIncidentsByIdalerts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentAlertsApiArgusIncidentsByIdalertsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.IncidentAlertsResp>(
    `/api/argus/incidents/${param0}/alerts`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 此处后端没有提供注释 POST /api/argus/incidents/${param0}/comments */
export async function incidentCommentApiArgusIncidentsByIdcomments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentCommentApiArgusIncidentsByIdcommentsParams,
  body: ARGUS.IncidentCommentReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.IncidentCommentResp>(
    `/api/argus/incidents/${param0}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 此处后端没有提供注释 POST /api/argus/incidents/${param0}/dingclaim */
export async function incidentDingClaimApiArgusIncidentsByIddingclaim(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentDingClaimApiArgusIncidentsByIddingclaimParams,
  body: ARGUS.IncidentDingClaimReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.IncidentDingClaimResp>(
    `/api/argus/incidents/${param0}/dingclaim`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 此处后端没有提供注释 GET /api/argus/incidents/${param0}/flows */
export async function incidentFlowsApiArgusIncidentsByIdflows(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentFlowsApiArgusIncidentsByIdflowsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.IncidentFlowsResp>(
    `/api/argus/incidents/${param0}/flows`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 此处后端没有提供注释 POST /api/argus/incidents/claim */
export async function incidentClaimApiArgusIncidentsClaim(
  body: ARGUS.IncidentClaimReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.IncidentClaimResp>("/api/argus/incidents/claim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/incidents/list */
export async function incidentListApiArgusIncidentsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.incidentListApiArgusIncidentsListParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.IncidentListResp>("/api/argus/incidents/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /api/argus/incidents/resign */
export async function incidentResignApiArgusIncidentsResign(
  body: ARGUS.IncidentResignReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.IncidentResignResp>("/api/argus/incidents/resign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
