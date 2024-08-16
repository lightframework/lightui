import { TABLE_MODAL_HEIGHT } from "@/constants/table"
import HostTable from "@/pages/cmdb/hosts/_components/host-table"
import { Button, List, Modal, Typography } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"

export interface HostSearchModalProps {
  open: boolean
  onClose: VoidFunction
  onOk?: VoidFunction
}

export default function HostSearchModal({
  open,
  onClose,
  onOk,
}: HostSearchModalProps) {
  const form = useFormInstance()
  const hosts: string[] = useWatch("hosts") ?? []

  return (
    <Modal
      title="筛选主机"
      open={open}
      onCancel={onClose}
      onOk={onOk}
      width="80dvw"
      footer={null}
    >
      <div className="flex gap-2">
        <HostTable
          disabledActions
          height={TABLE_MODAL_HEIGHT}
          rowKey="HostName"
          rowSelection={{
            selectedRowKeys: hosts,
            onChange: (newSelectedRowKeys) =>
              form.setFieldValue("hosts", newSelectedRowKeys),
          }}
          onRow={(row) => ({
            onClick: () => {
              if (hosts?.includes(row.HostName)) {
                form.setFieldValue(
                  "hosts",
                  hosts.filter((host) => host !== row.HostName),
                )
              } else {
                form.setFieldValue("hosts", hosts.concat([row.HostName]))
              }
            },
          })}
        />
        <div className="h-[600px] w-96 shrink-0 overflow-auto">
          <List
            className="mb-4"
            bordered
            dataSource={hosts}
            renderItem={(host) => (
              <List.Item
                actions={[
                  <Button
                    key="remove"
                    type="link"
                    danger
                    onClick={() =>
                      form.setFieldValue(
                        "hosts",
                        hosts.filter((item) => item !== host),
                      )
                    }
                  >
                    移除
                  </Button>,
                ]}
              >
                <Typography.Text ellipsis={{ tooltip: true }}>
                  {host}
                </Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}
