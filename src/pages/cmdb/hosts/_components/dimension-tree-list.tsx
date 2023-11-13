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
import { Link, useLocation, useSearchParams } from "@umijs/max"
import { Button, Dropdown, Input, Select, Switch, Tree } from "antd"
import { DataNode } from "antd/es/tree"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useDeferredValue, useEffect, useMemo, useState } from "react"

const MIN_WIDTH = 200
const DEFAULT_WIDTH = 240

type NodeType = Omit<DataNode, "children"> & {
  name: string
  children?: NodeType[]
}

type TreeData = NodeType[] | undefined

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
  dimension,
  nodes,
  searchTerm,
}: {
  dimension: string
  nodes: TreeData
  searchTerm: string
}) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const nodeList = useMemo(() => {
    const list: NodeType[] = []

    nodes?.forEach((node) => {
      list.push(node)

      node.children?.forEach((child) => list.push(child))
    })

    return list
  }, [nodes])

  useEffect(() => {
    const newExpandedKeys = new Set<string>()

    nodeList
      ?.filter((node) => node.name.includes(searchTerm))
      .forEach((node) => {
        const keys = (node.key as string).split("%")
        if (keys.length > 1) {
          newExpandedKeys.add(keys[0])
        }
      })

    setExpandedKeys(Array.from(newExpandedKeys))
    setAutoExpandParent(true)
  }, [searchTerm])

  const [searchParams] = useSearchParams()
  const hostType = searchParams.get("hostType")
  const envId = searchParams.get("envId")

  useEffect(() => {
    if (!hostType || !envId) return

    const newExpandedKeys = new Set(expandedKeys)

    if (dimension === "env") {
      newExpandedKeys.add(envId)
    } else {
      newExpandedKeys.add(hostType)
    }

    setTimeout(() => {
      setExpandedKeys(Array.from(newExpandedKeys))
      setAutoExpandParent(true)
    }, 500)
  }, [hostType, envId, dimension])

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
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const { data } = useQuery({
    queryKey: ["host-dimension-tree-nodes", selectedDimension],
    queryFn: () =>
      selectedDimension === "env"
        ? envHostTypeTreeApiCmdbHostsEnvhosttype({}).then(
            (res) => (res.data?.Tree ?? []) as any,
          )
        : (hostTypeEnvTreeApiCmdbHostsHosttypeenv({}).then(
            (res) => res.data?.Tree ?? [],
          ) as any),
  })

  const treeData: TreeData = useMemo(() => {
    if (!data) return []

    if (selectedDimension === "env") {
      const list = (data as CMDB.EnvHostTypeSet[])
        ?.filter((env) => (hiddenZeroNode ? env.Count > 0 : true))
        .map((env) => ({
          title: (
            <TreeNode
              title={`${env.EnvName}(${env.Count})`}
              to={`?envId=${env.EnvId}`}
              searchTerm={deferredSearchTerm}
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
                searchTerm={deferredSearchTerm}
              />
            ),
            count: hostType.Count,
            name: hostType.HostType,
            key: `${env.EnvId}%${hostType.Uid}`,
          })),
        }))

      const total = list.reduce((prev, curr) => prev + curr.count, 0)

      return [
        {
          title: (
            <TreeNode title="全部" to="." searchTerm={deferredSearchTerm} />
          ),
          count: total,
          name: "全部",
          key: "all",
        },
        ...list,
      ]
    } else {
      const list = (data as CMDB.HostTypeEnvSet[])
        ?.filter((hostType) => (hiddenZeroNode ? hostType.Count > 0 : true))
        .map((hostType) => ({
          title: (
            <TreeNode
              title={`${hostType.HostType}(${hostType.Count})`}
              to={`?hostType=${hostType.HostType}`}
              searchTerm={deferredSearchTerm}
            />
          ),
          name: hostType.HostType,
          count: hostType.Count,
          key: hostType.Uid,
          children: hostType.EnvSet?.map((env) => ({
            title: (
              <TreeNode
                title={`${env.EnvName}(${env.Count})`}
                to={`?envId=${env.EnvId}&hostType=${hostType.HostType}`}
                searchTerm={deferredSearchTerm}
              />
            ),
            name: env.EnvName,
            count: env.Count,
            key: `${hostType.Uid}%${env.EnvId}`,
          })),
        }))

      const total = list.reduce((prev, curr) => prev + curr.count, 0)

      return [
        {
          title: (
            <TreeNode title="全部" to="." searchTerm={deferredSearchTerm} />
          ),
          count: total,
          name: "全部",
          key: "all",
        },
        ...list,
      ]
    }
  }, [data, hiddenZeroNode, deferredSearchTerm])

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="请输入环境/主机类型查询"
        />

        <TreeSelect
          nodes={treeData}
          searchTerm={deferredSearchTerm}
          dimension={selectedDimension}
        />
      </Resizable>
    </div>
  )
}
