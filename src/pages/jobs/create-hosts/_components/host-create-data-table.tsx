import TableCellActions from "@/components/table-cell-actions"
import { Button, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { HostCreateFormData } from "./host-create-form"

export default function HostCreateDataTable({
  hosts,
  selectedHost,
  onSelect,
  onCopy,
  onRemove,
  onAdd,
}: {
  hosts: HostCreateFormData[]
  selectedHost?: HostCreateFormData
  onSelect: (host: HostCreateFormData) => void
  onCopy: (host: HostCreateFormData) => void
  onRemove: (host: HostCreateFormData) => void
  onAdd: VoidFunction
}) {
  const columns: ColumnsType<HostCreateFormData> = [
    {
      title: "云商",
      key: "cloud",
      width: 100,
      render: (_, row) => row.cloud?.CloudName ?? "-",
    },
    {
      title: "区域 - 可用区",
      key: "regionZone",
      width: 200,
      render: (_, row) =>
        `${row.region?.RegionName ?? ""} - ${row.zone?.ZoneName ?? ""}`,
    },
    {
      title: "资源规格",
      key: "instanceType",
      width: 200,
      render: (_, row) =>
        row.instanceType
          ? `${row.instanceType.InstanceType}_${row.cpu}C${row.memory}G`
          : "-",
    },
    {
      title: "数量",
      dataIndex: "count",
      width: 65,
    },
    {
      title: "操作",
      key: "options",
      width: 100,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "复制",
              onClick: (e) => {
                e.stopPropagation()
                onCopy(row)
              },
            },
            {
              text: "删除",
              danger: true,
              onClick: (e) => {
                e.stopPropagation()
                onRemove(row)
              },
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        size="middle"
        dataSource={hosts}
        rowKey={(row) => row.uuid}
        columns={columns}
        pagination={{ size: "small" }}
        scroll={{
          x: "100%",
          // TODO: height
          y: 800,
        }}
        onRow={(row) => ({ onClick: () => onSelect(row) })}
        rowClassName={(row) =>
          row.uuid === selectedHost?.uuid
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : "cursor-pointer"
        }
      />
      <Button type="primary" block onClick={onAdd}>
        添加主机
      </Button>
    </>
  )
}
