// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max"

/** 此处后端没有提供注释 GET /api/argus/duties/ */
export async function dutyListApiArgusDuties(options?: { [key: string]: any }) {
  return request<ARGUS.DutyListResp>("/api/argus/duties/", {
    method: "GET",
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/argus/duties/users */
export async function dutyUserListApiArgusDutiesUsers(options?: {
  [key: string]: any
}) {
  return request<ARGUS.DutyUserListResp>("/api/argus/duties/users", {
    method: "GET",
    ...(options || {}),
  })
}
