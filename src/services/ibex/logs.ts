// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 获取日志列表 GET /api/ibex/ctfs/logs/ */
export async function hostCtfLogListApiIbexCtfsLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfLogListApiIbexCtfsLogsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.HostCtfLogListResp>("/api/ibex/ctfs/logs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取Ctf环境列表 GET /api/ibex/ctfs/logs/envs */
export async function hostCtfEnvListApiIbexCtfsLogsEnvs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfEnvListApiIbexCtfsLogsEnvsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.HostCtfEnvListResp>("/api/ibex/ctfs/logs/envs", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取Ctf主机列表 GET /api/ibex/ctfs/logs/hosts */
export async function hostCtfHostListApiIbexCtfsLogsHosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfHostListApiIbexCtfsLogsHostsParams,
  options?: { [key: string]: any },
) {
  return request<IBEX.HostCtfHostListResp>("/api/ibex/ctfs/logs/hosts", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
