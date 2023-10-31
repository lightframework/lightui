import { TABLE_FULL_HEIGHT } from "@/constants/table"
import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { SyncOutlined } from "@ant-design/icons"
import {
  ActionType,
  ColumnsState,
  ProColumns,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components"
import { Button, Input, Tooltip } from "antd"
import { SortOrder } from "antd/es/table/interface"
import { MutableRefObject, useMemo, useState } from "react"

type DataType = Record<string, any>
type Params = Record<string, any>

export type TableColumns<T extends DataType> = Omit<ProColumns<T>, "search">[]

export type TableColumnsState = Record<string, ColumnsState>

export default function Table<T extends DataType, P extends Params>({
  name,
  search = true,
  searchPlaceholder = "",
  actionRef,
  request,
  defaultColumnsState,
  ...tableProps
}: Omit<
  ProTableProps<T, P>,
  "request" | "search" | "columnsState" | "actionRef"
> & {
  name: string
  search?: boolean
  searchPlaceholder?: string
  actionRef: MutableRefObject<ActionType | undefined>
  request: (
    params: P & {
      pageSize?: number
      current?: number
      keywords?: string
    },
  ) => Promise<{
    msg?: string
    code?: number
    data?: {
      list?: T[]
      total?: number
    }
  }>
  defaultColumnsState?: TableColumnsState
}) {
  const [keywords, setKeywords] = useState<string | undefined>()
  const [columnsState, setColumnsState] = useLocalStorageState(
    `${name}-table-columns-state`,
    defaultColumnsState,
  )

  const searchForm = useMemo(
    () => (
      <div className="flex gap-1">
        <Tooltip title="刷新">
          <Button
            type="default"
            icon={<SyncOutlined />}
            onClick={() => actionRef.current?.reload(false)}
          />
        </Tooltip>

        {search && (
          <Input
            type="text"
            id={`${name}-table-keywords`}
            className="w-[260px]"
            placeholder={searchPlaceholder}
            onPressEnter={(e) => {
              setKeywords(e.currentTarget.value.trim())
              actionRef.current?.reload(true)
            }}
          />
        )}
      </div>
    ),
    [actionRef, search, searchPlaceholder],
  )

  return (
    <ProTable<T, P>
      {...tableProps}
      actionRef={actionRef}
      search={false}
      request={async (params, sort) => {
        let sorter: [string, SortOrder] | undefined = undefined
        if (sort) {
          sorter = Object.entries(sort).at(0)
        }

        const res = await request({
          ...params,
          keywords,
          orderBy: sorter
            ? `${sorter[1] === "ascend" ? "" : "-"}${sorter[0]}`
            : undefined,
        })

        return {
          success: res.msg === "OK",
          total: res.data?.total,
          data: res.data?.list,
        }
      }}
      toolbar={{
        title: searchForm,
        ...tableProps.toolbar,
      }}
      pagination={{
        defaultPageSize: 20,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
      scroll={{
        x: "100%",
        y: TABLE_FULL_HEIGHT,
        scrollToFirstRowOnChange: true,
        ...tableProps.scroll,
      }}
      columnsState={{
        value: columnsState,
        onChange: setColumnsState,
      }}
    />
  )
}
