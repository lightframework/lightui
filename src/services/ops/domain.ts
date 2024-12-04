// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询domain列表 GET /api/ops/domains/ */
export async function domainPageListApiOpsDomains(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainPageListApiOpsDomainsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainPageListResp>("/api/ops/domains/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加domain集合 POST /api/ops/domains/ */
export async function domainCreateApiOpsDomains(
  body: OPS.DomainCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainCreateResp>("/api/ops/domains/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除domain集合 DELETE /api/ops/domains/${param0} */
export async function domainDeleteApiOpsDomainsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainDeleteApiOpsDomainsByIdParams,
  body: OPS.DomainDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainDeleteResp>(`/api/ops/domains/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询certs列表 GET /api/ops/domains/${param0}/certs */
export async function domainCertsListApiOpsDomainsByIdcerts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainCertsListApiOpsDomainsByIdcertsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainCertsListResp>(`/api/ops/domains/${param0}/certs`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 告警domain到期 POST /api/ops/domains/alarm/duedays */
export async function domainAlarmDueDaysApiOpsDomainsAlarmduedays(
  body: OPS.DomainAlarmDueDaysReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAlarmDueDaysResp>("/api/ops/domains/alarm/duedays", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** domain负责人告警 POST /api/ops/domains/alarm/duty */
export async function domainAlarmDutyApiOpsDomainsAlarmduty(
  body: OPS.DomainAlarmDutyReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAlarmDutyResp>("/api/ops/domains/alarm/duty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 告警负责人未设置 POST /api/ops/domains/alarm/dutyperson */
export async function domainAlarmDutyPersonApiOpsDomainsAlarmdutyperson(
  body: OPS.DomainAlarmDutyPersonReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAlarmDutyPersonResp>(
    "/api/ops/domains/alarm/dutyperson",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  )
}

/** 告警负责人未响应 POST /api/ops/domains/alarm/noresponse */
export async function domainAlarmNoResponseApiOpsDomainsAlarmnoresponse(
  body: OPS.DomainAlarmNoResponseReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAlarmNoResponseResp>(
    "/api/ops/domains/alarm/noresponse",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  )
}

/** 告警待修改状态 POST /api/ops/domains/alarm/state */
export async function domainAlarmWaitingApiOpsDomainsAlarmstate(
  body: OPS.DomainAlarmWaitingReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAlarmWaitingResp>("/api/ops/domains/alarm/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新domain的备注 PUT /api/ops/domains/description/${param0} */
export async function domainUpdateDescribeApiOpsDomainsByDescriptionid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateDescribeApiOpsDomainsByDescriptionidParams,
  body: OPS.DomainUpdateDescribeReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateDescribeResp>(
    `/api/ops/domains/description/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** domain手动预下发操作 POST /api/ops/domains/drypush */
export async function domainDryPushApiOpsDomainsDrypush(
  body: OPS.DomainDryPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainDryPushResp>("/api/ops/domains/drypush", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** domain自动预下发操作 POST /api/ops/domains/drypush/auto */
export async function domainAutoDryPushApiOpsDomainsDrypushauto(
  body: OPS.DomainAutoDryPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAutoDryPushResp>("/api/ops/domains/drypush/auto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询domain到期天数 GET /api/ops/domains/duedays */
export async function domainDueDaysApiOpsDomainsDuedays(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainDueDaysApiOpsDomainsDuedaysParams,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainDueDaysResp>("/api/ops/domains/duedays", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 处理下发成功的域名 POST /api/ops/domains/handle */
export async function domainHandlePushApiOpsDomainsHandle(
  body: OPS.DomainHandlePushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainHandlePushResp>("/api/ops/domains/handle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新domain的host PUT /api/ops/domains/hosts/${param0} */
export async function domainUpdateHostApiOpsDomainsByHostsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateHostApiOpsDomainsByHostsidParams,
  body: OPS.DomainUpdateHostReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateHostResp>(`/api/ops/domains/hosts/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 更新domain的运营负责人 PUT /api/ops/domains/persons/duedays/${param0} */
export async function domainUpdateDueDaysPersonApiOpsDomainsByPersonsduedaysid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateDueDaysPersonApiOpsDomainsByPersonsduedaysidParams,
  body: OPS.DomainUpdateDueDaysPersonReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateDueDaysPersonResp>(
    `/api/ops/domains/persons/duedays/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 更新domain的负责人 PUT /api/ops/domains/persons/duty/${param0} */
export async function domainUpdateDutyPersonApiOpsDomainsByPersonsdutyid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateDutyPersonApiOpsDomainsByPersonsdutyidParams,
  body: OPS.DomainUpdateDutyPersonReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateDutyPersonResp>(
    `/api/ops/domains/persons/duty/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 更新domain的PushPerson PUT /api/ops/domains/persons/push/${param0} */
export async function domainUpdatePushPersonApiOpsDomainsByPersonspushid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdatePushPersonApiOpsDomainsByPersonspushidParams,
  body: OPS.DomainUpdatePushPersonReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdatePushPersonResp>(
    `/api/ops/domains/persons/push/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 更新domain的port PUT /api/ops/domains/port/${param0} */
export async function domainUpdatePortApiOpsDomainsByPortid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdatePortApiOpsDomainsByPortidParams,
  body: OPS.DomainUpdatePortReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdatePortResp>(`/api/ops/domains/port/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** domain手动下发操作 POST /api/ops/domains/push */
export async function domainPushApiOpsDomainsPush(
  body: OPS.DomainPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainPushResp>("/api/ops/domains/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** domain自动下发操作 POST /api/ops/domains/push/auto */
export async function domainAutoPushApiOpsDomainsPushauto(
  body: OPS.DomainAutoPushReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainAutoPushResp>("/api/ops/domains/push/auto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 自动删除domain证书 POST /api/ops/domains/remove */
export async function domainRemoveApiOpsDomainsRemove(
  body: OPS.DomainRemoveReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainRemoveResp>("/api/ops/domains/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新domain的续期状态 PUT /api/ops/domains/renewstate/${param0} */
export async function domainUpdateRenewStateApiOpsDomainsByRenewstateid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateRenewStateApiOpsDomainsByRenewstateidParams,
  body: OPS.DomainUpdateRenewStateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateRenewStateResp>(
    `/api/ops/domains/renewstate/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 更新domain的负责排班组 PUT /api/ops/domains/shifts/duty/${param0} */
export async function domainUpdateDutyShiftApiOpsDomainsByShiftsdutyid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateDutyShiftApiOpsDomainsByShiftsdutyidParams,
  body: OPS.DomainUpdateDutyShiftReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateDutyShiftResp>(
    `/api/ops/domains/shifts/duty/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 同步domain数据 POST /api/ops/domains/sync */
export async function domainSyncApiOpsDomainsSync(
  body: OPS.DomainSyncReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainSyncResp>("/api/ops/domains/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新domain的waf PUT /api/ops/domains/waf/${param0} */
export async function domainUpdateWafApiOpsDomainsByWafid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.domainUpdateWafApiOpsDomainsByWafidParams,
  body: OPS.DomainUpdateWafReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.DomainUpdateWafResp>(`/api/ops/domains/waf/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 负责人续期的回调 POST /api/ops/domains/webhook/duty */
export async function domainDutyWebHookApiOpsDomainsWebhookduty(
  body: OPS.DomainDutyWebHookReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainDutyWebHookResp>("/api/ops/domains/webhook/duty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** (预)下发失败的回调 POST /api/ops/domains/webhook/push */
export async function domainPushWebHookApiOpsDomainsWebhookpush(
  body: OPS.DomainPushWebHookReq,
  options?: { [key: string]: any },
) {
  return request<OPS.DomainPushWebHookResp>("/api/ops/domains/webhook/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
