// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询子网列表 GET /api/cmdb/subnets/ */
export async function subnetPageListApiCmdbSubnets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.subnetPageListApiCmdbSubnetsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.SubnetPageListResp>("/api/cmdb/subnets/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加子网 POST /api/cmdb/subnets/ */
export async function SubnetCreateApiCmdbSubnets(
  body: CMDB.SubnetCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.SubnetCreateResp>("/api/cmdb/subnets/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看子网信息 GET /api/cmdb/subnets/${param0} */
export async function subnetReadOneApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.subnetReadOneApiCmdbSubnetsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.SubnetReadOneResp>(`/api/cmdb/subnets/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改子网信息 PUT /api/cmdb/subnets/${param0} */
export async function subnetUpdateApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.subnetUpdateApiCmdbSubnetsByUidParams,
  body: CMDB.SubnetUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.SubnetUpdateResp>(`/api/cmdb/subnets/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除子网 DELETE /api/cmdb/subnets/${param0} */
export async function subnetDeleteApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.subnetDeleteApiCmdbSubnetsByUidParams,
  body: CMDB.SubnetDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.SubnetDeleteResp>(`/api/cmdb/subnets/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询子网列表 GET /api/cmdb/subnets/options */
export async function subnetOptionsApiCmdbSubnetsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.subnetOptionsApiCmdbSubnetsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.SubnetOptionsResp>("/api/cmdb/subnets/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
