// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询可用区实例机型列表 GET /api/cmdb/instypes/ */
export async function instanceTypeQuotaItemPageListApiCmdbInstypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceTypeQuotaItemPageListApiCmdbInstypesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceTypeQuotaItemPageListResp>(
    "/api/cmdb/instypes/",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}

/** 添加可用区实例机型 POST /api/cmdb/instypes/ */
export async function InstanceTypeQuotaItemCreateApiCmdbInstypes(
  body: CMDB.InstanceTypeQuotaItemCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceTypeQuotaItemCreateResp>("/api/cmdb/instypes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看可用区实例机型信息 GET /api/cmdb/instypes/${param0} */
export async function instanceTypeQuotaItemReadOneApiCmdbInstypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceTypeQuotaItemReadOneApiCmdbInstypesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.InstanceTypeQuotaItemReadOneResp>(
    `/api/cmdb/instypes/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 修改可用区实例机型信息 PUT /api/cmdb/instypes/${param0} */
export async function instanceTypeQuotaItemUpdateApiCmdbInstypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceTypeQuotaItemUpdateApiCmdbInstypesByUidParams,
  body: CMDB.InstanceTypeQuotaItemUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.InstanceTypeQuotaItemUpdateResp>(
    `/api/cmdb/instypes/${param0}`,
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

/** 删除可用区实例机型 DELETE /api/cmdb/instypes/${param0} */
export async function instanceTypeQuotaItemDeleteApiCmdbInstypesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceTypeQuotaItemDeleteApiCmdbInstypesByUidParams,
  body: CMDB.InstanceTypeQuotaItemDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.InstanceTypeQuotaItemDeleteResp>(
    `/api/cmdb/instypes/${param0}`,
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

/** 查询可用区实例机型列表 GET /api/cmdb/instypes/options */
export async function instanceTypeQuotaItemOptionsApiCmdbInstypesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.instanceTypeQuotaItemOptionsApiCmdbInstypesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.InstanceTypeQuotaItemOptionsResp>(
    "/api/cmdb/instypes/options",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  )
}
