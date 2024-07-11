import DebounceInput from "@/components/decounce-input"
import { useToken } from "@/lib/hooks/use-token"
import { RightOutlined } from "@ant-design/icons"
import { Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import clsx from "clsx"
import { forwardRef, useImperativeHandle, useState } from "react"

export type EnvIpsetBackGridRef = {
  getEnvIpsets: () => OPS.IpsetEnvPushInfo[]
}

type EnvIpsetBackGridProps = {
  data?: OPS.IpsetEnvPushRecordInfo[]
}

const EnvIpsetBackGrid = forwardRef<EnvIpsetBackGridRef, EnvIpsetBackGridProps>(
  ({ data }, ref) => {
    const { token } = useToken()

    const [envKeywords, setEnvKeywords] = useState("")
    const [ipsetKeywords, setIpsetKeywords] = useState("")

    const [env, setEnv] = useState(data?.at(0))
    const [selectedEnvIpsets, setSelectedEnvIpsets] = useState<
      Record<string, OPS.IpsetPushRecordVersion[]>
    >({})

    useImperativeHandle(ref, () => ({
      getEnvIpsets: () =>
        Object.entries(selectedEnvIpsets)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([key, value]) => value.length > 0)
          .map(([key, value]) => ({
            uid: key,
            ipsetVersionIds: value.map(
              (item) => item.oldVersion.ipsetVersionId,
            ),
          })),
    }))

    const envTableData = data?.filter((item) =>
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
        title: "IP Set 名称",
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
        render: (value: OPS.IpsetVersionInfo, row) =>
          row.currentVersion.ipsetVersionId !== value.ipsetVersionId ? (
            <span
              style={{
                color: token.colorError,
              }}
            >
              {value.ipsetVersionName}
            </span>
          ) : (
            value.ipsetVersionName
          ),
      },
      {
        title: "当前版本",
        dataIndex: "currentVersion",
        width: 120,
        render: (value: OPS.IpsetVersionInfo, row) =>
          row.newVersion.ipsetVersionId !== value.ipsetVersionId ? (
            <span style={{ color: token.colorSuccess }}>
              {value.ipsetVersionName}
            </span>
          ) : (
            value.ipsetVersionName
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
                Object.keys(selectedEnvIpsets).includes(row.uid) &&
                  selectedEnvIpsets[row.uid].length > 0 &&
                  "[&>td]:!bg-[#e6f4ff] [&>td]:hover:!bg-[#e6f4ff]",
              )
            }
          />
        </div>
        <RightOutlined />
        <div className="space-y-2">
          <DebounceInput
            style={{ width: 140 }}
            placeholder="请输入 IP Set 名称查询"
            value={ipsetKeywords}
            onChange={setIpsetKeywords}
          />
          <Table
            size="middle"
            rowSelection={{
              selectedRowKeys: env
                ? selectedEnvIpsets[env.uid]?.map((item) => item.ipsetId)
                : undefined,
              onChange: (_, selectedRows) => {
                setSelectedEnvIpsets((record) => ({
                  ...record,
                  [env!.uid]: selectedRows,
                }))
              },
              getCheckboxProps: (row) => {
                if (row.oldVersion.ipsetVersionId === 0) {
                  return { disabled: true }
                }
                return {}
              },
            }}
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
    )
  },
)

EnvIpsetBackGrid.displayName = "EnvIpsetBackGrid"

export default EnvIpsetBackGrid
