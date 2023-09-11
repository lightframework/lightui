// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 执行步骤 POST /api/ops/phases/${param0} */
export async function phaseRunApiOpsByPhasesid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.phaseRunApiOpsByPhasesidParams,
  body: OPS.PhaseRunReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<OPS.PhaseRunResp>(`/api/ops/phases/${param0}`, {
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
  params: OPS.subTaskPhaseListApiOpsBySubtasksidphasesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<OPS.SubTaskPhaseListResp>(
    `/api/ops/subtasks/${param0}/phases`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询任务列表 GET /api/ops/tasks */
export async function taskPageListApiOpsTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.taskPageListApiOpsTasksParams,
  options?: { [key: string]: any },
) {
  return request<OPS.TaskPageListResp>('/api/ops/tasks', {
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
  params: OPS.subTaskListApiOpsByTasksidsubtasksParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<OPS.SubTaskListResp>(`/api/ops/tasks/${param0}/subtasks`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
