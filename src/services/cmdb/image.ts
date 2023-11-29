// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询镜像列表 GET /api/cmdb/images/ */
export async function imagePageListApiCmdbImages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.imagePageListApiCmdbImagesParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ImagePageListResp>("/api/cmdb/images/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加镜像 POST /api/cmdb/images/ */
export async function ImageCreateApiCmdbImages(
  body: CMDB.ImageCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.ImageCreateResp>("/api/cmdb/images/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看镜像信息 GET /api/cmdb/images/${param0} */
export async function imageReadOneApiCmdbImagesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.imageReadOneApiCmdbImagesByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.ImageReadOneResp>(`/api/cmdb/images/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改镜像信息 PUT /api/cmdb/images/${param0} */
export async function imageUpdateApiCmdbImagesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.imageUpdateApiCmdbImagesByUidParams,
  body: CMDB.ImageUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.ImageUpdateResp>(`/api/cmdb/images/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除镜像 DELETE /api/cmdb/images/${param0} */
export async function imageDeleteApiCmdbImagesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.imageDeleteApiCmdbImagesByUidParams,
  body: CMDB.ImageDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.ImageDeleteResp>(`/api/cmdb/images/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询镜像列表 GET /api/cmdb/images/options */
export async function imageOptionsApiCmdbImagesOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.imageOptionsApiCmdbImagesOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.ImageOptionsResp>("/api/cmdb/images/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
