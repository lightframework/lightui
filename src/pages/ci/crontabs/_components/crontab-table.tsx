import Table, { TableColumns, TableColumnsState } from "@/components/table"
import { dictGet, noticeStateDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { crontabPageListApiDepCrontabs } from "@/services/dep/crontab"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef } from "react"
import CrontabCreateModalForm from "./crontab-create-modal-form"
import LevelCell from "./level-cell"

export default function CrontabTable() {
  const tableRef = useRef<ActionType>()

  const columns: TableColumns<DEP.CrontabInfo> = [
    { title: "ID", dataIndex: "id", width: TABLE_CELL_UID_WIDTH },
    {
      title: "申请人",
      dataIndex: "applicant",
      width: 200,
      render: (_, row) => row.applicant?.join(","),
    },
    { title: "环境ID", dataIndex: "envId", width: TABLE_CELL_UID_WIDTH },
    { title: "环境名称", dataIndex: "envName", width: 200 },
    { title: "版本", dataIndex: "version", width: 120 },
    {
      title: "升级级别",
      dataIndex: "level",
      width: 100,
      render: (_, row) => <LevelCell level={row.level} />,
    },
    {
      title: "通知状态",
      dataIndex: "noticeState",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row.noticeState, noticeStateDict)?.color}>
          {dictGet(row.noticeState, noticeStateDict)?.label ?? row.noticeState}
        </Tag>
      ),
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "操作人",
      dataIndex: "operators",
      width: 200,
      render: (_, row) => row.operators?.map((u) => u.nickname)?.join(","),
    },
    {
      title: "创建者",
      dataIndex: "createdBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createdAt),
    },
    {
      title: "更新者",
      dataIndex: "updatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updatedAt),
    },
  ]

  const columnsState: TableColumnsState = {}

  return (
    <>
      <Table
        name="crontab"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入申请人/环境ID/环境名称/版本查询"
        request={crontabPageListApiDepCrontabs}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <CrontabCreateModalForm
              key="crontab-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
    </>
  )
}
