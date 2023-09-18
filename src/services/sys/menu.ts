// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询菜单列表 GET /api/sys/menus/ */
export async function menuPageListApiSysMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuPageListApiSysMenusParams,
  options?: { [key: string]: any },
) {
  return request<API.MenuPageListResp>('/api/sys/menus/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加菜单 POST /api/sys/menus/ */
export async function menuCreateApiSysMenus(
  body: API.MenuCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.MenuCreateResp>('/api/sys/menus/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看菜单信息 GET /api/sys/menus/${param0} */
export async function menuReadeOneApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuReadeOneApiSysMenusByMenuIdParams,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuReadOneResp>(`/api/sys/menus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改菜单信息 PUT /api/sys/menus/${param0} */
export async function menuUpdateApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuUpdateApiSysMenusByMenuIdParams,
  body: API.MenuUpdateReq,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuUpdateResp>(`/api/sys/menus/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /api/sys/menus/${param0} */
export async function menuDeleteApiSysMenusByMenuId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuDeleteApiSysMenusByMenuIdParams,
  body: API.MenuDelReq,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuDelResp>(`/api/sys/menus/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询菜单列表 GET /api/sys/menus/list */
export async function menuOptionsApiSysMenusList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuOptionsApiSysMenusListParams,
  options?: { [key: string]: any },
) {
  return request<API.MenuOptionsResp>('/api/sys/menus/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
