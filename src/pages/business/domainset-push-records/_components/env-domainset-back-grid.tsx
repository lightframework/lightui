import DebounceInput from "@/components/decounce-input"
import { useToken } from "@/lib/hooks/use-token"
import { RightOutlined } from "@ant-design/icons"
import { Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import clsx from "clsx"
import { forwardRef, useImperativeHandle, useState } from "react"

export type EnvDomainsetBackGridRef = {
  getEnvDomainsets: () => OPS.DomainsetEnvPushInfo[]
}

type EnvDomainsetBackGridProps = {
  data?: OPS.DomainsetEnvPushRecordInfo[]
}

const EnvDomainsetBackGrid = forwardRef<
  EnvDomainsetBackGridRef,
  EnvDomainsetBackGridProps
>(({ data }, ref) => {
  const { token } = useToken()

  const [envKeywords, setEnvKeywords] = useState("")
  const [domainsetKeywords, setDomainsetKeywords] = useState("")

  const [env, setEnv] = useState(data?.at(0))
  const [selectedEnvDomainsets, setSelectedEnvDomainsets] = useState<
    Record<string, OPS.DomainsetPushRecordVersion[]>
  >({})

  useImperativeHandle(ref, () => ({
    getEnvDomainsets: () =>
      Object.entries(selectedEnvDomainsets)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => ({
          uid: key,
          domainsetVersionIds: value.map(
            (item) => item.oldVersion.domainsetVersionId,
          ),
        })),
  }))

  const envTableData = data?.filter((item) =>
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
      render: (value: OPS.DomainsetVersionInfo, row) =>
        row.currentVersion.domainsetVersionId !== value.domainsetVersionId ? (
          <span
            style={{
              color: token.colorError,
            }}
          >
            {value.domainsetVersionName}
          </span>
        ) : (
          value.domainsetVersionName
        ),
    },
    {
      title: "当前版本",
      dataIndex: "currentVersion",
      width: 120,
      render: (value: OPS.DomainsetVersionInfo, row) =>
        row.newVersion.domainsetVersionId !== value.domainsetVersionId ? (
          <span style={{ color: token.colorSuccess }}>
            {value.domainsetVersionName}
          </span>
        ) : (
          value.domainsetVersionName
        ),
    },
  ]

  return (
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
            clsx(
              row.uid === env?.uid
                ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
                : "cursor-pointer",
              Object.keys(selectedEnvDomainsets).includes(row.uid) &&
                selectedEnvDomainsets[row.uid].length > 0 &&
                "[&>td]:!bg-[#e6f4ff] [&>td]:hover:!bg-[#e6f4ff]",
            )
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
          rowSelection={{
            selectedRowKeys: env
              ? selectedEnvDomainsets[env.uid]?.map((item) => item.domainsetId)
              : undefined,
            onChange: (_, selectedRows) => {
              setSelectedEnvDomainsets((record) => ({
                ...record,
                [env!.uid]: selectedRows,
              }))
            },
            getCheckboxProps: (row) => {
              if (row.oldVersion.domainsetVersionId === 0) {
                return { disabled: true }
              }
              return {}
            },
          }}
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
  )
})

EnvDomainsetBackGrid.displayName = "EnvIpsetBackGrid"

export default EnvDomainsetBackGrid
