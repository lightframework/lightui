// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询VPC列表 GET /api/cmdb/vpcs/ */
export async function vpcPageListApiCmdbVpcs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vpcPageListApiCmdbVpcsParams,
  options?: { [key: string]: any },
) {
  return request<API.VpcPageListResp>('/api/cmdb/vpcs/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加VPC POST /api/cmdb/vpcs/ */
export async function VpcCreateApiCmdbVpcs(
  body: API.VpcCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.VpcCreateResp>('/api/cmdb/vpcs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看VPC信息 GET /api/cmdb/vpcs/${param0} */
export async function vpcReadOneApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vpcReadOneApiCmdbVpcsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.VpcReadOneResp>(`/api/cmdb/vpcs/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改VPC信息 PUT /api/cmdb/vpcs/${param0} */
export async function vpcUpdateApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vpcUpdateApiCmdbVpcsByUidParams,
  body: API.VpcUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.VpcUpdateResp>(`/api/cmdb/vpcs/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除VPC DELETE /api/cmdb/vpcs/${param0} */
export async function vpcDeleteApiCmdbVpcsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vpcDeleteApiCmdbVpcsByUidParams,
  body: API.VpcDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.VpcDeleteResp>(`/api/cmdb/vpcs/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询VPC列表 GET /api/cmdb/vpcs/options */
export async function vpcOptionsApiCmdbVpcsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vpcOptionsApiCmdbVpcsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<API.VpcOptionsResp>('/api/cmdb/vpcs/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
