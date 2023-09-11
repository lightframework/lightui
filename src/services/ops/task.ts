// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 执行步骤 POST /api/ops/phases/${param0} */
export async function phaseRunApiOpsByPhasesid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.phaseRunApiOpsByPhasesidParams,
  body: API.PhaseRunReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PhaseRunResp>(`/api/ops/phases/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查看子任务执行步骤 GET /api/ops/subtasks/${param0}/phases */
export async function subTaskPhaseListApiOpsBySubtasksidphases(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subTaskPhaseListApiOpsBySubtasksidphasesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SubTaskPhaseListResp>(`/api/ops/subtasks/${param0}/phases`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询任务列表 GET /api/ops/tasks */
export async function taskPageListApiOpsTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.taskPageListApiOpsTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskPageListResp>('/api/ops/tasks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看子任务列表 GET /api/ops/tasks/${param0}/subtasks */
export async function subTaskListApiOpsByTasksidsubtasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subTaskListApiOpsByTasksidsubtasksParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SubTaskListResp>(`/api/ops/tasks/${param0}/subtasks`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
