import { TABLE_MODAL_HEIGHT } from "@/constants/table"
import { useQueryHostOptions } from "@/lib/hooks/data"
import HostTable from "@/pages/cmdb/hosts/_components/host-table"
import { Button, List, message, Modal, Typography } from "antd"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect, useState } from "react"

export interface HostSearchModalProps {
  open: boolean
  onClose: VoidFunction
}

export default function HostSearchModal({
  open,
  onClose,
}: HostSearchModalProps) {
  const form = useFormInstance()

  const { data: hostOptions } = useQueryHostOptions()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const hosts = selectedKeys
    .map((key) => hostOptions?.find((host) => host.Uid === key))
    .filter((item) => !!item) as CMDB.HostOption[]

  useEffect(() => {
    if (open) {
      const formHosts: string[] | undefined = form.getFieldValue("hosts")

      setSelectedKeys(
        (formHosts
          ?.map(
            (hostName) =>
              hostOptions?.find((host) => host.HostName === hostName)?.Uid,
          )
          .filter((item) => !!item) ?? []) as string[],
      )
    } else {
      setSelectedKeys([])
    }
  }, [open, hostOptions, form])

  return (
    <Modal
      title="筛选主机"
      open={open}
      onCancel={onClose}
      onOk={() => {
        form.setFieldValue(
          "hosts",
          hosts.map((host) => host.HostName),
        )
        onClose()
      }}
      width="80dvw"
    >
      <div className="flex gap-2">
        <HostTable
          disabledActions
          height={TABLE_MODAL_HEIGHT}
          rowKey="Uid"
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (newSelectedRowKeys) => {
              const newKey = newSelectedRowKeys.at(-1)
              const host = hostOptions?.find((host) => host.Uid === newKey)

              if (
                host &&
                hostOptions?.some(
                  (item) =>
                    item.Uid !== newKey && item.HostName === host.HostName,
                )
              ) {
                message.error(
                  "该主机名称重复，影响脚本下发，无法选择，请先进行处理。",
                )
                return
              }

              setSelectedKeys(newSelectedRowKeys as string[])
            },
          }}
          onRow={(row) => ({
            onClick: () => {
              if (selectedKeys.includes(row.Uid)) {
                setSelectedKeys((keys) => keys.filter((key) => key !== row.Uid))
              } else {
                const someNameHosts = hostOptions?.filter(
                  (host) => host.HostName === row.HostName,
                )
                if (someNameHosts && someNameHosts.length > 1) {
                  message.error(
                    "该主机名称重复，影响脚本下发，无法选择，请先进行处理。",
                  )
                  return
                }
                setSelectedKeys((keys) => [...keys, row.Uid])
              }
            },
          })}
        />
        <div className="h-[600px] w-96 shrink-0 overflow-auto">
          <List
            className="mb-4"
            bordered
            rowKey={(host) => host.Uid}
            dataSource={hosts}
            renderItem={(host) => (
              <List.Item
                actions={[
                  <Button
                    key="remove"
                    type="link"
                    danger
                    onClick={() => {
                      setSelectedKeys((keys) =>
                        keys.filter((key) => key !== host.Uid),
                      )
                    }}
                  >
                    移除
                  </Button>,
                ]}
              >
                <Typography.Text ellipsis={{ tooltip: true }}>
                  {host.HostName}
                </Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}
