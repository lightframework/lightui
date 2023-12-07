// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询主机类别列表 GET /api/cmdb/hostclasses/ */
export async function hosttypePageListApiCmdbHostclasses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypePageListApiCmdbHostclassesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostClassesPageListResp>("/api/cmdb/hostclasses/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加主机类别 POST /api/cmdb/hostclasses/ */
export async function hosttypeCreateApiCmdbHostclasses(
  body: CMDB.HostClassesCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostClassesCreateResp>("/api/cmdb/hostclasses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改主机类别信息 PUT /api/cmdb/hostclasses/${param0} */
export async function hosttypeUpdateApiCmdbHostclassesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeUpdateApiCmdbHostclassesByUidParams,
  body: CMDB.HostClassesUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostClassesUpdateResp>(
    `/api/cmdb/hostclasses/${param0}`,
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

/** 删除主机类别 DELETE /api/cmdb/hostclasses/${param0} */
export async function hosttypeDeleteApiCmdbHostclassesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeDeleteApiCmdbHostclassesByUidParams,
  body: CMDB.HostClassesDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostClassesDeleteResp>(
    `/api/cmdb/hostclasses/${param0}`,
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

/** 查询主机类别列表 GET /api/cmdb/hostclasses/options */
export async function hosttypeOptionsApiCmdbHostclassesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeOptionsApiCmdbHostclassesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostClassesOptionsResp>("/api/cmdb/hostclasses/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
