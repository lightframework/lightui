// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询VPC列表 GET /api/cmdb/vpcs/ */
export async function vpcPageListApiCmdbVpcs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.vpcPageListApiCmdbVpcsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.VpcPageListResp>("/api/cmdb/vpcs/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加VPC POST /api/cmdb/vpcs/ */
export async function VpcCreateApiCmdbVpcs(
  body: CMDB.VpcCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.VpcCreateResp>("/api/cmdb/vpcs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看VPC信息 GET /api/cmdb/vpcs/${param0} */
export async function vpcReadOneApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.vpcReadOneApiCmdbVpcsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.VpcReadOneResp>(`/api/cmdb/vpcs/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改VPC信息 PUT /api/cmdb/vpcs/${param0} */
export async function vpcUpdateApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.vpcUpdateApiCmdbVpcsByUidParams,
  body: CMDB.VpcUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.VpcUpdateResp>(`/api/cmdb/vpcs/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除VPC DELETE /api/cmdb/vpcs/${param0} */
export async function vpcDeleteApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.vpcDeleteApiCmdbVpcsByUidParams,
  body: CMDB.VpcDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.VpcDeleteResp>(`/api/cmdb/vpcs/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询VPC列表 GET /api/cmdb/vpcs/options */
export async function vpcOptionsApiCmdbVpcsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.vpcOptionsApiCmdbVpcsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.VpcOptionsResp>("/api/cmdb/vpcs/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
