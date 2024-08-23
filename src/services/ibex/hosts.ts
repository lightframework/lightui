// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 添加监控 POST /api/ibex/ctfs/hosts/${param0} */
export async function hostCtfConfCreateApiIbexCtfsHostsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfConfCreateApiIbexCtfsHostsByUidParams,
  body: IBEX.HostCtfConfCreateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<IBEX.HostCtfConfCreateResp>(`/api/ibex/ctfs/hosts/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查看监控列表 GET /api/ibex/ctfs/hosts/${param0}/confs */
export async function hostCtfConfListApiIbexCtfsHostsByUidconfs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfConfListApiIbexCtfsHostsByUidconfsParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<IBEX.HostCtfConfListResp>(
    `/api/ibex/ctfs/hosts/${param0}/confs`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 安装监控 POST /api/ibex/ctfs/hosts/${param0}/init */
export async function hostCtfInitApiIbexCtfsHostsByUidinit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfInitApiIbexCtfsHostsByUidinitParams,
  body: IBEX.HostCtfInitReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<IBEX.HostCtfInitResp>(`/api/ibex/ctfs/hosts/${param0}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 启动监控 POST /api/ibex/ctfs/hosts/${param0}/start */
export async function hostCtfStartApiIbexCtfsHostsByUidstart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfStartApiIbexCtfsHostsByUidstartParams,
  body: IBEX.HostCtfStartReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<IBEX.HostCtfStartResp>(
    `/api/ibex/ctfs/hosts/${param0}/start`,
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

/** 停止监控 POST /api/ibex/ctfs/hosts/${param0}/stop */
export async function hostCtfStopApiIbexCtfsHostsByUidstop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfStopApiIbexCtfsHostsByUidstopParams,
  body: IBEX.HostCtfStopReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<IBEX.HostCtfStopResp>(`/api/ibex/ctfs/hosts/${param0}/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 修改监控 PUT /api/ibex/ctfs/hosts/confs/${param0} */
export async function hostCtfConfUpdateApiIbexCtfsHostsByConfsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfConfUpdateApiIbexCtfsHostsByConfsidParams,
  body: IBEX.HostCtfConfUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.HostCtfConfUpdateResp>(
    `/api/ibex/ctfs/hosts/confs/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}

/** 删除监控 DELETE /api/ibex/ctfs/hosts/confs/${param0} */
export async function hostCtfConfDeleteApiIbexCtfsHostsByConfsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IBEX.hostCtfConfDeleteApiIbexCtfsHostsByConfsidParams,
  body: IBEX.HostCtfConfDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<IBEX.HostCtfConfDeleteResp>(
    `/api/ibex/ctfs/hosts/confs/${param0}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  )
}
