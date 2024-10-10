import Table, { TableColumns, TableColumnsState } from "@/components/table"
import { TABLE_CELL_DESC_WIDTH, TABLE_MODAL_HEIGHT } from "@/constants/table"
import { useQueryEnvOptions, useQueryIpSetTagOptions } from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { ipsetPageListApiOpsIpsets } from "@/services/ops/ipset"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { Flex, Select, Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import IpsetInfoModal from "../../ipset/_components/ipset-info-modal"

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

function EnvSelect({
  value,
  onChange,
}: {
  value?: string
  onChange?: (envUid?: string) => void
}) {
  const options = useQueryEnvOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: item.EnvName,
        value: item.Uid,
      }))}
      filterOption={filterOption}
      placeholder="环境"
      style={{ width: 140 }}
      onChange={onChange}
      allowClear
      showSearch
    />
  )
}

export default function UsageIpsetTable({ ids }: { ids: number[] }) {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()

  const [envUid, setEnvUid] = useState<string | undefined>()
  const [tags, setTags] = useState<string[] | undefined>()
  const [overWall, setOverWall] = useState<number | undefined>()
  const [autoUpdate, setAutoUpdate] = useState<number | undefined>()

  const [selectedIpsetToView, setSelectedIpsetToView] = useState<
    OPS.IpsetList | undefined
  >()

  const { data: ipSetTags } = useQueryIpSetTagOptions()
  const ipSetTagOptions = ipSetTags?.map((tag) => ({ value: tag, label: tag }))

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<OPS.IpsetList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 140,
      render: (_, row) => (
        <Paragraph copyable={{ text: row.name }} style={{ marginBottom: 0 }}>
          <a onClick={() => setSelectedIpsetToView(row)}>{row.name}</a>
        </Paragraph>
      ),
    },
    {
      title: "版本",
      dataIndex: "version",
      width: 200,
    },
    {
      title: "标签",
      key: "tags",
      width: 240,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.tags?.map((item) => (
            <Tag key={item} color="blue">
              {item}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      title: "已存档",
      dataIndex: "isArchive",
      width: 80,
      render: (_, row) => (
        <Tag color={row.isArchive ? token.colorSuccess : token.colorError}>
          {row.isArchive ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "支持FQ",
      dataIndex: "overWall",
      width: 80,
      render: (_, row) =>
        row.overWall === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.overWall === 1 ? (
          <CloseCircleOutlined />
        ) : null,
    },
    {
      title: "自动更新",
      dataIndex: "autoUpdate",
      width: 80,
      render: (_, row) =>
        row.autoUpdate === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.autoUpdate === 1 ? (
          <CloseCircleOutlined />
        ) : null,
    },
    {
      title: "支持API",
      dataIndex: "officialSupportApi",
      width: 80,
      render: (_, row) =>
        row.officialSupportApi === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.officialSupportApi === 1 ? (
          <CloseCircleOutlined />
        ) : null,
    },
    {
      title: "备注",
      dataIndex: "description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <>
      <Table
        name="usage-ipset"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入名称/IP查询"
        params={{
          envUid,
          tags: tags?.join(","),
          overWall,
          autoUpdate,
          ids: ids.join(","),
        }}
        request={ipsetPageListApiOpsIpsets}
        toolbar={{
          subTitle: (
            <div className="flex gap-2">
              <EnvSelect value={envUid} onChange={setEnvUid} />
              <Select
                mode="multiple"
                placeholder="标签"
                options={ipSetTagOptions}
                showSearch
                allowClear
                className="w-40"
                value={tags}
                onChange={setTags}
                maxTagCount="responsive"
              />
              <Select
                placeholder="FQ"
                allowClear
                style={{ width: 100 }}
                options={[
                  { value: 1, label: "不支持FQ" },
                  { value: 2, label: "支持FQ" },
                  { value: 3, label: "无" },
                ]}
                value={overWall}
                onChange={setOverWall}
              />
              <Select
                placeholder="自动更新"
                allowClear
                style={{ width: 100 }}
                options={[
                  { value: 1, label: "手动更新" },
                  { value: 2, label: "自动更新" },
                  { value: 3, label: "无" },
                ]}
                value={autoUpdate}
                onChange={setAutoUpdate}
              />
            </div>
          ),
        }}
        scroll={{ y: TABLE_MODAL_HEIGHT }}
        defaultColumnsState={columnsState}
      />

      <IpsetInfoModal
        open={!!selectedIpsetToView}
        onCancel={() => setSelectedIpsetToView(undefined)}
        ipset={selectedIpsetToView}
      />
    </>
  )
}
