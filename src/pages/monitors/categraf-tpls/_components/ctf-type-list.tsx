import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { ctfTypeListApiIbexCtfsTypes } from "@/services/ibex/tpls"
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "@umijs/max"
import { Button, Input, List, Spin, theme } from "antd"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import { useState } from "react"

const MIN_WIDTH = 240
const DEFAULT_WIDTH = 240

export default function CtfTypeList() {
  const { token } = theme.useToken()

  const [hidden, setHidden] = useLocalStorageState(
    `ctf-type-list-hidden`,
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    `ctf-type-list-width`,
    DEFAULT_WIDTH,
  )

  const [query, setQuery] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const type = searchParams.get("type")

  const { data, isFetching } = useQuery({
    queryKey: ["ctf-type-options"],
    queryFn: () => ctfTypeListApiIbexCtfsTypes().then((res) => res.data?.items),
  })

  const filteredData = data?.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div
      className="relative h-full shrink-0 rounded-sm"
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <Button
        size="small"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-full"
        style={{ width: "auto", height: 40 }}
        icon={hidden ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setHidden((hidden) => !hidden)}
      />

      <Resizable
        className={clsx(hidden && "hidden", "flex flex-col p-2")}
        size={{ width, height: "100%" }}
        onResizeStop={(_, __, ___, d) => setWidth((width) => width + d.width)}
        enable={{ right: true, bottom: false }}
        minWidth={MIN_WIDTH}
      >
        <div className="mb-2 font-semibold">监控项列表</div>

        <Input
          className="my-1.5"
          suffix={<SearchOutlined />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="请输入名称查询"
        />

        {isFetching ? (
          <div className="mt-10 text-center">
            <Spin />
          </div>
        ) : (
          <List
            className="h-full overflow-y-auto"
            size="small"
            split={false}
            dataSource={["全部", ...(filteredData ?? [])]}
            renderItem={(item) => (
              <List.Item>
                <div
                  onClick={() =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      type: item === "全部" ? "" : item,
                    })
                  }
                  className="flex h-[34px] w-full cursor-pointer items-center justify-between truncate pl-3 pr-1 hover:bg-[#f1f4fe]"
                  style={
                    type === item
                      ? {
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorLink,
                        }
                      : { color: token.colorText }
                  }
                >
                  {item}
                </div>
              </List.Item>
            )}
          />
        )}
      </Resizable>
    </div>
  )
}
