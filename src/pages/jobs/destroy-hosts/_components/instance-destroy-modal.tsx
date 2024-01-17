import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Modal } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import InstanceDestroyForm, { ReleaseInstance } from "./instance-destroy-form"
import InstanceOptionTable from "./instance-option-table"

export default function InstanceDestroyModal() {
  const access = useAccess()
  const [open, setOpen] = useState(false)

  const tableRef = useRef<ActionType>()
  const [releaseInstances, setReleaseInstances] = useState<ReleaseInstance[]>(
    [],
  )

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) setReleaseInstances([])
  }, [open])

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setOpen(true)}
        disabled={!access.releaseInstanceApiOpsReleasesInstances}
      >
        回收实例
      </Button>
      <Modal
        title="回收实例"
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
            <InstanceOptionTable
              tableRef={tableRef}
              releaseInstances={releaseInstances}
              onInstanceSelected={(instance) => {
                if (
                  !releaseInstances.some((item) => item.uid === instance.Uid)
                ) {
                  setReleaseInstances((instances) => [
                    ...instances,
                    { name: instance.InstanceName, uid: instance.Uid },
                  ])
                }
              }}
            />
          </div>

          <div className="h-full w-full overflow-y-auto px-3">
            <InstanceDestroyForm
              releaseInstances={releaseInstances}
              setReleaseInstances={setReleaseInstances}
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
