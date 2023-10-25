import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { useToken } from "@/lib/hooks/use-token"
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { useSearchParams } from "@umijs/max"
import { Button, Dropdown, Input, Switch, Tree } from "antd"
import clsx from "clsx"
import { Resizable } from "re-resizable"
import React, { useEffect, useMemo, useState } from "react"
import ContinentCreateModalForm from "./continent-create-modal-form"

import { AllTreeNode } from "./all-tree-node"
import "./continent-tree-list.less"
import { ContinentTreeNode } from "./continent-tree-node"
import { CountryTreeNode } from "./country-tree-node"

const MIN_WIDTH = 200
const DEFAULT_WIDTH = 200

export default function ContinentTreeList({
  continents,
  refetch,
}: {
  continents: CMDB.PlaceContinent[]
  refetch: VoidFunction
}) {
  const { token } = useToken()
  const [hidden, setHidden] = useLocalStorageState(
    "continent-tree-list-hidden",
    false,
  )
  const [hiddenZeroNode, setHiddenZeroNode] = useLocalStorageState(
    "continent-tree-list-hidden-zero-node",
    false,
  )
  const [width, setWidth] = useLocalStorageState(
    "continent-tree-list-width",
    DEFAULT_WIDTH,
  )
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContinents = useMemo(
    () =>
      [
        {
          ContinentId: "all",
          Count: continents.reduce(
            (total, continent) => total + continent.Count,
            0,
          ),
          CountrySet: [],
          ContinentNameCn: "全部",
          Uid: "-1",
        } as CMDB.PlaceContinent,
      ].concat(
        hiddenZeroNode
          ? continents
              .filter((continent) => continent.Count)
              .map((continent) => ({
                ...continent,
                CountrySet: continent.CountrySet.filter(
                  (country) => country.Count,
                ).map((country) => ({
                  ...country,
                })),
              }))
          : continents,
      ),
    [hiddenZeroNode, continents],
  )

  const nodes = useMemo(
    () =>
      filteredContinents.map((continent) => ({
        title:
          continent.ContinentId === "all" ? (
            <AllTreeNode title={`全部(${continent.Count})`} />
          ) : (
            <ContinentTreeNode continent={continent} searchTerm={searchTerm} />
          ),
        name: continent.ContinentNameCn,
        key: `${continent.Uid}`,
        selectable: false,
        children: continent.CountrySet?.map((country) => ({
          title: (
            <CountryTreeNode
              country={country}
              searchTerm={searchTerm}
              continentUid={continent.Uid}
            />
          ),
          name: country.CountryNameCn,
          key: `${continent.Uid}-${country.Uid}`,
        })),
      })),
    [filteredContinents, searchTerm],
  )

  const nodeList = useMemo(() => {
    const list: { key: string; title: string }[] = []
    filteredContinents.forEach((continent) => {
      list.push({ key: continent.Uid, title: continent.ContinentNameCn })
      continent.CountrySet?.forEach((country) => {
        list.push({
          key: `${continent.Uid}-${country.Uid}`,
          title: country.CountryNameCn,
        })
      })
    })
    return list
  }, [filteredContinents])

  const [searchParams] = useSearchParams()
  const continentUid = searchParams.get("continentUid")
  const countryUid = searchParams.get("countryUid")

  useEffect(() => {
    const uids = [continentUid, countryUid].filter((uid) => uid !== null)
    if (uids.length > 1) {
      const parentKey = uids.slice(0, uids.length - 1).join("-")
      setExpandedKeys((keys) => [...keys, parentKey])
      setAutoExpandParent(true)
    }
  }, [continentUid, countryUid])

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
        <div className="flex items-center">
          <div className="mr-auto font-semibold">地区列表</div>
          <ContinentCreateModalForm onFinish={refetch} />
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
          className="continent-tree-list h-full overflow-y-auto"
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
