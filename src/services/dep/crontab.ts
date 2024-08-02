// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询crontab GET /api/dep/crontabs/ */
export async function crontabPageListApiDepCrontabs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.crontabPageListApiDepCrontabsParams,
  options?: { [key: string]: any },
) {
  return request<DEP.CrontabPageListResp>("/api/dep/crontabs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 新建Crontab POST /api/dep/crontabs/ */
export async function cronatbCreateApiDepCrontabs(
  body: DEP.CrontabCreateReq,
  options?: { [key: string]: any },
) {
  return request<DEP.CrontabCreateResp>("/api/dep/crontabs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除crontab任务 DELETE /api/dep/crontabs/${param0} */
export async function crontabDeleteApiDepCrontabsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.crontabDeleteApiDepCrontabsByIdParams,
  body: DEP.CrontabDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<DEP.CrontabDeleteResp>(`/api/dep/crontabs/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 自动执行的任务 POST /api/dep/crontabs/cycle */
export async function crontabCycleApiDepCrontabsCycle(
  body: DEP.CrontabCycleReq,
  options?: { [key: string]: any },
) {
  return request<DEP.CrontabCycleResp>("/api/dep/crontabs/cycle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取自动化组的值班人信息 POST /api/dep/crontabs/duty */
export async function crontabDutyApiDepCrontabsDuty(
  body: DEP.CrontabDutyReq,
  options?: { [key: string]: any },
) {
  return request<DEP.CrontabDutyResp>("/api/dep/crontabs/duty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 完成crontab任务 POST /api/dep/crontabs/finish/${param0} */
export async function crontabFinishApiDepCrontabsByFinishid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.crontabFinishApiDepCrontabsByFinishidParams,
  body: DEP.CrontabFinishReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<DEP.CrontabFinishResp>(`/api/dep/crontabs/finish/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 提醒通知crontab任务 POST /api/dep/crontabs/notice */
export async function crontabNoticeApiDepCrontabsNotice(
  body: DEP.CrontabNoticeReq,
  options?: { [key: string]: any },
) {
  return request<DEP.CrontabNoticeResp>("/api/dep/crontabs/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 开始crontab任务 POST /api/dep/crontabs/start/${param0} */
export async function crontabStartApiDepCrontabsByStartid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DEP.crontabStartApiDepCrontabsByStartidParams,
  body: DEP.CrontabStartReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<DEP.CrontabStartResp>(`/api/dep/crontabs/start/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
