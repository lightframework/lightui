// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询监控配置项列表 GET /api/ibex/ctfs/ */
export async function ctfTplListApiIbexCtfs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.ctfTplListApiIbexCtfsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.CtfTplListResp>("/api/ibex/ctfs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加监控配置项 POST /api/ibex/ctfs/ */
export async function ctfTplCreateApiIbexCtfs(
  body: IBEX.CtfTplCreateReq,
  options?: { [key: string]: any },
) {
  return request<IBEX.CtfTplCreateResp>("/api/ibex/ctfs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改监控配置项信息 PUT /api/ibex/ctfs/${param0} */
export async function ctfTplUpdateApiIbexCtfsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.ctfTplUpdateApiIbexCtfsByIdParams,
  body: IBEX.CtfTplUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.CtfTplUpdateResp>(`/api/ibex/ctfs/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除监控配置项 DELETE /api/ibex/ctfs/${param0} */
export async function ctfTplDeleteApiIbexCtfsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.ctfTplDeleteApiIbexCtfsByIdParams,
  body: IBEX.CtfTplDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.CtfTplDeleteResp>(`/api/ibex/ctfs/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询监控配置项列表 GET /api/ibex/ctfs/options */
export async function ctfTplOptionsApiIbexCtfsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.ctfTplOptionsApiIbexCtfsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.CtfTplOptionsResp>("/api/ibex/ctfs/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
