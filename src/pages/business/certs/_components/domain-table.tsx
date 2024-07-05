import Editable from "@/components/editable"
import Table, { TableColumns } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { dictGet, domainRenewStateDict } from "@/constants/dict"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { useQueryHostOptions, useQueryUserOptions } from "@/lib/hooks/data"
import {
  domainPageListApiOpsDomains,
  domainSyncApiOpsDomainsSync,
  domainUpdateDutyPersonApiOpsDomainsByPersonsdutyid,
  domainUpdateHostApiOpsDomainsByHostsid,
} from "@/services/ops/domain"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message, Select, Tag, Typography } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import CertTableModal from "./cert-table-modal"
import DomainCreateModalForm from "./domain-create-modal-form"

export default function DomainTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedDomainToViewCerts, setSelectedDomainToViewCerts] = useState<
    OPS.DomainInfo | undefined
  >()

  const { data: userOptions } = useQueryUserOptions()
  const { data: hostOptions } = useQueryHostOptions()

  const columns: TableColumns<OPS.DomainInfo> = [
    {
      title: "域名",
      dataIndex: "domainName",
      width: 300,
      copyable: true,
      fixed: "left",
    },
    {
      title: "ID",
      dataIndex: "id",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "证书",
      key: "certs",
      width: 100,
      render: (_, row) => (
        <Button
          size="small"
          type="link"
          onClick={() => setSelectedDomainToViewCerts(row)}
        >
          {row.certs?.length ?? 0}
        </Button>
      ),
    },
    {
      title: "主机",
      key: "hosts",
      width: 250,
      render: (_, row) => (
        <Editable
          disabled={!access.domainUpdateHostApiOpsDomainsByHostsid}
          value={row.hostList?.map((host) => host.uid)}
          onFinish={async (value) => {
            await domainUpdateHostApiOpsDomainsByHostsid(
              { id: String(row.id) },
              { hostUids: value },
            )
            tableRef.current?.reload()
          }}
          control={
            <Select
              mode="multiple"
              showSearch
              options={hostOptions?.map((host) => ({
                label: host.HostName,
                value: host.Uid,
              }))}
              style={{ width: 300 }}
              optionFilterProp="label"
            />
          }
        >
          <TableCellEllipsisList
            items={row.hostList}
            rowKey="uid"
            renderItem={(item) => (
              <Typography.Text copyable ellipsis={{ tooltip: true }}>
                {item.name}
              </Typography.Text>
            )}
          />
        </Editable>
      ),
    },
    {
      title: "到期天数",
      dataIndex: "dueDays",
      width: 100,
    },
    {
      title: "负责人",
      dataIndex: "dutyPersons",
      width: 100,
      render: (_, row) => (
        <Editable
          disabled={!access.domainUpdateDutyPersonApiOpsDomainsByPersonsdutyid}
          value={row.dutyPersons?.map((p) => p.id)}
          control={
            <Select
              mode="multiple"
              showSearch
              options={userOptions?.map((user) => ({
                label: user.username,
                value: user.id,
              }))}
              style={{ width: 200 }}
              optionFilterProp="label"
            />
          }
          onFinish={async (value) => {
            await domainUpdateDutyPersonApiOpsDomainsByPersonsdutyid(
              { id: String(row.id) },
              { userIds: value },
            )
            tableRef.current?.reload()
          }}
        >
          {row.dutyPersons?.map((p) => p.userName).join(",")}
        </Editable>
      ),
    },
    {
      title: "续期状态",
      dataIndex: "renewState",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row.renewState, domainRenewStateDict)?.borderColor}>
          {dictGet(row.renewState, domainRenewStateDict)?.value ??
            row.renewState}
        </Tag>
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        name="domain"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="输入域名查询"
        request={domainPageListApiOpsDomains}
        onDataSourceChange={(data) => {
          if (selectedDomainToViewCerts) {
            setSelectedDomainToViewCerts(
              data.find((item) => item.id === selectedDomainToViewCerts.id),
            )
          }
        }}
        toolbar={{
          actions: [
            <Button
              key="sync"
              disabled={!access.domainSyncApiOpsDomainsSync}
              onClick={() =>
                modal.confirm({
                  title: "确定要同步域名吗",
                  onOk: async () => {
                    await domainSyncApiOpsDomainsSync()
                    message.info("正在同步，预计耗时5分钟")
                    tableRef.current?.reload()
                  },
                })
              }
            >
              同步
            </Button>,
            <DomainCreateModalForm
              key="add"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <CertTableModal
        open={!!selectedDomainToViewCerts}
        onCancel={() => setSelectedDomainToViewCerts(undefined)}
        domain={selectedDomainToViewCerts}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
