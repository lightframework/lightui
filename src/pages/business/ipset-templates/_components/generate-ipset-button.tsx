import { ipsetTemplateGenerateDataApiOpsIpsettemplatesData } from "@/services/ops/ipsettemplate"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"

export default function GenerateIpsetButton() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    modal.confirm({
      title: "确定要生成ipset吗？",
      onOk: async () => {
        setLoading(true)
        await ipsetTemplateGenerateDataApiOpsIpsettemplatesData()
        message.success("生成成功")
        setLoading(false)
      },
    })
  }

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        disabled={!access.ipsetTemplateGenerateDataApiOpsIpsettemplatesData}
        onClick={handleClick}
        loading={loading}
      >
        一键生成Ipset
      </Button>
    </>
  )
}
