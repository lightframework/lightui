// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询列表 GET /api/ops/ipsets/templates/ */
export async function ipsetTemplatePageListApiOpsIpsetsTemplates(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplatePageListApiOpsIpsetsTemplatesParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplatePageListResp>("/api/ops/ipsets/templates/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加模版 POST /api/ops/ipsets/templates/ */
export async function ipsetTemplateCreateApiOpsIpsetsTemplates(
  body: OPS.IpsetTemplateCreateReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplateCreateResp>("/api/ops/ipsets/templates/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改模版 PUT /api/ops/ipsets/templates/${param0} */
export async function ipsetTemplateUpdateApiOpsIpsetsTemplatesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplateUpdateApiOpsIpsetsTemplatesByIdParams,
  body: OPS.IpsetTemplateUpdateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetTemplateUpdateResp>(
    `/api/ops/ipsets/templates/${param0}`,
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

/** 删除模版 DELETE /api/ops/ipsets/templates/${param0} */
export async function ipsetTemplateDeleteApiOpsIpsetsTemplatesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ipsetTemplateDeleteApiOpsIpsetsTemplatesByIdParams,
  body: OPS.IpsetTemplateDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.IpsetTemplateDeleteResp>(
    `/api/ops/ipsets/templates/${param0}`,
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

/** 生成数据 POST /api/ops/ipsets/templates/data */
export async function ipsetTemplateGenerateDataApiOpsIpsetsTemplatesData(
  body: OPS.IpsetTemplateGenerateDataReq,
  options?: { [key: string]: any },
) {
  return request<OPS.IpsetTemplateGenerateDataResp>(
    "/api/ops/ipsets/templates/data",
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

/** 查询Isp GET /api/ops/ipsets/templates/isp */
export async function ispListApiOpsIpsetsTemplatesIsp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.ispListApiOpsIpsetsTemplatesIspParams,
  options?: { [key: string]: any },
) {
  return request<OPS.IspListResp>("/api/ops/ipsets/templates/isp", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询Location GET /api/ops/ipsets/templates/location */
export async function locationListApiOpsIpsetsTemplatesLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.locationListApiOpsIpsetsTemplatesLocationParams,
  options?: { [key: string]: any },
) {
  return request<OPS.LocationListResp>("/api/ops/ipsets/templates/location", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
