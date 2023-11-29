import { RightOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Modal } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import HostDestroyForm, { ReleaseHost } from "./host-destroy-form"
import HostOptionTable from "./host-option-table"

export default function HostDestroyModal() {
  const access = useAccess()
  const [open, setOpen] = useState(false)

  const tableRef = useRef<ActionType>()
  const [selectedHosts, setSelectedHosts] = useState<CMDB.HostInfo[]>([])
  const [releasehosts, setReleasehosts] = useState<ReleaseHost[]>([])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) setReleasehosts([])
  }, [open])

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setOpen(true)}
        disabled={!access.hostDeleteApiOpsHosts}
      >
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
        destroyOnClose={true}
        maskClosable={false}
      >
        <div className="flex h-[80vh] w-full">
          <div className="h-full w-3/5">
            <HostOptionTable
              tableRef={tableRef}
              releaseHosts={releasehosts}
              onHostSelected={setSelectedHosts}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              disabled={selectedHosts.length === 0}
              onClick={() => {
                setReleasehosts((hosts) =>
                  hosts.concat(
                    selectedHosts.map((host) => ({
                      name: host.HostName,
                      Uid: host.Uid,
                      DestroyIns: true,
                    })),
                  ),
                )
                tableRef.current?.clearSelected?.()
              }}
            >
              <RightOutlined />
            </Button>
          </div>
          <div className="h-full w-full overflow-y-auto px-3">
            <HostDestroyForm
              releaseHosts={releasehosts}
              setReleaseHosts={setReleasehosts}
              onFinish={() => {
                setReleasehosts([])
                tableRef.current?.reload(true)
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
