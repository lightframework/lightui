// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询安全组列表 GET /api/cmdb/securitygroups/ */
export async function securitygroupPageListApiCmdbSecuritygroups(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.securitygroupPageListApiCmdbSecuritygroupsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.SecurityGroupPageListResp>('/api/cmdb/securitygroups/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加安全组 POST /api/cmdb/securitygroups/ */
export async function SecurityGroupCreateApiCmdbSecuritygroups(
  body: CMDB.SecurityGroupCreateReq,
  options?: { [key: string]: any },
) {
  return request<CMDB.SecurityGroupCreateResp>('/api/cmdb/securitygroups/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看安全组信息 GET /api/cmdb/securitygroups/${param0} */
export async function securitygroupReadOneApiCmdbSecuritygroupsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.securitygroupReadOneApiCmdbSecuritygroupsByUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.SecurityGroupReadOneResp>(`/api/cmdb/securitygroups/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改安全组信息 PUT /api/cmdb/securitygroups/${param0} */
export async function securitygroupUpdateApiCmdbSecuritygroupsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.securitygroupUpdateApiCmdbSecuritygroupsByUidParams,
  body: CMDB.SecurityGroupUpdateReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.SecurityGroupUpdateResp>(`/api/cmdb/securitygroups/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除安全组 DELETE /api/cmdb/securitygroups/${param0} */
export async function securitygroupDeleteApiCmdbSecuritygroupsByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.securitygroupDeleteApiCmdbSecuritygroupsByUidParams,
  body: CMDB.SecurityGroupDeleteReq,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<CMDB.SecurityGroupDeleteResp>(`/api/cmdb/securitygroups/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询安全组列表 GET /api/cmdb/securitygroups/options */
export async function securitygroupOptionsApiCmdbSecuritygroupsOptions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CMDB.securitygroupOptionsApiCmdbSecuritygroupsOptionsParams,
  options?: { [key: string]: any },
) {
  return request<CMDB.SecurityGroupOptionsResp>('/api/cmdb/securitygroups/options', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
