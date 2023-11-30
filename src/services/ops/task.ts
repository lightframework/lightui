// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 执行步骤 POST /api/ops/phases/${param0} */
export async function phaseRunApiOpsByPhasesid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.phaseRunApiOpsByPhasesidParams,
  body: OPS.PhaseRunReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.PhaseRunResp>(`/api/ops/phases/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 手动确认 POST /api/ops/phases/${param0}/confirm */
export async function phaseConfirmApiOpsByPhasesidconfirm(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.phaseConfirmApiOpsByPhasesidconfirmParams,
  body: OPS.PhaseConfirmReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.PhaseConfirmResp>(`/api/ops/phases/${param0}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 撤销子任务 POST /api/ops/subtasks/${param0}/cancel */
export async function subTaskCancelApiOpsBySubtasksidcancel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.subTaskCancelApiOpsBySubtasksidcancelParams,
  body: OPS.SubTaskCancelReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.SubTaskCancelResp>(`/api/ops/subtasks/${param0}/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 更新子任务 GET /api/ops/subtasks/${param0}/conf/createhost */
export async function getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehostParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.GetCreateHostSubTaskConfResp>(
    `/api/ops/subtasks/${param0}/conf/createhost`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 更新子任务 POST /api/ops/subtasks/${param0}/createhost */
export async function updateCreateHostSubTaskApiOpsBySubtasksidcreatehost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.updateCreateHostSubTaskApiOpsBySubtasksidcreatehostParams,
  body: OPS.UpdateCreateHostSubTaskReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.UpdateCreateHostSubTaskResp>(
    `/api/ops/subtasks/${param0}/createhost`,
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

/** 查看子任务执行步骤 GET /api/ops/subtasks/${param0}/phases */
export async function subTaskPhaseListApiOpsBySubtasksidphases(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.subTaskPhaseListApiOpsBySubtasksidphasesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.SubTaskPhaseListResp>(
    `/api/ops/subtasks/${param0}/phases`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 查询任务列表 GET /api/ops/tasks */
export async function taskPageListApiOpsTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.taskPageListApiOpsTasksParams,
  options?: { [key: string]: any },
) {
  return request<OPS.TaskPageListResp>("/api/ops/tasks", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 执行步骤 POST /api/ops/tasks/${param0} */
export async function taskRunApiOpsByTasksid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.taskRunApiOpsByTasksidParams,
  body: OPS.TaskRunReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.TaskRunResp>(`/api/ops/tasks/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查看子任务列表 GET /api/ops/tasks/${param0}/subtasks */
export async function subTaskListApiOpsByTasksidsubtasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.subTaskListApiOpsByTasksidsubtasksParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.SubTaskListResp>(`/api/ops/tasks/${param0}/subtasks`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}
