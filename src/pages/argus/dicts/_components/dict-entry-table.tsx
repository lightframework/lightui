import { TABLE_FULL_HEIGHT } from "@/constants/table"
import {
  entryDeleteApiArgusDictsByEntriesid,
  entryGetByIdApiArgusDictsByIdentries,
} from "@/services/argus/dict"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import { Button, Input, message } from "antd"
import useModal from "antd/es/modal/useModal"
import Table, { ColumnsType } from "antd/es/table"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"
import { selectedDictAtom } from "../_atoms"
import EntryCreateModalForm from "./entry-create-modal-form"

export default function DictEntryTable() {
  const access = useAccess()
  const [keywords, setKeywords] = useState("")
  const [modal, contextHolder] = useModal()
  const selectedDict = useAtomValue(selectedDictAtom)

  const { initialState } = useModel("@@initialState")
  const isSuper = initialState?.currentUser?.username === "lightops"

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["dict-entries", selectedDict?.id],
    queryFn: () =>
      entryGetByIdApiArgusDictsByIdentries({
        id: String(selectedDict!.id),
      }).then((res) => res.data?.items ?? []),
    enabled: !!selectedDict,
    placeholderData: keepPreviousData,
  })

  const showDeleteConfirm = (entry: ARGUS.DictionaryEntry) =>
    modal.confirm({
      title: "确定删除字典项吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除字典项 ${entry.key}`,
      onOk: async () => {
        await entryDeleteApiArgusDictsByEntriesid({ id: String(entry.id) })
        message.success("删除成功")
        refetch()
      },
    })

  const columns: ColumnsType<ARGUS.DictionaryEntry> = [
    {
      title: "键",
      dataIndex: "key",
      width: 200,
    },
    {
      title: "值",
      dataIndex: "value",
      width: 200,
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
            !access.entryDeleteApiArgusDictsByEntriesid ||
            (selectedDict?.is_system && !isSuper)
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
          item.key
            .toLowerCase()
            .includes(normalizedKeywords.trim().toLowerCase()),
        )
      : data
  }, [data, keywords])

  return (
    <div className="w-1/2 space-y-3">
      {contextHolder}
      <div className="flex justify-between">
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="键"
          style={{ width: 240 }}
        />
        <EntryCreateModalForm onFinish={() => refetch()} />
      </div>
      <Table
        dataSource={filteredData}
        loading={isFetching}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 30 }}
        scroll={{
          y: TABLE_FULL_HEIGHT,
        }}
      />
    </div>
  )
}
