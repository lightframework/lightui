import { Input, Modal } from "antd"
import { useEffect, useState } from "react"

export interface OnlineDeployConfirmModalProps {
  open?: boolean
  onCancel?: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
}

export default function OnlineDeployConfirmModal({
  open,
  onCancel,
  env,
  onFinish,
}: OnlineDeployConfirmModalProps) {
  const [confirmEnvId, setConfirmEnvId] = useState("")

  useEffect(() => {
    if (!open) {
      setConfirmEnvId("")
    }
  }, [open])

  return (
    <Modal
      title="确定要部署线上环境吗？"
      width={500}
      open={open}
      destroyOnClose
      onCancel={onCancel}
      okButtonProps={{
        disabled: confirmEnvId !== env?.EnvId,
      }}
      onOk={() => {
        onFinish?.()
        onCancel?.()
      }}
      zIndex={9999}
    >
      <div className="mb-4 space-y-4">
        <div>
          你正在部署线上环境（环境名称：
          <span className="font-semibold">{env?.EnvName}</span>
          ，环境ID：<span className="font-semibold">{env?.EnvId}</span>）。
        </div>
        <div>请输入环境ID确认：</div>
        <Input
          value={confirmEnvId}
          onChange={(e) => setConfirmEnvId(e.target.value)}
        />
      </div>
    </Modal>
  )
}
