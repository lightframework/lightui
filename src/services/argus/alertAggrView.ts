// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询告警聚合规则列表 GET /api/argus/alert-aggr-views/ */
export async function alertAggrViewItemsApiArgusAlertAggrViews(options?: {
  [key: string]: any
}) {
  return request<ARGUS.AlertAggrViewItemsResp>("/api/argus/alert-aggr-views/", {
    method: "GET",
    ...(options || {}),
  })
}

/** 添加告警聚合规则 POST /api/argus/alert-aggr-views/ */
export async function AlertAggrViewCreateApiArgusAlertAggrViews(
  body: ARGUS.AlertAggrViewCreateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.AlertAggrViewCreateResp>(
    "/api/argus/alert-aggr-views/",
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

/** 修改告警聚合规则信息 PUT /api/argus/alert-aggr-views/${param0} */
export async function alertAggrViewUpdateApiArgusAlertAggrViewsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.alertAggrViewUpdateApiArgusAlertAggrViewsByIdParams,
  body: ARGUS.AlertAggrViewUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.AlertAggrViewUpdateResp>(
    `/api/argus/alert-aggr-views/${param0}`,
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

/** 删除告警聚合规则 DELETE /api/argus/alert-aggr-views/${param0} */
export async function alertAggrViewDeleteApiArgusAlertAggrViewsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.alertAggrViewDeleteApiArgusAlertAggrViewsByIdParams,
  body: ARGUS.AlertAggrViewDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.AlertAggrViewDeleteResp>(
    `/api/argus/alert-aggr-views/${param0}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}
