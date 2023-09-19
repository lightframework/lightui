// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询子网列表 GET /api/cmdb/subnets/ */
export async function subnetPageListApiCmdbSubnets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subnetPageListApiCmdbSubnetsParams,
  options?: { [key: string]: any },
) {
  return request<API.SubnetPageListResp>('/api/cmdb/subnets/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加子网 POST /api/cmdb/subnets/ */
export async function SubnetCreateApiCmdbSubnets(
  body: API.SubnetCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.SubnetCreateResp>('/api/cmdb/subnets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看子网信息 GET /api/cmdb/subnets/${param0} */
export async function subnetReadOneApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subnetReadOneApiCmdbSubnetsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.SubnetReadOneResp>(`/api/cmdb/subnets/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改子网信息 PUT /api/cmdb/subnets/${param0} */
export async function subnetUpdateApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subnetUpdateApiCmdbSubnetsByUidParams,
  body: API.SubnetUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.SubnetUpdateResp>(`/api/cmdb/subnets/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除子网 DELETE /api/cmdb/subnets/${param0} */
export async function subnetDeleteApiCmdbSubnetsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subnetDeleteApiCmdbSubnetsByUidParams,
  body: API.SubnetDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.SubnetDeleteResp>(`/api/cmdb/subnets/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询子网列表 GET /api/cmdb/subnets/options */
export async function subnetOptionsApiCmdbSubnetsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.subnetOptionsApiCmdbSubnetsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.SubnetOptionsResp>('/api/cmdb/subnets/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
