// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 分页查询国家列表 GET /api/cmdb/countrys/ */
export async function countryPageListApiCmdbCountrys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.countryPageListApiCmdbCountrysParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CountryPageListResp>("/api/cmdb/countrys/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 添加国家 POST /api/cmdb/countrys/ */
export async function CountryCreateApiCmdbCountrys(
  body: CMDB.CountryCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.CountryCreateResp>("/api/cmdb/countrys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 查看国家信息 GET /api/cmdb/countrys/${param0} */
export async function countryReadOneApiCmdbCountrysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.countryReadOneApiCmdbCountrysByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.CountryReadOneResp>(`/api/cmdb/countrys/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改国家信息 PUT /api/cmdb/countrys/${param0} */
export async function countryUpdateApiCmdbCountrysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.countryUpdateApiCmdbCountrysByUidParams,
  body: CMDB.CountryUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.CountryUpdateResp>(`/api/cmdb/countrys/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 删除国家 DELETE /api/cmdb/countrys/${param0} */
export async function countryDeleteApiCmdbCountrysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.countryDeleteApiCmdbCountrysByUidParams,
  body: CMDB.CountryDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params
  return request<CMDB.CountryDeleteResp>(`/api/cmdb/countrys/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 查询国家列表 GET /api/cmdb/countrys/options */
export async function countryOptionsApiCmdbCountrysOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.countryOptionsApiCmdbCountrysOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CountryOptionsResp>("/api/cmdb/countrys/options", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
