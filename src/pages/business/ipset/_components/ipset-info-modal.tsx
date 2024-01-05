import { useQueryIpsetInfo } from "@/lib/hooks/data"
import { copyTextToClipboard, toLocaleDateTimeString } from "@/lib/utils"
import { CheckOutlined, CopyOutlined } from "@ant-design/icons"
import { ProDescriptions } from "@ant-design/pro-components"
import { Button, List, Modal } from "antd"
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

  const { data } = useQueryIpsetInfo(ipset?.id)

  const handleCopy = async () => {
    if (!data?.cidrs) return
    await copyTextToClipboard(data.cidrs.join("\n"))
    setCopied(true)
  }

  return (
    <Modal
      title="ipset详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
    >
      <div className="max-h-[600px] overflow-y-auto">
        {ipset && data && (
          <ProDescriptions
            title={data.name}
            column={1}
            labelStyle={{ width: 60 }}
          >
            <ProDescriptions.Item label="ID">{ipset.id}</ProDescriptions.Item>
            <ProDescriptions.Item label="版本" copyable>
              {ipset.version}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="已存档">
              {ipset.isArchive ? "是" : "否"}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="cidrs">
              <div className="relative w-full">
                <List
                  className="max-h-52 w-full overflow-y-auto bg-zinc-700 px-2 py-1 text-white"
                  size="small"
                  bordered
                  locale={{
                    emptyText: <span className="text-white">暂无数据</span>,
                  }}
                  dataSource={data.cidrs ?? []}
                  renderItem={(i) => <div>{i}</div>}
                />
                {data.cidrs &&
                  (copied ? (
                    <a className="absolute right-4 top-2">
                      <CheckOutlined />
                    </a>
                  ) : (
                    <a className="absolute right-4 top-2" onClick={handleCopy}>
                      <CopyOutlined />
                    </a>
                  ))}
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="创建者">
              {data.createBy}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间">
              {toLocaleDateTimeString(data.createdAt)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="更新者">
              {data.updateBy}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="更新时间">
              {toLocaleDateTimeString(data.updatedAt)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="备注">
              {data.description}
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </div>
    </Modal>
  )
}
