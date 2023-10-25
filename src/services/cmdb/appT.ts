// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询应用模板列表 GET /api/cmdb/appts/ */
export async function appTPageListApiCmdbAppts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appTPageListApiCmdbApptsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppTPageListResp>("/api/cmdb/appts/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加应用模板 POST /api/cmdb/appts/ */
export async function appTAddApiCmdbAppts(
  body: CMDB.AppTAddReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppTAddResp>("/api/cmdb/appts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改应用模板信息 PUT /api/cmdb/appts/${param0} */
export async function appTEditApiCmdbApptsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appTEditApiCmdbApptsByUidParams,
  body: CMDB.AppTEditReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.AppTEditResp>(`/api/cmdb/appts/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除应用模板 DELETE /api/cmdb/appts/${param0} */
export async function appTDeleteApiCmdbApptsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appTDeleteApiCmdbApptsByUidParams,
  body: CMDB.AppTDelReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.AppTDelResp>(`/api/cmdb/appts/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询应用模板列表 GET /api/cmdb/appts/list */
export async function appTListApiCmdbApptsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.appTListApiCmdbApptsListParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.AppTListResp>("/api/cmdb/appts/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
