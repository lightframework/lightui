import { RightOutlined } from "@ant-design/icons"
import { Input, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import clsx from "clsx"
import { forwardRef, useImperativeHandle, useState } from "react"

export type EnvIpsetBackGridRef = {
  getEnvIpsets: () => OPS.EnvPushInfo[]
}

type EnvIpsetBackGridProps = {
  data?: OPS.EnvPushRecordInfo[]
}

const EnvIpsetBackGrid = forwardRef<EnvIpsetBackGridRef, EnvIpsetBackGridProps>(
  ({ data }, ref) => {
    const [envKeywords, setEnvKeywords] = useState("")
    const [ipsetKeywords, setIpsetKeywords] = useState("")

    const [env, setEnv] = useState(data?.at(0))
    const [selectedEnvIpsets, setSelectedEnvIpsets] = useState<
      Record<string, OPS.IpsetPushRecordVersion[]>
    >({})

    useImperativeHandle(ref, () => ({
      getEnvIpsets: () =>
        Object.entries(selectedEnvIpsets)
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

    const envColumns: ColumnsType<OPS.EnvPushRecordInfo> = [
      {
        title: "环境名称",
        dataIndex: "envName",
        width: 120,
      },
      {
        title: "发布状态",
        dataIndex: "isGray",
        width: 50,
        render: (value: boolean) => (value ? "灰度" : "线上"),
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
        render: (value: OPS.VersionInfo) => value.ipsetVersionName,
      },
      {
        title: "推送后版本",
        dataIndex: "newVersion",
        width: 120,
        render: (value: OPS.VersionInfo) => value.ipsetVersionName,
      },
      {
        title: "当前版本",
        dataIndex: "currentVersion",
        width: 120,
        render: (value: OPS.VersionInfo) => value.ipsetVersionName,
      },
    ]

    return (
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
          <Input
            style={{ width: 140 }}
            placeholder="请输入ipset名称查询"
            onPressEnter={(e) => setIpsetKeywords(e.currentTarget.value.trim())}
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
