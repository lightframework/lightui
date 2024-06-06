// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询task GET /api/dep/tasks/ */
export async function taskPageListApiDepTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskPageListApiDepTasksParams,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskPageListResp>("/api/dep/tasks/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 新建task POST /api/dep/tasks/ */
export async function taskCreateApiDepTasks(
  body: DEP.TaskCreateReq,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskCreateResp>("/api/dep/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单个task详情 GET /api/dep/tasks/${param0} */
export async function taskReadOneApiDepTasksById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskReadOneApiDepTasksByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<DEP.TaskReadOneResp>(`/api/dep/tasks/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 重试stage操作 GET /api/dep/tasks/${param0}/${param1} */
export async function taskRestartStageApiDepTasksByIdstageid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskRestartStageApiDepTasksByIdstageidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, stageid: param1, ...queryParams } = params
  return request<DEP.TaskRestartStageResp>(
    `/api/dep/tasks/${param0}/${param1}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 获取已部署的环境 GET /api/dep/tasks/allenv */
export async function taskAllEnvApiDepTasksAllenv(options?: {
  [key: string]: any
}) {
  return request<DEP.TaskAllEnvResp>("/api/dep/tasks/allenv", {
    method: "GET",
    ...(options || {}),
  })
}

/** 新建回退task POST /api/dep/tasks/back */
export async function taskCreateBackApiDepTasksBack(
  body: DEP.TaskCreateBackReq,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskCreateBackResp>("/api/dep/tasks/back", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 新建Cryptask POST /api/dep/tasks/cryp */
export async function taskCreateCrypApiDepTasksCryp(
  body: DEP.TaskCreateCrypReq,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskCreateCrypResp>("/api/dep/tasks/cryp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取环境最新升级任务 GET /api/dep/tasks/latest */
export async function taskLatestUpgradeApiDepTasksLatest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskLatestUpgradeApiDepTasksLatestParams,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskLatestUpgradeResp>("/api/dep/tasks/latest", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 刷新task状态 GET /api/dep/tasks/refresh */
export async function taskRefreshApiDepTasksRefresh(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskRefreshApiDepTasksRefreshParams,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskRefreshResp>("/api/dep/tasks/refresh", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 更新Stage POST /api/dep/tasks/set/stage */
export async function stageSetApiDepTasksSetstage(
  body: DEP.StageSetReq,
  options?: { [key: string]: any },
) {
  return request<DEP.StageSetResp>("/api/dep/tasks/set/stage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新BuildId POST /api/dep/tasks/set/task */
export async function taskSetApiDepTasksSettask(
  body: DEP.TaskSetReq,
  options?: { [key: string]: any },
) {
  return request<DEP.TaskSetResp>("/api/dep/tasks/set/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取task状态 GET /api/dep/tasks/state/${param0} */
export async function taskStateApiDepTasksByStateid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.taskStateApiDepTasksByStateidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<DEP.TaskStateResp>(`/api/dep/tasks/state/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}
