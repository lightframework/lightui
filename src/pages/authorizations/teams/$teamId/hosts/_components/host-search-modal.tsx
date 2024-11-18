import { TABLE_MODAL_HEIGHT } from "@/constants/table"
import { PERM_EDIT } from "@/constants/vars"
import { useQueryHostOptions } from "@/lib/hooks/data"
import HostTable from "@/pages/cmdb/hosts/_components/host-table"
import { TeamPermAddApiSysTeamsByIdperms } from "@/services/sys/team"
import { Button, List, message, Modal, Typography } from "antd"
import { useState } from "react"

export interface HostSearchModalProps {
  open: boolean
  onClose: VoidFunction
  teamId: number
  reload: () => void
}

export default function HostSearchModal({
  open,
  onClose,
  teamId,
  reload,
}: HostSearchModalProps) {
  const { data: hostOptions } = useQueryHostOptions(0, PERM_EDIT, true)

  const [selectedHosts, setSelectedHosts] = useState<CMDB.HostInfo[]>([])

  return (
    <Modal
      title="筛选主机"
      open={open}
      onCancel={onClose}
      onOk={() => {
        TeamPermAddApiSysTeamsByIdperms(
          {
            id: String(teamId),
          },
          {
            resource: 2,
            uids: selectedHosts.map((host) => host.Uid),
          },
        ).then(() => {
          onClose()
          reload()
          setSelectedHosts(() => [])
          message.success("ok!")
        })
      }}
      width="80dvw"
    >
      <div className="flex gap-2">
        <HostTable
          disabledActions
          height={TABLE_MODAL_HEIGHT}
          perm={PERM_EDIT}
          useAdmin={true}
          rowKey="Uid"
          rowSelection={{
            selectedRowKeys: selectedHosts.map((host) => host.Uid),
            onChange: (_, newSelectedHosts) => {
              const newHost = newSelectedHosts.at(-1)

              if (
                newHost &&
                hostOptions?.some(
                  (item) =>
                    item.Uid !== newHost.Uid &&
                    item.HostName === newHost.HostName,
                )
              ) {
                message.error(
                  "该主机名称重复，影响脚本下发，无法选择，请先进行处理。",
                )
                return
              }

              setSelectedHosts(newSelectedHosts)
            },
          }}
          onRow={(row) => ({
            onClick: () => {
              if (selectedHosts.some((host) => host.Uid === row.Uid)) {
                setSelectedHosts((hosts) =>
                  hosts.filter((host) => host.Uid !== row.Uid),
                )
              } else {
                const someNameHosts = hostOptions?.filter(
                  (host) => host.HostName === row.HostName,
                )
                if (someNameHosts && someNameHosts.length > 1) {
                  message.error("该主机名称重复，无法选择，请先进行处理。")
                  return
                }
                setSelectedHosts((hosts) => [...hosts, row])
              }
            },
          })}
        />
        <div className="h-[600px] w-96 shrink-0 overflow-auto">
          <List
            className="mb-4"
            bordered
            rowKey={(host) => host.Uid}
            dataSource={selectedHosts}
            renderItem={(host) => (
              <List.Item
                actions={[
                  <Button
                    key="remove"
                    type="link"
                    danger
                    onClick={() => {
                      setSelectedHosts((hosts) =>
                        hosts.filter((item) => item.Uid !== host.Uid),
                      )
                    }}
                  >
                    移除
                  </Button>,
                ]}
              >
                <Typography.Text ellipsis={{ tooltip: true }}>
                  {`${host.HostName}_${host.Instance?.PrivateIpAddresses?.at(0)}`}
                </Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}
