// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询城市列表 GET /api/cmdb/citys/ */
export async function cityPageListApiCmdbCitys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cityPageListApiCmdbCitysParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CityPageListResp>('/api/cmdb/citys/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加城市 POST /api/cmdb/citys/ */
export async function CityCreateApiCmdbCitys(
  body: CMDB.CityCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.CityCreateResp>('/api/cmdb/citys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看城市信息 GET /api/cmdb/citys/${param0} */
export async function cityReadOneApiCmdbCitysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cityReadOneApiCmdbCitysByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CityReadOneResp>(`/api/cmdb/citys/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改城市信息 PUT /api/cmdb/citys/${param0} */
export async function cityUpdateApiCmdbCitysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cityUpdateApiCmdbCitysByUidParams,
  body: CMDB.CityUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CityUpdateResp>(`/api/cmdb/citys/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除城市 DELETE /api/cmdb/citys/${param0} */
export async function cityDeleteApiCmdbCitysByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cityDeleteApiCmdbCitysByUidParams,
  body: CMDB.CityDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.CityDeleteResp>(`/api/cmdb/citys/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询城市列表 GET /api/cmdb/citys/options */
export async function cityOptionsApiCmdbCitysOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.cityOptionsApiCmdbCitysOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.CityOptionsResp>('/api/cmdb/citys/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
