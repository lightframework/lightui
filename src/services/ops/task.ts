// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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

/** 查看任务详情 GET /api/ops/tasks/${param0}/bills */
export async function taskReadOneApiOpsByTasksidbills(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.taskReadOneApiOpsByTasksidbillsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TaskReadOneResp>(`/api/ops/tasks/${param0}/bills`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
