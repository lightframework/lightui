import DebounceInput from "@/components/decounce-input"
import { domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsid } from "@/services/ops/domainset"
import { RightOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Button, Modal, Tag } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"

export default function RecordInfoModal({
  open,
  onCancel,
  record,
}: {
  open: boolean
  onCancel: VoidFunction
  record?: OPS.DomainsetPushRecord
}) {
  const [envKeywords, setEnvKeywords] = useState("")
  const [domainsetKeywords, setDomainsetKeywords] = useState("")

  const { data } = useQuery({
    queryKey: ["domainset-push-record", record?.id],
    queryFn: () =>
      domainsetPushRecordsReadOneApiOpsDomainsetsByPushrecordsid({
        id: String(record?.id),
      }).then((res) => res.data),
    enabled: !!record?.id,
  })

  const [env, setEnv] = useState<OPS.DomainsetEnvPushRecordInfo | undefined>()

  useEffect(() => {
    if (data?.envInfos && !env) {
      setEnv(data.envInfos.at(0))
    }
  }, [data])

  useEffect(() => {
    if (!open) {
      setEnv(undefined)
    }
  }, [open])

  if (!data) return null

  const envTableData = data.envInfos?.filter((item) =>
    item.envName.toLowerCase().includes(envKeywords.toLowerCase()),
  )
  const domainsetTableData = env?.domainsetPushRecordVersions.filter((item) =>
    item.name.toLowerCase().includes(domainsetKeywords.toLowerCase()),
  )

  const envColumns: ColumnsType<OPS.DomainsetEnvPushRecordInfo> = [
    {
      title: "环境名称",
      dataIndex: "envName",
      width: 120,
    },
    {
      title: "状态",
      dataIndex: "State",
      width: 80,
      render: (_, row) =>
        row.state ? (
          <Tag
            color={
              row.state === "ONLINE"
                ? "green"
                : row.state === "TEST"
                  ? "orange"
                  : undefined
            }
          >
            {row.state === "ONLINE"
              ? "线上"
              : row.state === "TEST"
                ? "测试"
                : row.state === "GRAY"
                  ? "灰度"
                  : row.state}
          </Tag>
        ) : (
          "-"
        ),
    },
  ]

  const domainsetColumns: ColumnsType<OPS.DomainsetPushRecordVersion> = [
    {
      title: "域名集",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "推送前版本",
      dataIndex: "oldVersion",
      width: 120,
      render: (value: OPS.DomainsetVersionInfo) => value.domainsetVersionName,
    },
    {
      title: "推送后版本",
      dataIndex: "newVersion",
      width: 120,
      render: (value: OPS.DomainsetVersionInfo) => value.domainsetVersionName,
    },
    {
      title: "当前版本",
      dataIndex: "currentVersion",
      width: 120,
      render: (value: OPS.DomainsetVersionInfo) => value.domainsetVersionName,
    },
  ]

  return (
    <Modal
      title={`${record?.title} 详情`}
      open={open}
      width={800}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
    >
      <div className="flex gap-2">
        <div className="space-y-2">
          <DebounceInput
            style={{ width: 140 }}
            placeholder="请输入环境名称查询"
            value={envKeywords}
            onChange={setEnvKeywords}
          />
          <Table
            size="middle"
            dataSource={envTableData}
            rowKey={(row) => row.uid}
            columns={envColumns}
            pagination={false}
            scroll={{
              x: "100%",
              y: 500,
            }}
            onRow={(row) => ({ onClick: () => setEnv(row) })}
            rowClassName={(row) =>
              row.uid === env?.uid
                ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
                : "cursor-pointer"
            }
          />
        </div>
        <RightOutlined />
        <div className="space-y-2">
          <DebounceInput
            style={{ width: 140 }}
            placeholder="请输入域名集名称查询"
            value={domainsetKeywords}
            onChange={setDomainsetKeywords}
          />
          <Table
            size="middle"
            dataSource={domainsetTableData}
            rowKey={(row) => row.domainsetId}
            columns={domainsetColumns}
            pagination={false}
            scroll={{
              x: "100%",
              y: 500,
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
