import { Button, Modal } from "antd"
import { useCallback, useState } from "react"
import HostOptionTable from "./host-option-table"

export default function HostDestroyModal() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        销毁主机
      </Button>
      <Modal
        title="销毁主机"
        open={open}
        onCancel={close}
        width="80%"
        centered
        footer={[
          <Button key="back" type="default" onClick={close}>
            返回
          </Button>,
        ]}
      >
        <div className="flex h-[80vh] w-full">
          <div className="h-full w-1/2">
            <HostOptionTable />
          </div>
          <div className="h-full w-1/2 overflow-y-auto px-3">表单</div>
        </div>
      </Modal>
    </>
  )
}
