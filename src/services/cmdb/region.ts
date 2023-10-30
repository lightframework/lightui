// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询区域列表 GET /api/cmdb/regions/ */
export async function regionPageListApiCmdbRegions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.regionPageListApiCmdbRegionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.RegionPageListResp>("/api/cmdb/regions/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加区域 POST /api/cmdb/regions/ */
export async function RegionCreateApiCmdbRegions(
  body: CMDB.RegionCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.RegionCreateResp>("/api/cmdb/regions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看区域信息 GET /api/cmdb/regions/${param0} */
export async function regionReadOneApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.regionReadOneApiCmdbRegionsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.RegionReadOneResp>(`/api/cmdb/regions/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改区域信息 PUT /api/cmdb/regions/${param0} */
export async function regionUpdateApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.regionUpdateApiCmdbRegionsByUidParams,
  body: CMDB.RegionUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.RegionUpdateResp>(`/api/cmdb/regions/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除区域 DELETE /api/cmdb/regions/${param0} */
export async function regionDeleteApiCmdbRegionsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.regionDeleteApiCmdbRegionsByUidParams,
  body: CMDB.RegionDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.RegionDeleteResp>(`/api/cmdb/regions/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 上传区域 POST /api/cmdb/regions/upload */
export async function regionUploadApiCmdbRegionsUpload(
  body: CMDB.RegionUploadReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.RegionUploadResp>("/api/cmdb/regions/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}
