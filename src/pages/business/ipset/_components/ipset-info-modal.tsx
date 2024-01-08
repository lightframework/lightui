import { useQueryIpsetInfo, useQueryIpsetVersions } from "@/lib/hooks/data"
import { copyTextToClipboard } from "@/lib/utils"
import { CheckOutlined, CopyOutlined, RightOutlined } from "@ant-design/icons"
import { Button, List, Modal, Spin, Table } from "antd"
import clsx from "clsx"
import { useEffect, useState } from "react"

export default function IpsetInfoModal({
  open,
  onCancel,
  ipset,
}: {
  open: boolean
  onCancel: VoidFunction
  ipset?: OPS.IpsetList
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const [versionId, setVersionId] = useState<number | undefined>()

  const ipsetQuery = useQueryIpsetInfo(ipset?.id, versionId)
  const versionsQuery = useQueryIpsetVersions(ipset?.id)

  useEffect(() => {
    if (!open) {
      setVersionId(undefined)
    }
  }, [open])

  const handleCopy = async () => {
    if (!ipsetQuery.data?.cidrs) return
    await copyTextToClipboard(ipsetQuery.data.cidrs.join("\n"))
    setCopied(true)
  }

  return (
    <Modal
      title="ipset详情"
      open={open}
      width={800}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
    >
      <div className="flex h-[600px] gap-2">
        <div className="w-1/2 space-y-2">
          <Table
            size="middle"
            dataSource={[
              {
                ipsetVersionId: undefined,
                ipsetVersionName: "全部",
              },
              ...(versionsQuery.data ?? []),
            ]}
            rowKey={(row) => row.ipsetVersionId ?? "全部"}
            loading={versionsQuery.isFetching}
            columns={[
              {
                title: "版本ID",
                dataIndex: "ipsetVersionId",
                width: 100,
                render: (value) => (value ? value : "-"),
              },
              {
                title: "版本名称",
                dataIndex: "ipsetVersionName",
                width: 140,
              },
            ]}
            pagination={false}
            scroll={{
              x: "100%",
              y: 500,
            }}
            onRow={(row) => ({
              onClick: () => setVersionId(row.ipsetVersionId),
            })}
            rowClassName={(row) =>
              row.ipsetVersionId === versionId
                ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
                : "cursor-pointer"
            }
          />
        </div>
        <RightOutlined />
        <div className="relative h-full w-1/2">
          <List
            className="h-full w-full overflow-y-auto bg-zinc-700 px-2 py-1 text-white"
            size="small"
            bordered
            locale={{
              emptyText: !ipsetQuery.isFetching ? (
                <span className="text-white">暂无数据</span>
              ) : null,
            }}
            dataSource={ipsetQuery.data?.cidrs ?? []}
            renderItem={(i) => <div>{i}</div>}
          />
          {ipsetQuery.data?.cidrs &&
            (copied ? (
              <a className="absolute right-4 top-2">
                <CheckOutlined />
              </a>
            ) : (
              <a className="absolute right-4 top-2" onClick={handleCopy}>
                <CopyOutlined />
              </a>
            ))}

          <div
            className={clsx(
              "absolute inset-0 place-items-center",
              ipsetQuery.isFetching ? "grid" : "hidden",
            )}
          >
            <Spin />
          </div>
        </div>
      </div>
    </Modal>
  )
}
