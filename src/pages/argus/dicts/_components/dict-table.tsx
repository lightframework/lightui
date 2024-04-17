import { TABLE_FULL_HEIGHT } from "@/constants/table"
import {
  dictionaryDeleteApiArgusDictsById,
  dictionaryistApiArgusDicts,
} from "@/services/argus/dict"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import { Button, Input, Table, message, theme } from "antd"
import useModal from "antd/es/modal/useModal"
import { ColumnsType } from "antd/es/table"
import clsx from "clsx"
import { useAtom } from "jotai"
import { useEffect, useMemo, useState } from "react"
import { selectedDictAtom } from "../_atoms"
import DictCreateModalForm from "./dict-create-modal-form"

export default function DictTable() {
  const access = useAccess()
  const [keywords, setKeywords] = useState("")
  const [modal, contextHolder] = useModal()
  const [selectedDict, setSelectedDict] = useAtom(selectedDictAtom)
  const { token } = theme.useToken()

  const { initialState } = useModel("@@initialState")
  const isSuper = initialState?.currentUser?.username === "lightops"

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["argus-dicts"],
    queryFn: () =>
      dictionaryistApiArgusDicts().then((res) => res.data?.items ?? []),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (!selectedDict && data && data.length > 0) {
      setSelectedDict(data[0])
    }
  }, [selectedDict, setSelectedDict, data])

  const showDeleteConfirm = (dict: ARGUS.Dictionary) =>
    modal.confirm({
      title: "确定删除字典吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除字典 ${dict.name}`,
      onOk: async () => {
        await dictionaryDeleteApiArgusDictsById({ id: String(dict.id) })
        message.success("删除成功")
        refetch()
      },
    })

  const columns: ColumnsType<ARGUS.Dictionary> = [
    {
      title: "字典名称",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "字典类型",
      dataIndex: "type",
      width: 120,
    },
    {
      title: "系统字典",
      dataIndex: "is_system",
      width: 80,
      render: (value) =>
        value ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : (
          <CloseCircleOutlined style={{ color: token.colorError }} />
        ),
    },
    {
      title: "操作",
      key: "actions",
      render: (_, row) => (
        <Button
          type="link"
          size="small"
          danger
          disabled={
            !access.dictionaryDeleteApiArgusDictsById ||
            (row.is_system && !isSuper)
          }
          onClick={() => showDeleteConfirm(row)}
        >
          删除
        </Button>
      ),
      width: 80,
    },
  ]

  const filteredData = useMemo(() => {
    const normalizedKeywords = keywords.trim().toLowerCase()

    return normalizedKeywords
      ? data?.filter((item) =>
          item.name
            .toLowerCase()
            .includes(normalizedKeywords.trim().toLowerCase()),
        )
      : data
  }, [data, keywords])

  return (
    <div className="w-1/2 cursor-pointer space-y-3">
      {contextHolder}
      <div className="flex justify-between">
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="名称"
          style={{ width: 240 }}
        />
        <DictCreateModalForm onFinish={() => refetch()} />
      </div>
      <Table
        dataSource={filteredData}
        rowKey="id"
        loading={isFetching}
        columns={columns}
        onRow={(row) => ({ onClick: () => setSelectedDict(row) })}
        pagination={{ pageSize: 30 }}
        scroll={{
          y: TABLE_FULL_HEIGHT,
        }}
        rowClassName={(row) =>
          clsx(
            "cursor-pointer",
            row.id === selectedDict?.id &&
              "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer",
          )
        }
      />
    </div>
  )
}
