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
import { Button, Select, Space, Tooltip } from "antd"
import { SortOrder } from "antd/es/table/interface"
import clsx from "clsx"
import { MutableRefObject, useEffect, useMemo, useState } from "react"
import DebounceInput from "./decounce-input"

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
  defaultColumnsState = {},
  autoRefresh = false,
  pagination,
  disabledDefaultKeywordsSearch,

  ...tableProps
}: Omit<
  ProTableProps<T, P>,
  "request" | "search" | "columnsState" | "actionRef"
> & {
  name: string
  search?: boolean
  searchPlaceholder?: string
  actionRef: MutableRefObject<ActionType | undefined>
  request?: (
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
  autoRefresh?: boolean
  defaultColumnsState?: TableColumnsState
  disabledDefaultKeywordsSearch?: boolean
}) {
  const [keywords, setKeywords] = useState<string | undefined>()
  const [columnsState, setColumnsState] = useLocalStorageState(
    `${name}-table-columns-state`,
    defaultColumnsState,
  )
  const [refetchInterval, setRefetchInterval] = useLocalStorageState<
    false | number
  >(`${name}-table-refetch-interval`, 3 * 1000)
  const [disableLoading, setDisableLoading] = useState(false)

  useEffect(() => {
    if (autoRefresh && refetchInterval) {
      const interval = setInterval(async () => {
        setDisableLoading(true)
        await actionRef.current?.reload(false)
        setDisableLoading(false)
      }, refetchInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refetchInterval, actionRef])

  const searchForm = useMemo(
    () => (
      <div className="flex gap-1">
        {autoRefresh ? (
          <Space.Compact key="refetch-interval">
            <Tooltip title="手动刷新">
              <Button
                icon={<SyncOutlined />}
                onClick={() => {
                  actionRef.current?.reload(false)
                }}
              />
            </Tooltip>
            <Select
              defaultValue={refetchInterval}
              style={{ width: 56 }}
              onChange={(value) => setRefetchInterval(value)}
              options={[
                {
                  label: "off",
                  value: false,
                },

                {
                  label: "3s",
                  value: 3 * 1000,
                },
                {
                  label: "5s",
                  value: 5 * 1000,
                },
                {
                  label: "10s",
                  value: 10 * 1000,
                },
                {
                  label: "30s",
                  value: 30 * 1000,
                },
                {
                  label: "60s",
                  value: 60 * 1000,
                },
              ]}
            />
          </Space.Compact>
        ) : (
          <Tooltip title="刷新">
            <Button
              type="default"
              icon={<SyncOutlined />}
              onClick={() => actionRef.current?.reload(false)}
            />
          </Tooltip>
        )}

        {!disabledDefaultKeywordsSearch && (
          <DebounceInput
            type="text"
            id={`${name}-table-keywords`}
            className="w-[200px]"
            placeholder={searchPlaceholder}
            value={keywords}
            onChange={(value) => {
              setKeywords(value)
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
      request={
        request
          ? async (params, sort) => {
              let sorter: [string, SortOrder] | undefined = undefined
              if (sort) {
                sorter = Object.entries(sort).at(0)
              }

              const res = await request({
                keywords,
                ...params,
                orderBy: sorter
                  ? `${sorter[1] === "ascend" ? "" : "-"}${sorter[0]}`
                  : undefined,
              })

              return {
                success: res.msg === "OK",
                total: res.data?.total,
                data: res.data?.list,
              }
            }
          : undefined
      }
      toolbar={{
        ...tableProps.toolbar,
        title: search ? searchForm : tableProps.toolbar?.title,
      }}
      className={clsx("overflow-x-auto", tableProps.className)}
      pagination={
        pagination === false
          ? false
          : {
              defaultPageSize: 20,
              showQuickJumper: true,
              showSizeChanger: true,
              ...pagination,
            }
      }
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
      loading={disableLoading ? false : tableProps.loading}
    />
  )
}
