import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useChatTagOptions } from "@/lib/hooks/data"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  chatDeleteApiOpsChatsById,
  chatPageListApiOpsChats,
} from "@/services/ops/chat"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Flex, Select, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import ChatCreateModalForm from "./chat-create-modal-form"
import ChatInfoModal from "./chat-info-modal"
import ChatUpdateModalForm from "./chat-update-modal-form"

async function chatExport() {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch("/api/ops/chats/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    })

    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)

    let filename = "chat.txt"

    const disposition = res.headers.get("Content-Disposition")
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      let matches = filenameRegex.exec(disposition)
      if (matches !== null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "")
      }
    }

    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    message.error("导出 Chat 失败")
  }
}

function TagsSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (value?: string[]) => void
}) {
  const tagQuery = useChatTagOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      onChange={onChange}
      placeholder="标签"
      options={tagQuery.data?.map((item) => ({
        label: item,
        value: item,
      }))}
      loading={tagQuery.isFetching}
      style={{
        width: 400,
      }}
      allowClear
      showSearch
      filterOption={(input, value) => {
        return (
          value?.label.toLowerCase().includes(input.trim().toLowerCase()) ??
          false
        )
      }}
    />
  )
}

export default function ChatTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const [tags, setTags] = useState<string[] | undefined>()
  const tableRef = useRef<ActionType>()

  const [selectedChatToView, setSelectedChatToView] = useState<
    OPS.ChatInfo | undefined
  >()
  const [selectedChatToUpdate, setSelectedChatToUpdate] = useState<
    OPS.ChatInfo | undefined
  >()

  const showDeleteConfirm = (chat: OPS.ChatInfo) =>
    modal.confirm({
      title: "确定删除该 Chat 吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除 Chat ${chat.title}`,
      onOk: async () => {
        await chatDeleteApiOpsChatsById({ id: String(chat.id) })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
    CreatedAt: { show: false },
    CreatedBy: { show: false },
    UpdatedAt: { show: false },
    UpdatedBy: { show: false },
  }

  const columns: TableColumns<OPS.ChatInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 240,
      render: (_, row) => (
        <a onClick={() => setSelectedChatToView(row)}>{row.title}</a>
      ),
    },
    {
      title: "关键词",
      dataIndex: "keywords",
      width: 300,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.keywords?.map((item) => <Tag key={item}>{item}</Tag>)}
        </Flex>
      ),
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
          {row.tag?.map((item) => <Tag key={item}>{item}</Tag>)}
        </Flex>
      ),
    },
    {
      title: "链接",
      key: "links",
      width: 300,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.links}
          renderItem={(item, index) => (
            <a href={item} target="_blank" rel="noreferrer">
              {row.linkNames[index]}
            </a>
          )}
        />
      ),
    },
    {
      title: "负责人",
      dataIndex: "persons",
      width: 160,
      ellipsis: true,
      render: (_, row) => row.persons?.join(" "),
    },
    {
      title: "创建者",
      dataIndex: "CreatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "CreatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.CreatedAt),
    },
    {
      title: "更新者",
      dataIndex: "UpdatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "UpdatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.UpdatedAt),
    },
    {
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedChatToUpdate(row),
              disabled: !access.chatUpdateApiOpsChatsById,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.chatDeleteApiOpsChatsById,
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
        name="chat"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入标题/关键词查询"
        params={{
          tag: tags?.join(","),
        }}
        request={chatPageListApiOpsChats}
        toolbar={{
          subTitle: <TagsSelect value={tags} onChange={setTags} />,
          actions: [
            <Button
              key="export"
              type="primary"
              onClick={chatExport}
              disabled={!access.chatExportApiOpsChatsExport}
            >
              导出
            </Button>,
            <ChatCreateModalForm
              key="chat-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <ChatInfoModal
        open={selectedChatToView !== undefined}
        onCancel={() => setSelectedChatToView(undefined)}
        chat={selectedChatToView}
      />
      <ChatUpdateModalForm
        open={selectedChatToUpdate !== undefined}
        onCancel={() => setSelectedChatToUpdate(undefined)}
        chat={selectedChatToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
