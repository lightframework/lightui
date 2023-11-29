// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询主机类型列表 GET /api/cmdb/hosttypes/ */
export async function hosttypePageListApiCmdbHosttypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypePageListApiCmdbHosttypesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostTypePageListResp>("/api/cmdb/hosttypes/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加主机类型 POST /api/cmdb/hosttypes/ */
export async function hosttypeCreateApiCmdbHosttypes(
  body: CMDB.HostTypeCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostTypeCreateResp>("/api/cmdb/hosttypes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看主机类型信息 GET /api/cmdb/hosttypes/${param0} */
export async function hosttypeReadOneApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeReadOneApiCmdbHosttypesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostTypeReadOneResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改主机类型信息 PUT /api/cmdb/hosttypes/${param0} */
export async function hosttypeUpdateApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeUpdateApiCmdbHosttypesByUidParams,
  body: CMDB.HostTypeUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostTypeUpdateResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除主机类型 DELETE /api/cmdb/hosttypes/${param0} */
export async function hosttypeDeleteApiCmdbHosttypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeDeleteApiCmdbHosttypesByUidParams,
  body: CMDB.HostTypeDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.HostTypeDeleteResp>(`/api/cmdb/hosttypes/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询主机类型列表 GET /api/cmdb/hosttypes/options */
export async function hosttypeOptionsApiCmdbHosttypesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.hosttypeOptionsApiCmdbHosttypesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.HostTypeOptionsResp>("/api/cmdb/hosttypes/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
