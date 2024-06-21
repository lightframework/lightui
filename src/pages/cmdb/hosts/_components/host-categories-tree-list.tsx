import { useQueryNodeRuleOptions } from "@/lib/hooks/data"
import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { useToken } from "@/lib/hooks/use-token"
import { treeApiCmdbHostsTree } from "@/services/cmdb/host"
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Link, useLocation } from "@umijs/max"
import { Button, Dropdown, Input, Select, Tree } from "antd"
import { DataNode } from "antd/es/tree"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useEffect, useMemo, useState } from "react"
import NodeRuleTableModal from "./node-rule-table-modal"

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
        searchTerm &&
          title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          "bg-green-100",
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

function treeNodeConvert(
  treeNode: CMDB.TreeNode,
  searchTerm: string,
): DataNode {
  return {
    key: treeNode.Path,
    title: (
      <TreeNode
        to={`?path=${encodeURIComponent(treeNode.Path)}`}
        title={`${treeNode.Name || `（缺少名称）`}（${treeNode.Count}）`}
        searchTerm={searchTerm}
      />
    ),
    children: treeNode.Children?.map((item) =>
      treeNodeConvert(item, searchTerm),
    ),
  }
}

export default function HostCategoriesTreeList() {
  const { token } = useToken()

  const [hidden, setHidden] = useLocalStorageState(
    "host-categories-tree-list-hidden",
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    "host-categories-tree-list-width",
    DEFAULT_WIDTH,
  )

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const [selectedNodeRuleUid, setSelectedNodeRuleUid] = useState<
    string | undefined
  >()
  const [searchTerm, setSearchTerm] = useState("")
  const [openNodeRuleModal, setOpenNodeRuleModal] = useState(false)

  const nodeRuleQuery = useQueryNodeRuleOptions()

  const selectedNodeRule = nodeRuleQuery.data?.find(
    (item) => item.Uid === selectedNodeRuleUid,
  )

  const treeQuery = useQuery({
    queryKey: ["host-tree", selectedNodeRule],
    queryFn: () =>
      treeApiCmdbHostsTree({
        NodeRoot: selectedNodeRule!.NodeRoot,
        RuleDefinition: selectedNodeRule!.RuleDefinition,
      }).then((res) => res.data?.TreeNode),
    enabled: !!selectedNodeRule,
  })

  useEffect(() => {
    if (
      !selectedNodeRuleUid &&
      nodeRuleQuery.data &&
      nodeRuleQuery.data.length > 0
    ) {
      setSelectedNodeRuleUid(nodeRuleQuery.data[0].Uid)
    }
  }, [nodeRuleQuery.data])

  const dataList = useMemo(() => {
    if (!treeQuery.data?.Children) {
      return []
    }

    const nodes: { key: string; title: string }[] = []

    const generate = (node: CMDB.TreeNode) => {
      nodes.push({
        key: node.Path,
        title: node.Name,
      })
      node.Children?.map((item) => generate(item))
    }

    generate(treeQuery.data)

    return nodes
  }, [treeQuery.data])

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  useEffect(() => {
    const newExpandedKeys = dataList
      .filter(
        (item) =>
          searchTerm !== "" &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((item) => {
        return item.key.substring(0, item.key.lastIndexOf("/"))
      })

    const searchParams = new URLSearchParams(window.location.search)
    const path = searchParams.get("path")

    if (path && !newExpandedKeys.includes(path)) {
      newExpandedKeys.push(path)
    }

    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(true)
  }, [searchTerm, dataList])

  return (
    <>
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
              options={nodeRuleQuery.data?.map((item) => ({
                label: item.RuleName,
                value: item.Uid,
              }))}
              loading={nodeRuleQuery.isFetching}
              value={selectedNodeRuleUid}
              onChange={setSelectedNodeRuleUid}
              style={{ width: 120 }}
            />
            <Dropdown
              arrow
              placement="bottomRight"
              trigger={["click"]}
              menu={{
                items: [
                  {
                    label: "目录结构定义",
                    key: "node-rule-table-modal",
                    onClick: () => setOpenNodeRuleModal(true),
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
            placeholder="请输入关键字查询"
          />
          {treeQuery.data ? (
            <Tree
              className="h-full overflow-y-auto"
              switcherIcon={<DownOutlined />}
              blockNode
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onExpand={onExpand}
              treeData={[
                {
                  key: "all",
                  title: (
                    <TreeNode
                      title={`${treeQuery.data.Name}（${treeQuery.data.Count}）`}
                      to="."
                      searchTerm={searchTerm}
                    />
                  ),
                },
                ...(treeQuery.data.Children?.map((item) =>
                  treeNodeConvert(item, searchTerm),
                ) ?? []),
              ]}
            />
          ) : null}
        </Resizable>
      </div>
      <NodeRuleTableModal
        open={openNodeRuleModal}
        onCancel={() => setOpenNodeRuleModal(false)}
      />
    </>
  )
}
