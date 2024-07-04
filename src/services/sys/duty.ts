// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 查询排班 GET /api/sys/duties/schedules */
export async function scheduleReadListApiSysDutiesSchedules(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.scheduleReadListApiSysDutiesSchedulesParams,
  options?: { [key: string]: any },
) {
  return request<SYS.ScheduleReadListResp>("/api/sys/duties/schedules", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 排班管理 POST /api/sys/duties/schedules */
export async function scheduleManageApiSysDutiesSchedules(
  body: SYS.ScheduleManageReq,
  options?: { [key: string]: any },
) {
  return request<SYS.ScheduleManageResp>("/api/sys/duties/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询班次 GET /api/sys/duties/shifts */
export async function shiftReadListApiSysDutiesShifts(options?: {
  [key: string]: any
}) {
  return request<SYS.ShiftReadListResp>("/api/sys/duties/shifts", {
    method: "GET",
    ...(options || {}),
  })
}

/** 更新班次 PUT /api/sys/duties/shifts */
export async function shiftUpdateApiSysDutiesShifts(
  body: SYS.ShiftUpdateReq,
  options?: { [key: string]: any },
) {
  return request<SYS.ShiftUpdateResp>("/api/sys/duties/shifts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 创建班次 POST /api/sys/duties/shifts */
export async function shiftCreateApiSysDutiesShifts(
  body: SYS.ShiftCreateReq,
  options?: { [key: string]: any },
) {
  return request<SYS.ShiftCreateResp>("/api/sys/duties/shifts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除班次 DELETE /api/sys/duties/shifts/${param0} */
export async function shiftDeleteApiSysDutiesByShiftsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.shiftDeleteApiSysDutiesByShiftsidParams,
  body: SYS.ShiftDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<SYS.ShiftDeleteResp>(`/api/sys/duties/shifts/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询值班人 GET /api/sys/duties/watchkeeper */
export async function watchkeeperGetApiSysDutiesWatchkeeper(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SYS.watchkeeperGetApiSysDutiesWatchkeeperParams,
  options?: { [key: string]: any },
) {
  return request<SYS.WatchkeeperGetResp>("/api/sys/duties/watchkeeper", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
