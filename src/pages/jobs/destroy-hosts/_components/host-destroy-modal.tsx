import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Modal } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import HostDestroyForm, { ReleaseHost } from "./host-destroy-form"
import HostOptionTable from "./host-option-table"

export default function HostDestroyModal() {
  const access = useAccess()
  const [open, setOpen] = useState(false)

  const tableRef = useRef<ActionType>()
  const [releasehosts, setReleasehosts] = useState<ReleaseHost[]>([])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) setReleasehosts([])
  }, [open])

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        disabled={!access.releaseHostApiOpsReleasesHosts}
      >
        回收主机
      </Button>
      <Modal
        title="回收主机"
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
        <div className="flex h-[80vh] w-full gap-3">
          <div className="h-full w-3/5">
            <HostOptionTable
              tableRef={tableRef}
              releaseHosts={releasehosts}
              onHostSelect={(host) => {
                if (!releasehosts.some((item) => item.Uid === host.Uid)) {
                  setReleasehosts((hosts) => [
                    ...hosts,
                    { name: host.HostName, Uid: host.Uid, DestroyIns: true },
                  ])
                }
              }}
            />
          </div>

          <div className="h-full w-full overflow-y-auto px-3">
            <HostDestroyForm
              releaseHosts={releasehosts}
              setReleaseHosts={setReleasehosts}
              onFinish={() => {
                history.push("/jobs/tasks")
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
