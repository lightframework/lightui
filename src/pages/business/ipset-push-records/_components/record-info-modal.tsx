import { ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid } from "@/services/ops/ipset"
import { RightOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Button, Input, Modal, Tag } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"

export default function RecordInfoModal({
  open,
  onCancel,
  record,
}: {
  open: boolean
  onCancel: VoidFunction
  record?: OPS.IpsetPushRecord
}) {
  const [envKeywords, setEnvKeywords] = useState("")
  const [ipsetKeywords, setIpsetKeywords] = useState("")

  const { data } = useQuery({
    queryKey: ["ipset-push-record", record?.id],
    queryFn: () =>
      ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid({
        id: String(record?.id),
      }).then((res) => res.data),
    enabled: !!record?.id,
  })

  const [env, setEnv] = useState<OPS.IpsetEnvPushRecordInfo | undefined>()

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
  const ipsetTableData = env?.ipsetPushRecordVersions.filter((item) =>
    item.name.toLowerCase().includes(ipsetKeywords.toLowerCase()),
  )

  const envColumns: ColumnsType<OPS.IpsetEnvPushRecordInfo> = [
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

  const ipsetColumns: ColumnsType<OPS.IpsetPushRecordVersion> = [
    {
      title: "ipset名称",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "推送前版本",
      dataIndex: "oldVersion",
      width: 120,
      render: (value: OPS.IpsetVersionInfo) => value.ipsetVersionName,
    },
    {
      title: "推送后版本",
      dataIndex: "newVersion",
      width: 120,
      render: (value: OPS.IpsetVersionInfo) => value.ipsetVersionName,
    },
    {
      title: "当前版本",
      dataIndex: "currentVersion",
      width: 120,
      render: (value: OPS.IpsetVersionInfo) => value.ipsetVersionName,
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
          <Input
            style={{ width: 140 }}
            placeholder="请输入环境名称查询"
            onPressEnter={(e) => setEnvKeywords(e.currentTarget.value.trim())}
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
          <Input
            style={{ width: 140 }}
            placeholder="请输入ipset名称查询"
            onPressEnter={(e) => setIpsetKeywords(e.currentTarget.value.trim())}
          />
          <Table
            size="middle"
            dataSource={ipsetTableData}
            rowKey={(row) => row.ipsetId}
            columns={ipsetColumns}
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
