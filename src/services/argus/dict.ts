// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 此处后端没有提供注释 GET /api/argus/dicts/ */
export async function dictionaryistApiArgusDicts(options?: {
  [key: string]: any
}) {
  return request<ARGUS.DictionaryListResp>("/api/argus/dicts/", {
    method: "GET",
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /api/argus/dicts/ */
export async function dictionaryCreateApiArgusDicts(
  body: ARGUS.DictionaryCreateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.DictionaryCreateResp>("/api/argus/dicts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /api/argus/dicts/${param0} */
export async function dictionaryDeleteApiArgusDictsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.dictionaryDeleteApiArgusDictsByIdParams,
  body: ARGUS.DictionaryDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.DictionaryDeleteResp>(`/api/argus/dicts/${param0}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/dicts/${param0}/entries */
export async function entryGetByIdApiArgusDictsByIdentries(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.entryGetByIdApiArgusDictsByIdentriesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.DictionaryEntriesResp>(
    `/api/argus/dicts/${param0}/entries`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}

/** 此处后端没有提供注释 GET /api/argus/dicts/entries */
export async function entryGetByNameApiArgusDictsEntries(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.entryGetByNameApiArgusDictsEntriesParams,
  options?: { [key: string]: any },
) {
  return request<ARGUS.DictionaryEntriesResp>("/api/argus/dicts/entries", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /api/argus/dicts/entries */
export async function entryCreateApiArgusDictsEntries(
  body: ARGUS.DictionaryEntryCreateReq,
  options?: { [key: string]: any },
) {
  return request<ARGUS.DictionaryEntryCreateResp>("/api/argus/dicts/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /api/argus/dicts/entries/${param0} */
export async function entryDeleteApiArgusDictsByEntriesid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ARGUS.entryDeleteApiArgusDictsByEntriesidParams,
  body: ARGUS.DictionaryDeleteReq,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<ARGUS.DictionaryDeleteResp>(
    `/api/argus/dicts/entries/${param0}`,
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
