// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询策略列表 GET /api/argus/tactics/ */
export async function tacticItemsApiArgusTactics(options?: {
  [key: string]: any
}) {
  return request<ARGUS.TacticItemsResp>("/api/argus/tactics/", {
    method: "GET",
    ...(options || {}),
  })
}

/** 添加策略 POST /api/argus/tactics/ */
export async function TacticCreateApiArgusTactics(
  body: ARGUS.TacticCreateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.TacticCreateResp>("/api/argus/tactics/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改策略信息 PUT /api/argus/tactics/${param0} */
export async function tacticUpdateApiArgusTacticsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.tacticUpdateApiArgusTacticsByIdParams,
  body: ARGUS.TacticUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.TacticUpdateResp>(`/api/argus/tactics/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除策略 DELETE /api/argus/tactics/${param0} */
export async function tacticDeleteApiArgusTacticsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.tacticDeleteApiArgusTacticsByIdParams,
  body: ARGUS.TacticDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.TacticDeleteResp>(`/api/argus/tactics/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
