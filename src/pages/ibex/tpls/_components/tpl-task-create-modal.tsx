import {
  taskCreateApiIbexTasks,
  tplReadOneApiIbexByTplsid,
} from "@/services/ibex/tpl"
import { useQuery } from "@tanstack/react-query"
import { message, Modal } from "antd"
import TplDetails from "./tpl-details"

export interface TplTaskCreateModalProps {
  open: boolean
  tplId?: number
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function TplTaskCreateModal({
  open,
  tplId,
  onClose,
  onFinish,
}: TplTaskCreateModalProps) {
  const { data } = useQuery({
    queryKey: ["tpl", tplId],
    queryFn: () =>
      tplReadOneApiIbexByTplsid({ id: tplId!.toString() }).then(
        (res) => res.data?.data,
      ),
    enabled: !!tplId,
  })

  return (
    <Modal
      title="确定要创建脚本任务吗？"
      open={open}
      onCancel={onClose}
      onOk={async () => {
        await taskCreateApiIbexTasks({ ...data })
        message.success("创建成功")
        onFinish?.()
        onClose()
      }}
    >
      {data && <TplDetails tpl={data} />}
    </Modal>
  )
}
