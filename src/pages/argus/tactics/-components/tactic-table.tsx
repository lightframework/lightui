import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { dutyListApiArgusDuties } from "@/services/argus/duty"
import {
  tacticDeleteApiArgusTacticsById,
  tacticItemsApiArgusTactics,
  tacticUpdateStatusApiArgusTacticsByIdstatus,
} from "@/services/argus/tactic"
import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Flex, Switch, Tag, Tooltip, Typography, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useCallback, useRef, useState } from "react"
import EditableRankCell from "./editable-rank-cell"
import TacticFormDrawer from "./tactic-form-drawer"

export default function TacticTable({
  initialTacticId,
}: {
  initialTacticId?: number
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["argus-tactics"],
    queryFn: () => tacticItemsApiArgusTactics(),
    select: (res) => res.data?.items ?? [],
    placeholderData: keepPreviousData,
  })

  const [mutateTactic, setMutateTactic] = useState<{
    type: "create" | "edit" | "copy"
    tacticId?: number
  } | null>(
    initialTacticId ? { type: "edit", tacticId: initialTacticId } : null,
  )

  const createNewTactic = useCallback(() => {
    setMutateTactic({ type: "create" })
  }, [])

  const editTactic = useCallback((tactic: ARGUS.TacticInfo) => {
    setMutateTactic({ type: "edit", tacticId: tactic.id })
  }, [])

  const copyTactic = useCallback((tactic: ARGUS.TacticInfo) => {
    setMutateTactic({ type: "copy", tacticId: tactic.id })
  }, [])

  const deleteTactic = useCallback(
    (tactic: ARGUS.TacticInfo) =>
      modal.confirm({
        title: "确定删除策略吗？",
        icon: <ExclamationCircleOutlined />,
        content: `删除策略 ${tactic.name}`,
        onOk: async () => {
          await tacticDeleteApiArgusTacticsById({ id: String(tactic.id) })
          message.success("删除成功")
          refetch()
        },
      }),
    [],
  )

  const onDrawerClose = useCallback(() => {
    setMutateTactic(null)
  }, [])

  const { data: notifyObjectOptions } = useQuery({
    queryKey: ["dict-entries", "tactic_notify_object"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "tactic_notify_object",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: users } = useQueryUserOptions()

  const { data: dutyUsers } = useQuery({
    queryKey: ["duty-options"],
    queryFn: () => dutyListApiArgusDuties(),
    select: (res) => res.data?.items ?? [],
  })

  const { data: matchMode } = useQuery({
    queryKey: ["dict-entries", "tactic_condition_match_mode"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "tactic_condition_match_mode",
      }).then((res) => res.data?.items ?? []),
  })

  const columns: TableColumns<ARGUS.TacticInfo> = [
    {
      title: "名称",
      dataIndex: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "排序",
      dataIndex: "rank",
      width: 80,
      render: (_, row) => (
        <EditableRankCell id={row.id} rank={row.rank} onFinish={refetch} />
      ),
    },
    {
      title: "状态",
      dataIndex: "enabled",
      width: 80,
      render(_, row) {
        return (
          <Switch
            disabled={!access.tacticUpdateStatusApiArgusTacticsByIdstatus}
            checked={row.enabled}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={async (value) => {
              await tacticUpdateStatusApiArgusTacticsByIdstatus(
                { id: String(row.id) },
                {
                  enabled: value,
                },
              )

              message.success(`${!!value ? "启用" : "禁用"}成功！`)
              refetch()
            }}
          />
        )
      },
    },
    {
      title: "策略配置",
      key: "conditions",
      width: 300,
      render: (_, row) => {
        const conditions = row.conditions as {
          key: string
          match_mode: string
          values: string[]
        }[][]

        const cond1 = conditions?.at(0)

        return (
          cond1 && (
            <ul className="!m-0 !p-0">
              {cond1?.map((condAnd, idx2) => (
                <li key={idx2}>
                  <Typography.Text ellipsis={{ tooltip: true }}>
                    <span>{condAnd.key}</span>
                    <span className="mx-1 font-bold">
                      {matchMode?.find(
                        (mode) => mode.key === condAnd.match_mode,
                      )?.value ?? condAnd.match_mode}
                    </span>
                    <span>{condAnd.values.join(",")}</span>
                  </Typography.Text>
                </li>
              ))}
            </ul>
          )
        )
      },
    },
    {
      title: "聚合维度",
      key: "aggrFields",
      width: 300,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.aggr_fields?.map((field) => <Tag key={field}>{field}</Tag>)}
        </Flex>
      ),
    },
    {
      title: "分配策略",
      key: "assigns",
      width: 220,
      render: (_, row) => (
        <ul className="!m-0 !p-0">
          {row.assigns?.map((assign, index) => (
            <li key={index}>
              <span>环节{index + 1}</span> -{" "}
              <span>
                {notifyObjectOptions?.find(
                  (option) => option.key === assign.notify_type,
                )?.value ?? assign.notify_type}
              </span>{" "}
              -{" "}
              <span>
                {(assign.notify_type === "personal"
                  ? users?.find((user) => user.id === assign.party)?.username
                  : assign.notify_type === "watchkeeper"
                    ? dutyUsers?.find((user) => user.id === assign.party)?.name
                    : null) ?? assign.party}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "创建者",
      dataIndex: "create_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.created_at),
    },
    {
      title: "更新者",
      dataIndex: "update_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updated_at),
    },
    {
      title: "操作",
      key: "actions",
      fixed: "right",
      width: 140,
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "复制",
              onClick: () => copyTactic(row),
              disabled: !access.TacticCreateApiArgusTactics,
            },
            {
              text: "编辑",
              onClick: () => editTactic(row),
              disabled: !access.tacticUpdateApiArgusTacticsById,
            },
            {
              text: "删除",
              onClick: () => deleteTactic(row),
              danger: true,
              disabled: !access.tacticDeleteApiArgusTacticsById,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        search={false}
        actionRef={tableRef}
        name="tactics"
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={isFetching}
        toolbar={{
          title: (
            <Tooltip title="刷新">
              <Button
                type="default"
                icon={<SyncOutlined />}
                onClick={() => refetch()}
              />
            </Tooltip>
          ),
          actions: [
            <Button
              key="add"
              type="primary"
              onClick={createNewTactic}
              disabled={!access.TacticCreateApiArgusTactics}
            >
              新建
            </Button>,
          ],
        }}
      />
      <TacticFormDrawer
        open={!!mutateTactic && !!data}
        onClose={onDrawerClose}
        type={mutateTactic?.type}
        tactic={data?.find((item) => item.id === mutateTactic?.tacticId)}
        onFinish={refetch}
      />
    </>
  )
}
