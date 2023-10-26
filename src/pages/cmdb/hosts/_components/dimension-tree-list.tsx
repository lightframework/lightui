import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { useToken } from "@/lib/hooks/use-token"
import {
  envHostTypeTreeApiCmdbHostsEnvhosttype,
  hostTypeEnvTreeApiCmdbHostsHosttypeenv,
} from "@/services/cmdb/host"
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Link, history, useLocation, useSearchParams } from "@umijs/max"
import { Button, Dropdown, Input, Select, Switch, Tree, TreeProps } from "antd"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useEffect, useState } from "react"

const MIN_WIDTH = 200
const DEFAULT_WIDTH = 240

function TreeNode({
  to,
  title,
  searchTerm,
}: {
  to: string
  title: string
  searchTerm: string
}) {
  const { token } = useToken()
  const { search } = useLocation()

  const isActive = search ? search === to : to === "."

  return (
    <Link
      to={to}
      className={clsx(
        "block w-full px-3 py-1.5 hover:bg-[#f1f4fe]",
        searchTerm && title.includes(searchTerm) && "bg-[#f1f4fe]",
      )}
      style={
        isActive
          ? {
              backgroundColor: token.colorPrimaryBg,
              color: token.colorLink,
            }
          : {
              color: token.colorText,
            }
      }
    >
      {title}
    </Link>
  )
}

function TreeSelect({
  nodes,
  searchTerm,
}: {
  nodes: TreeProps["treeData"]
  searchTerm: string
}) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const nodeList = nodes?.flat()

  useEffect(() => {
    const newExpandedKeys = new Set<string>()

    nodeList
      ?.filter(
        (node) =>
          typeof node.title === "string" && node.title.includes(searchTerm),
      )
      .forEach((node) => {
        const uids = (node.key as string).split("%")
        if (uids.length > 1) {
          newExpandedKeys.add(uids.slice(0, uids.length - 1).join("%"))
        }
      })

    setExpandedKeys(Array.from(newExpandedKeys))
    setAutoExpandParent(true)
  }, [searchTerm])

  const [searchParams] = useSearchParams()
  const hostType = searchParams.get("hostType")
  const envId = searchParams.get("envId")

  useEffect(() => {
    const keys = [envId, hostType].filter((key) => key !== null)
    if (keys.length > 1) {
      const parentKey = keys.slice(0, keys.length - 1).join("%")
      setExpandedKeys((keys) => [...keys, parentKey])
      setAutoExpandParent(true)
    }
  }, [hostType, envId])

  return (
    <Tree
      className="h-full overflow-y-auto"
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      switcherIcon={<DownOutlined />}
      blockNode
      treeData={nodes}
      onExpand={(newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys as string[])
        setAutoExpandParent(false)
      }}
    />
  )
}

export default function DimensionTreeList() {
  const [searchParams] = useSearchParams()
  const hostType = searchParams.get("hostType")
  const envId = searchParams.get("envId")

  const { token } = useToken()
  const [hidden, setHidden] = useLocalStorageState(
    "host-dimension-tree-list-hidden",
    false,
  )
  const [hiddenZeroNode, setHiddenZeroNode] = useLocalStorageState(
    "host-dimension-tree-list-hidden-zero-node",
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    "host-dimension-tree-list-width",
    DEFAULT_WIDTH,
  )

  const [selectedDimension, setSelectedDimension] = useLocalStorageState(
    "host-dimension",
    "env",
  )

  const [searchTerm, setSearchTerm] = useState("")

  const { data } = useQuery({
    queryKey: ["host-dimension-tree-nodes", selectedDimension],
    queryFn: () =>
      selectedDimension === "env"
        ? envHostTypeTreeApiCmdbHostsEnvhosttype({}).then((res) =>
            (res.data?.Tree ?? []).map((env) => ({
              title: (
                <TreeNode
                  title={`${env.EnvName}(${env.Count})`}
                  to={`?envId=${env.EnvId}`}
                  searchTerm={searchTerm}
                />
              ),
              count: env.Count,
              name: env.EnvName,
              key: env.EnvId,
              children: env.HostTypeSet?.map((hostType) => ({
                title: (
                  <TreeNode
                    title={`${hostType.HostType}(${hostType.Count})`}
                    to={`?envId=${env.EnvId}&hostType=${hostType.HostType}`}
                    searchTerm={searchTerm}
                  />
                ),
                count: hostType.Count,
                name: hostType.HostType,
                key: `${env.EnvId}%${hostType.HostType}`,
              })),
            })),
          )
        : hostTypeEnvTreeApiCmdbHostsHosttypeenv({}).then((res) =>
            (res.data?.Tree ?? []).map((hostType) => ({
              title: (
                <TreeNode
                  title={`${hostType.HostType}(${hostType.Count})`}
                  to={`?hostType=${hostType.HostType}`}
                  searchTerm={searchTerm}
                />
              ),
              name: hostType.HostType,
              count: hostType.Count,
              key: hostType.HostType,
              children: hostType.EnvSet?.map((env) => ({
                title: (
                  <TreeNode
                    title={`${env.EnvName}(${env.Count})`}
                    to={`?envId=${env.EnvId}&hostType=${hostType.HostType}`}
                    searchTerm={searchTerm}
                  />
                ),
                name: env.EnvName,
                count: env.Count,
                key: `${hostType.HostType}%${env.EnvId}`,
              })),
            })),
          ),
  })

  useEffect(() => {
    if (hostType || envId) return

    if (data && data.length !== 0) {
      if (selectedDimension === "env") {
        history.replace(`/cmdb/hosts?envId=${data[0].key}`)
      } else {
        history.replace(`/cmdb/hosts?hostType=${data[0].key}`)
      }
    }
  }, [data, selectedDimension])

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
        onClick={() => setHidden((prev) => !prev)}
      />

      <Resizable
        className={clsx(hidden && "hidden", "flex flex-col p-2")}
        size={{ width, height: "100%" }}
        onResizeStop={(_, __, ___, d) => setWidth((width) => width + d.width)}
        enable={{ right: true, bottom: false }}
        minWidth={MIN_WIDTH}
      >
        <div className="flex items-center justify-between">
          <Select
            options={[
              { value: "hostType", label: "主机类型维度" },
              { value: "env", label: "环境维度" },
            ]}
            value={selectedDimension}
            onChange={setSelectedDimension}
            style={{ width: 120 }}
          />
          <Dropdown
            arrow
            placement="bottomRight"
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: (
                    <div
                      className="flex items-center gap-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>隐藏机器数量为0的节点</span>
                      <Switch
                        checked={hiddenZeroNode}
                        onClick={setHiddenZeroNode}
                      />
                    </div>
                  ),
                  key: "hidden-zero-node",
                },
              ],
            }}
          >
            <Button type="text" shape="circle" icon={<SettingOutlined />} />
          </Dropdown>
        </div>

        <Input
          className="my-1.5"
          suffix={<SearchOutlined />}
          placeholder="搜索功能暂时无效"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TreeSelect
          nodes={
            hiddenZeroNode
              ? data
                  ?.filter((item) => item.count > 0)
                  .map((item) => ({
                    ...item,
                    children: item.children?.filter((sub) => sub.count > 0),
                  }))
              : data
          }
          searchTerm={searchTerm}
        />
      </Resizable>
    </div>
  )
}
