import Editable from "@/components/editable"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { dictGet, noticeStateDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { envPageListApiCmdbEnvs } from "@/services/cmdb/env"
import {
  crontabFinishApiDepCrontabsByFinishid,
  crontabPageListApiDepCrontabs,
  crontabUpdateEndTimeApiDepCrontabsByUpdateidendtime,
  crontabUpdateOperatorApiDepCrontabsByUpdateidoperators,
  crontabUpdateStartTimeApiDepCrontabsByUpdateidstarttime,
} from "@/services/dep/crontab"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import {
  ConfigProvider,
  DatePicker,
  message,
  Popover,
  Select,
  Tag,
  Timeline,
} from "antd"
import dayjs from "dayjs"
import { useRef, useState } from "react"
import OnlineDeployConfirmModal from "../../deploy/_components/online-deploy-confirm-modal"
import CrontabCreateModalForm from "./crontab-create-modal-form"
import CrontabDeleteConfirmModal from "./crontab-delete-confirm-modal"
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

  const { data: userOptions } = useQueryUserOptions()

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
      title: (
        <div className="flex items-center gap-1">
          <span>通知状态</span>
          <Popover
            content={
              <ConfigProvider
                theme={{ components: { Timeline: { itemPaddingBottom: 0 } } }}
              >
                <Timeline
                  className="crontab-state-timeline"
                  items={[
                    { children: "等待创建" },
                    { children: "等待开始" },
                    { children: "运行中" },
                    { children: "已停服" },
                    { children: "已完成" },
                    { children: "已删除" },
                  ]}
                />
              </ConfigProvider>
            }
          >
            <QuestionCircleOutlined />
          </Popover>
        </div>
      ),
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
      width: 180,
      render: (_, row) => (
        <Editable
          value={dayjs(row.startTime)}
          control={<DatePicker showTime />}
          onFinish={async (value) => {
            if (value) {
              await crontabUpdateStartTimeApiDepCrontabsByUpdateidstarttime(
                { id: row.id.toString() },
                { startTime: value.format("YYYY-MM-DD HH:mm:ss") },
              )
              tableRef.current?.reload()
            }
          }}
          disabled={
            !access.crontabUpdateStartTimeApiDepCrontabsByUpdateidstarttime ||
            !row.isEdit ||
            row.noticeState !== "NOCREATE"
          }
        >
          {row.startTime}
        </Editable>
      ),
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 180,
      render: (_, row) => (
        <Editable
          value={dayjs(row.endTime)}
          control={<DatePicker showTime minDate={dayjs(row.startTime)} />}
          onFinish={async (value) => {
            if (value) {
              if (value.isBefore(dayjs(row.startTime))) {
                message.error("结束时间必须在开始时间之后")
                return
              }
              await crontabUpdateEndTimeApiDepCrontabsByUpdateidendtime(
                { id: row.id.toString() },
                { endTime: value.format("YYYY-MM-DD HH:mm:ss") },
              )
              tableRef.current?.reload()
            }
          }}
          disabled={
            !access.crontabUpdateEndTimeApiDepCrontabsByUpdateidendtime ||
            !row.isEdit ||
            ["FINISH", "DELETED"].includes(row.noticeState)
          }
        >
          {row.endTime}
        </Editable>
      ),
    },
    {
      title: "操作人",
      dataIndex: "operators",
      width: 200,
      render: (_, row) => (
        <Editable
          value={row.operators?.map((u) => u.id)}
          disabled={
            !access.crontabUpdateOperatorApiDepCrontabsByUpdateidoperators ||
            !row.isEdit
          }
          control={
            <Select
              mode="multiple"
              options={userOptions?.map((u) => ({
                value: u.id,
                label: `${u.nickname} @ ${u.username}`,
              }))}
              showSearch
              optionFilterProp="label"
              style={{ width: 250 }}
            />
          }
          onFinish={async (value) => {
            await crontabUpdateOperatorApiDepCrontabsByUpdateidoperators(
              { id: row.id.toString() },
              { operatorIds: value },
            )
            tableRef.current?.reload()
          }}
        >
          {row.operators?.map((u) => u.nickname)?.join(",")}
        </Editable>
      ),
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
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: "完成升级",
                disabled:
                  !row.isEdit ||
                  !access.crontabFinishApiDepCrontabsByFinishid ||
                  dayjs(row.startTime).isAfter(dayjs()) ||
                  !["RUNNING", "STOPPED"].includes(row.noticeState),
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
              ...(row.noticeState !== "DELETED"
                ? [
                    {
                      text: "删除",
                      danger: true,
                      disabled:
                        // !row.isEdit ||
                        !access.crontabDeleteApiDepCrontabsDelete,
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
                  ]
                : []),
            ]}
          />
        )
      },
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
        autoRefresh
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
      <CrontabDeleteConfirmModal
        open={!!selectedItemToDelete}
        onCancel={() => setSelectedItemToDelete(undefined)}
        env={env}
        onFinish={async () => {
          tableRef.current?.reload()
        }}
        crontab={selectedItemToDelete}
      />
      <OnlineDeployConfirmModal
        title={`确定对${selectedItemToUpdate?.envName}完成升级吗？`}
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
