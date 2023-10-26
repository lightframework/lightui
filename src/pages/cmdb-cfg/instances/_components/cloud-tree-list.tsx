import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { useToken } from "@/lib/hooks/use-token"
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { Link, useLocation, useSearchParams } from "@umijs/max"
import { Button, Dropdown, Input, Switch, Tree } from "antd"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useEffect, useMemo, useState } from "react"

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

export default function CloudTreeList({
  clouds,
}: {
  clouds: CMDB.PlaceCloud[]
}) {
  const { token } = useToken()
  const [hidden, setHidden] = useLocalStorageState(
    "cloud-tree-list-hidden",
    false,
  )
  const [hiddenZeroNode, setHiddenZeroNode] = useLocalStorageState(
    "cloud-tree-list-hidden-zero-node",
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    "cloud-tree-list-width",
    DEFAULT_WIDTH,
  )
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClouds = useMemo(
    () =>
      [
        {
          Cloud: "all",
          Count: clouds.reduce((total, cloud) => total + cloud.Count, 0),
          RegionSet: [],
          ResourceGroup: "全部",
          Uid: "-1",
        } as CMDB.PlaceCloud,
      ].concat(
        hiddenZeroNode
          ? clouds
              .filter((cloud) => cloud.Count)
              .map((cloud) => ({
                ...cloud,
                RegionSet: cloud.RegionSet.filter((region) => region.Count).map(
                  (region) => ({
                    ...region,
                    ZoneSet: region.ZoneSet.filter((zone) => zone.Count),
                  }),
                ),
              }))
          : clouds,
      ),
    [hiddenZeroNode, clouds],
  )

  const nodes = useMemo(
    () =>
      filteredClouds.map((cloud) => ({
        title: (
          <TreeNode
            title={`${cloud.ResourceGroup}(${cloud.Count})`}
            to={cloud.ResourceGroup === "全部" ? "." : `?cloudUid=${cloud.Uid}`}
            searchTerm={searchTerm}
          />
        ),
        name: cloud.ResourceGroup,
        key: `${cloud.Uid}`,
        children: cloud.RegionSet?.map((region) => ({
          title: (
            <TreeNode
              title={`${region.RegionName}(${region.Count})`}
              to={`?cloudUid=${cloud.Uid}&regionUid=${region.Uid}`}
              searchTerm={searchTerm}
            />
          ),
          name: region.RegionName,
          key: `${cloud.Uid}-${region.Uid}`,
          children: region.ZoneSet?.map((zone) => ({
            title: (
              <TreeNode
                title={`${zone.ZoneName}(${zone.Count})`}
                to={`?cloudUid=${cloud.Uid}&regionUid=${region.Uid}&zoneUid=${zone.Uid}`}
                searchTerm={searchTerm}
              />
            ),
            name: zone.ZoneName,
            key: `${cloud.Uid}-${region.Uid}-${zone.Uid}`,
          })),
        })),
      })),
    [filteredClouds, searchTerm],
  )

  const nodeList = useMemo(() => {
    const list: { key: string; title: string }[] = []
    filteredClouds.forEach((cloud) => {
      list.push({ key: cloud.Uid, title: cloud.ResourceGroup })
      cloud.RegionSet?.forEach((region) => {
        list.push({
          key: `${cloud.Uid}-${region.Uid}`,
          title: region.RegionName,
        })
        region.ZoneSet?.forEach((zone) =>
          list.push({
            key: `${cloud.Uid}-${region.Uid}-${zone.Uid}`,
            title: zone.ZoneName,
          }),
        )
      })
    })
    return list
  }, [filteredClouds])

  const [searchParams] = useSearchParams()
  const cloudUid = searchParams.get("cloudUid")
  const regionUid = searchParams.get("regionUid")
  const zoneUid = searchParams.get("zoneUid")

  useEffect(() => {
    const uids = [cloudUid, regionUid, zoneUid].filter((uid) => uid !== null)
    if (uids.length > 1) {
      const parentKey = uids.slice(0, uids.length - 1).join("-")
      setTimeout(() => {
        setExpandedKeys((keys) => [...keys, parentKey])
        setAutoExpandParent(true)
      }, 500)
    }
  }, [cloudUid, regionUid, zoneUid])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setSearchTerm(value)

    const newExpandedKeys = new Set<string>()

    nodeList
      .filter((node) => node.title.includes(value))
      .forEach((node) => {
        const uids = node.key.split("-")
        if (uids.length > 1) {
          newExpandedKeys.add(uids.slice(0, uids.length - 1).join("-"))
        }
      })

    setExpandedKeys(Array.from(newExpandedKeys))
    setAutoExpandParent(true)
  }

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
          <div className="font-semibold">云商列表</div>
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
          onChange={onSearchChange}
        />

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
      </Resizable>
    </div>
  )
}
