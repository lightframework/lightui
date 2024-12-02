import { useQueryNodeRuleOptions } from "@/lib/hooks/data"
import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { useToken } from "@/lib/hooks/use-token"
import {
  teamDeleteApiSysTeamsById,
  teamSyncApiSysTeamsSync,
  teamTreeApiSysTeamsTree,
} from "@/services/sys/team"
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Link, useAccess, useLocation, useParams } from "@umijs/max"
import { Button, Input, message, Tree } from "antd"
import useModal from "antd/es/modal/useModal"
import { DataNode } from "antd/es/tree"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useEffect, useMemo, useState } from "react"
import TeamCreateModalForm from "./team-create-modal-form"
import TeamUpdateModalForm from "./team-update-modal-form"

const MIN_WIDTH = 200
const DEFAULT_WIDTH = 240

export interface FilterTreeItem {
  id?: number
  key: string
  label: string
  title: string
  to: string
  extra?: React.ReactNode
  disabled?: boolean
  editAble?: boolean
  onEditClick?: VoidFunction
  onRemoveClick?: VoidFunction
}

function TreeNode({ item }: { item: FilterTreeItem }) {
  const { teamId } = useParams()
  const { token } = useToken()
  const [isHover, setIsHover] = useState(false)

  const isActive = String(teamId) === String(item.id)
  return (
    <Link
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      to={item?.disabled ? "." : item?.to}
      className={clsx(
        "flex w-full justify-between px-3 py-1.5 hover:bg-[#f1f4fe]",
        item?.key &&
          item?.title?.toLowerCase().includes(item?.key?.toLowerCase()) &&
          "bg-green-100",
        item?.disabled && "cursor-not-allowed",
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
      <span className="truncate">{item?.title}</span>

      {/* {item?.extra && (
        <div className={clsx(isHover && "hidden")}>{item?.extra}</div>
      )} */}

      <div
        className={clsx(
          "flex gap-x-1",
          (!item.editAble || !isHover) && "hidden",
        )}
      >
        {item?.onEditClick && (
          <Button
            type="text"
            shape="circle"
            size="small"
            disabled={!item?.onEditClick}
            onClick={(e) => {
              // 防止触发链接的点击事件
              e.preventDefault()

              item?.onEditClick?.()
            }}
            icon={<EditOutlined />}
          />
        )}

        {item?.onRemoveClick && (
          <Button
            type="text"
            shape="circle"
            size="small"
            danger
            disabled={!item?.onRemoveClick}
            onClick={(e) => {
              // 防止触发链接的点击事件
              e.preventDefault()

              item?.onRemoveClick?.()
            }}
            icon={<DeleteOutlined />}
          />
        )}
      </div>
    </Link>
  )
}

function fmtPath(currentUrl: string, newId: number): string {
  // 定义用于匹配 teams/后数字的正则表达式
  const regex = /teams\/(\d+)/

  // 判断是否有匹配的情况
  if (regex.test(currentUrl)) {
    // 如果存在数字，则替换为 newId
    return currentUrl.replace(regex, `teams/${newId}`)
  } else {
    // 如果不存在数字，则拼接上 newId
    // 假设需要在URL末尾添加 /teams/newId
    return `${currentUrl}/${newId}`
  }
}
function treeNodeConvert(
  treeNode: SYS.TeamTreeNode,
  searchTerm: string,
  currentUrl: string,
  access: any,
  setCurrent: (team: SYS.TeamTreeNode) => void,
  delCurrent: (team: SYS.TeamTreeNode) => void,
): DataNode {
  return {
    key: treeNode.id,
    title: (
      <TreeNode
        item={{
          to: fmtPath(currentUrl, treeNode.id),
          title: treeNode.name || `（缺少名称）`,
          label: treeNode.name || `（缺少名称）`,
          id: treeNode.id,
          key: searchTerm,
          disabled: !treeNode.is_result,
          editAble: !treeNode.is_dept,
          onEditClick: access.teamUpdateApiSysTeamsById
            ? () => setCurrent(treeNode)
            : undefined,
          onRemoveClick: access.teamDeleteApiSysTeamsById
            ? () => delCurrent(treeNode)
            : undefined,
        }}
      />
    ),
    children: treeNode.children?.map((item) =>
      treeNodeConvert(
        item,
        searchTerm,
        currentUrl,
        access,
        setCurrent,
        delCurrent,
      ),
    ),
  }
}

export default function TeamTreeList(
  {
    //   useAdmin,
  }: {
    useAdmin?: boolean
  },
) {
  const { token } = useToken()
  const access = useAccess()
  const { pathname, search } = useLocation()
  const currentUrl = pathname + search
  const [modal, contextHolder] = useModal()

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

  const nodeRuleQuery = useQueryNodeRuleOptions()

  const selectedNodeRule = nodeRuleQuery.data?.find(
    (item) => item?.Uid === selectedNodeRuleUid,
  )
  const [selectedTeamToUpdate, setSelectedTeamToUpdate] = useState<
    SYS.TeamTreeNode | undefined
  >()

  const treeQuery = useQuery({
    queryKey: ["host-tree", selectedNodeRule],
    queryFn: () =>
      teamTreeApiSysTeamsTree({
        // UseAdmin: useAdmin,
        // NodeRoot: selectedNodeRule!.NodeRoot,
        // RuleDefinition: selectedNodeRule!.RuleDefinition,
      }).then((res) => res.data?.TeamTreeNode),
    enabled: !!selectedNodeRule,
  })
  const showDeleteConfirm = (team: SYS.TeamTreeNode, refetch: () => void) =>
    modal.confirm({
      title: "确定删除团队吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除团队 ${team.name}（${team.id}）`,
      onOk: async () => {
        await teamDeleteApiSysTeamsById({ id: String(team.id) })
        message.success("删除成功")
        refetch()
      },
    })
  const showSyncConfirm = (refetch: () => void) => {
    modal.confirm({
      title: "确定同步钉钉部门信息吗？",
      icon: <CloudDownloadOutlined />,
      content: `同步操作仅会更新部门的团队信息，不会对手动创建的团队产生影响！`,
      onOk: async () => {
        await teamSyncApiSysTeamsSync()
        message.success("同步成功！")
        refetch()
      },
    })
  }

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
    if (!treeQuery.data?.children) {
      return []
    }

    const nodes: { key: string; title: string }[] = []

    const generate = (node: SYS.TeamTreeNode) => {
      nodes.push({
        key: String(node.id),
        title: node.name,
      })
      node.children?.map((item) => generate(item))
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
          item?.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((item) => {
        return item?.key
      })

    console.log(newExpandedKeys)
    // const searchParams = new URLSearchParams(window.location.search)
    // const path = searchParams.get("path")

    // if (path && !newExpandedKeys.includes(path)) {
    //   newExpandedKeys.push(path)
    // }

    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(true)
  }, [searchTerm, dataList])

  return (
    <>
      {contextHolder}
      <div
        className="relative h-full shrink-0 rounded-sm"
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <div className="flex items-center justify-between pt-2">
          <span className="pl-3 font-semibold">团队列表</span>

          <div>
            <Button
              type="link"
              disabled={!access.teamSyncApiSysTeamsSync}
              onClick={() => {
                showSyncConfirm(treeQuery.refetch)
              }}
            >
              同步
            </Button>
            <TeamCreateModalForm onFinish={treeQuery.refetch} />
          </div>
        </div>
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
                      item={{
                        title: treeQuery.data.name,
                        to: "",
                        key: searchTerm,
                        label: treeQuery.data.name,
                        disabled: !treeQuery.data.is_result,
                        editAble: !treeQuery.data.is_dept,
                      }}
                    />
                  ),
                },
                ...(treeQuery.data.children?.map((item) =>
                  treeNodeConvert(
                    item,
                    searchTerm,
                    currentUrl,
                    access,
                    setSelectedTeamToUpdate,
                    () => {
                      showDeleteConfirm(item, treeQuery.refetch)
                    },
                  ),
                ) ?? []),
              ]}
            />
          ) : null}
        </Resizable>
        <TeamUpdateModalForm
          open={selectedTeamToUpdate !== undefined}
          onCancel={() => setSelectedTeamToUpdate(undefined)}
          team={selectedTeamToUpdate}
          onFinish={treeQuery.refetch}
        />
      </div>
    </>
  )
}
