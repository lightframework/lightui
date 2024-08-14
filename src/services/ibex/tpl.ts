// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询任务列表 GET /api/ibex/tasks */
export async function taskListApiIbexTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.taskListApiIbexTasksParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.TaskRecordListResp>("/api/ibex/tasks", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加任务 POST /api/ibex/tasks */
export async function taskCreateApiIbexTasks(
  body: IBEX.TaskRecordCreateReq,
  options?: { [key: string]: any },
) {
  return request<IBEX.TaskRecordCreateResp>("/api/ibex/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询任务详情 GET /api/ibex/tasks/${param0} */
export async function taskReadOneApiIbexByTasksid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.taskReadOneApiIbexByTasksidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.TaskReadOneResp>(`/api/ibex/tasks/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改任务信息 PUT /api/ibex/tasks/${param0} */
export async function taskUpdateApiIbexByTasksid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.taskUpdateApiIbexByTasksidParams,
  body: IBEX.TaskRecordUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.TaskRecordUpdateResp>(`/api/ibex/tasks/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询脚本列表 GET /api/ibex/tpls */
export async function tplListApiIbexTpls(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.tplListApiIbexTplsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.TaskTplListResp>("/api/ibex/tpls", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加脚本 POST /api/ibex/tpls */
export async function tplCreateApiIbexTpls(
  body: IBEX.TaskTplCreateReq,
  options?: { [key: string]: any },
) {
  return request<IBEX.TaskTplCreateResp>("/api/ibex/tpls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询脚本详情 GET /api/ibex/tpls/${param0} */
export async function tplReadOneApiIbexByTplsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.tplReadOneApiIbexByTplsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.TaskTplReadOneResp>(`/api/ibex/tpls/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改脚本信息 PUT /api/ibex/tpls/${param0} */
export async function tplUpdateApiIbexByTplsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.tplUpdateApiIbexByTplsidParams,
  body: IBEX.TaskTplUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.TaskTplUpdateResp>(`/api/ibex/tpls/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除脚本 DELETE /api/ibex/tpls/${param0} */
export async function tplDeleteApiIbexByTplsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.tplDeleteApiIbexByTplsidParams,
  body: IBEX.TaskTplDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.TaskTplDeleteResp>(`/api/ibex/tpls/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
