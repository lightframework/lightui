// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询列表 GET /api/ops/ipsettemplates/ */
export async function ipsetTemplatePageListApiOpsIpsettemplates(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplatePageListApiOpsIpsettemplatesParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplatePageListResp>("/api/ops/ipsettemplates/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加模版 POST /api/ops/ipsettemplates/ */
export async function ipsetTemplateCreateApiOpsIpsettemplates(
  body: OPS.IpsetTemplateCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplateCreateResp>("/api/ops/ipsettemplates/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改模版 PUT /api/ops/ipsettemplates/${param0} */
export async function ipsetTemplateUpdateApiOpsIpsettemplatesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplateUpdateApiOpsIpsettemplatesByIdParams,
  body: OPS.IpsetTemplateUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetTemplateUpdateResp>(
    `/api/ops/ipsettemplates/${param0}`,
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

/** 删除模版 DELETE /api/ops/ipsettemplates/${param0} */
export async function ipsetTemplateDeleteApiOpsIpsettemplatesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplateDeleteApiOpsIpsettemplatesByIdParams,
  body: OPS.IpsetTemplateDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetTemplateDeleteResp>(
    `/api/ops/ipsettemplates/${param0}`,
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

/** 生成数据 POST /api/ops/ipsettemplates/data */
export async function ipsetTemplateGenerateDataApiOpsIpsettemplatesData(
  body: OPS.IpsetTemplateGenerateDataReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplateGenerateDataResp>(
    "/api/ops/ipsettemplates/data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  )
}

/** 分页查询Isp GET /api/ops/ipsettemplates/isp */
export async function IspListApiOpsIpsettemplatesIsp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.IspListApiOpsIpsettemplatesIspParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IspListResp>("/api/ops/ipsettemplates/isp", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
