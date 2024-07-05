// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 导出证书 POST /api/ops/certs/export/${param0} */
export async function certExportApiOpsCertsByExportid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certExportApiOpsCertsByExportidParams,
  body: OPS.CertExportReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertExportResp>(`/api/ops/certs/export/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询certRecord列表 GET /api/ops/certs/records */
export async function certRecordPageListApiOpsCertsRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certRecordPageListApiOpsCertsRecordsParams,
  options?: { [key: string]: any },
) {
  return request<OPS.CertRecordPageListResp>("/api/ops/certs/records", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取单个certRecord详情 GET /api/ops/certs/records/${param0} */
export async function certRecordReadOneApiOpsCertsByRecordsid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certRecordReadOneApiOpsCertsByRecordsidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertRecordReadOneResp>(
    `/api/ops/certs/records/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 更新Cert的UseState POST /api/ops/certs/usestate/${param0} */
export async function certUpdateUseStateApiOpsCertsByUsestateid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: OPS.certUpdateUseStateApiOpsCertsByUsestateidParams,
  body: OPS.CertUpdateUseStateReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<OPS.CertUpdateUseStateResp>(
    `/api/ops/certs/usestate/${param0}`,
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
