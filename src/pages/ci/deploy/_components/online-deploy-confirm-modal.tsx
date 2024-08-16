import { Input, Modal } from "antd"
import { useEffect, useState } from "react"
import EnvDetails from "./env-details"

export interface OnlineDeployConfirmModalProps {
  title?: string
  open?: boolean
  onCancel?: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
  type?: string
}

export default function OnlineDeployConfirmModal({
  title,
  open,
  type,
  onCancel,
  env,
  onFinish,
}: OnlineDeployConfirmModalProps) {
  const [confirmEnvName, setConfirmEnvName] = useState("")
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!open) {
      setConfirmEnvName("")
      setCountdown(10)
    } else {
      let value = 10
      const interval = setInterval(() => {
        value--
        setCountdown(value)
        if (value === 0) {
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [open])

  return (
    <Modal
      title={title ?? "确定要部署线上环境吗？"}
      width={600}
      open={open}
      destroyOnClose
      onCancel={onCancel}
      okButtonProps={{
        disabled: confirmEnvName !== env?.EnvName,
      }}
      onOk={() => {
        onFinish?.()
        onCancel?.()
      }}
      zIndex={9999}
    >
      <div className="mb-4 space-y-4">
        {env && (
          <EnvDetails
            env={env}
            padding={false}
            extras={[
              {
                key: "type",
                label: "升级类型",
                children: type,
              },
            ]}
          />
        )}
        <div>
          {countdown !== 0 && <span>请等待{countdown}秒后，</span>}
          输入环境名称确认：
        </div>
        <Input
          disabled={!!countdown}
          value={confirmEnvName}
          onChange={(e) => setConfirmEnvName(e.target.value)}
        />
      </div>
    </Modal>
  )
}
