import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { dictGet, noticeStateDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { envPageListApiCmdbEnvs } from "@/services/cmdb/env"
import {
  crontabDeleteApiDepCrontabsById,
  crontabFinishApiDepCrontabsByFinishid,
  crontabPageListApiDepCrontabs,
} from "@/services/dep/crontab"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message, Tag } from "antd"
import dayjs from "dayjs"
import { useRef, useState } from "react"
import OnlineDeployConfirmModal from "../../deploy/_components/online-deploy-confirm-modal"
import CrontabCreateModalForm from "./crontab-create-modal-form"
import LevelCell from "./level-cell"

export default function CrontabTable() {
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [env, setEnv] = useState<CMDB.EnvInfo | undefined>()
  const [selectedItemToUpdate, setSelectedItemToUpdate] = useState<
    DEP.CrontabInfo | undefined
  >()
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    DEP.CrontabInfo | undefined
  >()

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
    {
      title: "操作",
      key: "options",
      width: 120,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "确认升级",
              disabled:
                !access.crontabFinishApiDepCrontabsByFinishid ||
                dayjs(row.startTime).isAfter(dayjs()),
              onClick: async () => {
                const env = (
                  await envPageListApiCmdbEnvs({
                    keywords: row.envName,
                    pageSize: 1,
                    current: 1,
                  })
                ).data?.list?.at(0)
                if (!env) {
                  message.error("不存在的环境！")
                } else {
                  setEnv(env)
                  setSelectedItemToUpdate(row)
                }
              },
            },
            {
              text: "删除",
              danger: true,
              disabled: !access.crontabDeleteApiDepCrontabsById,
              onClick: async () => {
                const env = (
                  await envPageListApiCmdbEnvs({
                    keywords: row.envName,
                    pageSize: 1,
                    current: 1,
                  })
                ).data?.list?.at(0)
                if (!env) {
                  message.error("不存在的环境！")
                } else {
                  setEnv(env)
                  setSelectedItemToDelete(row)
                }
              },
            },
          ]}
        />
      ),
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
      <OnlineDeployConfirmModal
        title="确定要删除定时任务吗？"
        open={!!selectedItemToDelete}
        onCancel={() => setSelectedItemToDelete(undefined)}
        env={env}
        onFinish={async () => {
          await crontabDeleteApiDepCrontabsById({
            id: String(selectedItemToDelete?.id),
          })
          message.success("删除成功")
          tableRef.current?.reload()
        }}
      />
      <OnlineDeployConfirmModal
        title="确定要进行升级吗？"
        open={!!selectedItemToUpdate}
        onCancel={() => setSelectedItemToUpdate(undefined)}
        env={env}
        onFinish={async () => {
          await crontabFinishApiDepCrontabsByFinishid({
            id: String(selectedItemToUpdate?.id),
          })
          message.success("开始升级")
          tableRef.current?.reload()
        }}
      />
    </>
  )
}
