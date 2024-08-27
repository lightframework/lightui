import { crontabDeleteApiDepCrontabsDelete } from "@/services/dep/crontab"
import { ModalForm, ProFormTextArea } from "@ant-design/pro-components"
import { message } from "antd"
import { useEffect, useState } from "react"
import OnlineDeployConfirmModal from "../../deploy/_components/online-deploy-confirm-modal"

export interface CrontabDeleteConfirmModalProps {
  open?: boolean
  onCancel?: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
  crontab?: DEP.CrontabInfo
}

export default function CrontabDeleteConfirmModal({
  open,
  onCancel,
  env,
  crontab,
  onFinish,
}: CrontabDeleteConfirmModalProps) {
  const [showConfirmEnvModal, setShowConfirmEnvModal] = useState(false)
  const [reason, setReason] = useState<string | undefined>()

  useEffect(() => {
    if (!open) {
      setReason(undefined)
    }
  }, [open])

  if (crontab?.noticeState === "FINISH") {
    return (
      <OnlineDeployConfirmModal
        title="确定要删除定时任务吗？"
        open={open}
        onCancel={onCancel}
        env={env}
        onFinish={async () => {
          await crontabDeleteApiDepCrontabsDelete({
            id: crontab!.id,
            reason,
          })
          message.success("删除成功")
          onCancel?.()
          onFinish?.()
        }}
      />
    )
  }

  return (
    <>
      <ModalForm
        title="请输入取消原因"
        open={open}
        modalProps={{
          onCancel,
          destroyOnClose: true,
        }}
        width={500}
        onFinish={async (values) => {
          setShowConfirmEnvModal(true)
          setReason(values.reason)
        }}
      >
        <ProFormTextArea
          name="reason"
          placeholder=""
          rules={[{ required: true }]}
        />
      </ModalForm>
      {showConfirmEnvModal && (
        <OnlineDeployConfirmModal
          title="确定要删除定时任务吗？"
          open={showConfirmEnvModal}
          onCancel={() => setShowConfirmEnvModal(false)}
          env={env}
          onFinish={async () => {
            await crontabDeleteApiDepCrontabsDelete({
              id: crontab!.id,
              reason,
            })
            message.success("删除成功")
            setShowConfirmEnvModal(false)
            onCancel?.()
            onFinish?.()
          }}
        />
      )}
    </>
  )
}
