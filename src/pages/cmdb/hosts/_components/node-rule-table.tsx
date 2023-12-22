import TableCellActions from "@/components/table-cell-actions"
import { useQueryNodeRuleOptions } from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { nodeRuleDeleteApiCmdbNoderulesByUid } from "@/services/cmdb/nodeRule"
import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons"
import { useAccess } from "@umijs/max"
import { Button, Input, Modal, Table, Tag, Tooltip, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { useMemo, useState } from "react"
import NodeRuleCreateModalForm from "./node-rule-create-modal-form"
import NodeRuleUpdateModalForm from "./node-rule-update-modal-form"

export default function NodeRuleTable() {
  const nodeRuleQuery = useQueryNodeRuleOptions()

  const [modal, contextHolder] = Modal.useModal()
  const { token } = useToken()
  const access = useAccess()

  const [selectedNodeRuleToUpdate, setSelectedNodeRuleToUpdate] = useState<
    CMDB.NodeRuleOption | undefined
  >()

  const [keywords, setKeywords] = useState("")

  const showDeleteConfirm = (nodeRule: CMDB.NodeRuleOption) =>
    modal.confirm({
      title: "确定删除目录结构吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除目录结构 ${nodeRule.RuleName}`,
      onOk: async () => {
        await nodeRuleDeleteApiCmdbNoderulesByUid({ uid: nodeRule.Uid })
        message.success("删除成功")
        nodeRuleQuery.refetch()
      },
    })

  const columns: ColumnsType<CMDB.NodeRuleOption> = [
    { title: "RuleName", dataIndex: "RuleName", width: 120, fixed: "left" },
    {
      title: "NodeRoot",
      dataIndex: "NodeRoot",
      width: 120,
    },
    {
      title: "IsSystemProvided",
      dataIndex: "IsSystemProvided",
      width: 120,
      render: (value) => (
        <Tag color={value ? token.colorSuccess : token.colorError}>
          {value ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "RuleDefinition",
      dataIndex: "RuleDefinition",
      width: 400,
    },
    {
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: "编辑",
                onClick: () => setSelectedNodeRuleToUpdate(row),
                // disabled: !access.hosttypeUpdateApiCmdbHostclassesByUid,
              },
              {
                text: "删除",
                onClick: () => showDeleteConfirm(row),
                danger: true,
                // disabled: !access.hosttypeDeleteApiCmdbHostclassesByUid,
              },
            ]}
          />
        )
      },
    },
  ]

  const data = useMemo(
    () =>
      nodeRuleQuery.data?.filter((item) =>
        item.RuleName.toLowerCase().includes(keywords.toLowerCase()),
      ),
    [keywords, nodeRuleQuery.data],
  )

  return (
    <>
      {contextHolder}

      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          <Tooltip title="刷新">
            <Button
              type="default"
              icon={<SyncOutlined />}
              onClick={() => nodeRuleQuery.refetch()}
            />
          </Tooltip>

          <Input
            type="text"
            id={`${name}-table-keywords`}
            className="w-[260px]"
            placeholder="输入名称查询"
            onPressEnter={(e) => {
              setKeywords(e.currentTarget.value.trim())
            }}
          />
        </div>

        <NodeRuleCreateModalForm onFinish={() => nodeRuleQuery.refetch()} />
      </div>

      <Table
        size="middle"
        loading={nodeRuleQuery.isFetching}
        dataSource={data}
        rowKey={(row) => row.Uid}
        columns={columns}
        scroll={{
          x: "100%",
          y: "calc(100vh - 400px)",
        }}
      />

      <NodeRuleUpdateModalForm
        open={!!selectedNodeRuleToUpdate}
        onCancel={() => setSelectedNodeRuleToUpdate(undefined)}
        nodeRule={selectedNodeRuleToUpdate}
        onFinish={() => nodeRuleQuery.refetch()}
      />
    </>
  )
}
