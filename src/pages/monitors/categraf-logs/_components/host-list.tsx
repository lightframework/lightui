import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import {
  hostCtfEnvListApiIbexCtfsLogsEnvs,
  hostCtfHostListApiIbexCtfsLogsHosts,
} from "@/services/ibex/logs"
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "@umijs/max"
import { Button, Input, List, Select, Spin, theme } from "antd"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import { useState } from "react"

const MIN_WIDTH = 240
const DEFAULT_WIDTH = 240

export default function HostList() {
  const { token } = theme.useToken()

  const [hidden, setHidden] = useLocalStorageState(
    `ctf-host-list-hidden`,
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    `ctf-host-list-width`,
    DEFAULT_WIDTH,
  )

  const [query, setQuery] = useState("")
  const [envName, setEnvName] = useState<string | undefined>()

  const [searchParams, setSearchParams] = useSearchParams()

  const hostUid = searchParams.get("hostUid")

  const { data: envOptions } = useQuery({
    queryKey: ["ctf-env-options"],
    queryFn: () =>
      hostCtfEnvListApiIbexCtfsLogsEnvs({}).then((res) => res.data?.items),
  })

  const { data, isFetching } = useQuery({
    queryKey: ["ctf-host-options", { query, envName }],
    queryFn: () =>
      hostCtfHostListApiIbexCtfsLogsHosts({ query, env_name: envName }).then(
        (res) => res.data?.items,
      ),
  })

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
        <div className="mb-2 font-semibold">主机列表</div>

        <Select
          options={envOptions?.map((env) => ({ value: env, label: env }))}
          placeholder="请选择环境"
          value={envName}
          onChange={(envName) => {
            setEnvName(envName)
            setSearchParams({
              ...Object.fromEntries(searchParams),
              envName: envName ?? "",
            })
          }}
          showSearch
          allowClear
        />

        <Input
          className="my-1.5"
          suffix={<SearchOutlined />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="请输入主机名查询"
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
            dataSource={[{ hostuid: "", hostname: "全部" }, ...(data ?? [])]}
            rowKey="hostuid"
            renderItem={(item) => (
              <List.Item>
                <div
                  onClick={() =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      hostUid: item.hostuid,
                    })
                  }
                  className="flex h-[34px] w-full cursor-pointer items-center justify-between truncate pl-3 pr-1 hover:bg-[#f1f4fe]"
                  style={
                    hostUid === item.hostuid
                      ? {
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorLink,
                        }
                      : { color: token.colorText }
                  }
                >
                  {item.hostname}
                </div>
              </List.Item>
            )}
          />
        )}
      </Resizable>
    </div>
  )
}
