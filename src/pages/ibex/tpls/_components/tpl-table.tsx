import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import {
  tplDeleteApiIbexByTplsid,
  tplListApiIbexTpls,
} from "@/services/ibex/tpl"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Flex, message, Tag } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef } from "react"

export default function TplTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const showDeleteConfirm = (tpl: IBEX.TaskTplInfo) =>
    modal.confirm({
      title: "确定删除脚本吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除脚本 ${tpl.title}`,
      onOk: async () => {
        await tplDeleteApiIbexByTplsid({ id: tpl.id.toString() })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columns: TableColumns<IBEX.TaskTplInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 300,
    },
    {
      title: "标签",
      dataIndex: "tags",
      width: 300,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.tags?.map((item) => (
            <Tag key={item} color="blue">
              {item}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      title: "创建者",
      dataIndex: "create_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.create_at
          ? toLocaleDateTimeString(new Date(record.create_at * 1000).toString())
          : "-",
    },
    {
      title: "更新者",
      dataIndex: "update_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "update_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.update_at
          ? toLocaleDateTimeString(new Date(record.update_at * 1000).toString())
          : "-",
    },
    {
      title: "操作",
      key: "options",
      width: 210,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "创建任务",
              onClick: () => history.push(`/ibex/tasks/add?tplId=${row.id}`),
              disabled: !access.canMenuIbexTaskAdd,
            },
            {
              text: "编辑",
              onClick: () => history.push(`/ibex/tpls/${row.id}/edit`),
              disabled: !access.canMenuIbexTplEdit,
            },
            {
              text: "克隆",
              onClick: () => history.push(`/ibex/tpls/add?cloneId=${row.id}`),
              disabled: !access.canMenuIbexTplAdd,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.tplDeleteApiIbexByTplsid,
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
        name="tpl"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={(
          params: IBEX.TaskTplListReq & {
            pageSize?: number
            current?: number
            keywords?: string
          },
        ) =>
          tplListApiIbexTpls({
            ...params,
            p: params.current!,
            limit: params.pageSize!,
            query: params.keywords,
          }).then((res) => ({
            ...res,
            data: { ...res.data, list: res.data?.items },
          }))
        }
        searchPlaceholder="请输入ID/标题查询"
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              onClick={() => history.push("/ibex/tpls/add")}
              disabled={!access.canMenuIbexTplAdd}
            >
              新建
            </Button>,
          ],
        }}
      />
    </>
  )
}
