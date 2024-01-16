import { useToken } from "@/lib/hooks/use-token"
import { ipsetTemplateGenerateDataApiOpsIpsettemplatesData } from "@/services/ops/ipsettemplate"
import { useAccess } from "@umijs/max"
import { Button, ConfigProvider, message } from "antd"
import useModal from "antd/es/modal/useModal"

export default function GenerateAllIpsetButton() {
  const access = useAccess()
  const { token } = useToken()
  const [modal, contextHolder] = useModal()

  const handleClick = async () => {
    modal.confirm({
      title: "确定要更新 IP Set 数据库 吗？",
      content: (
        <span style={{ color: token.colorError }}>
          此操作会更新 IP 数据库，并生成所有模板的 IP Set。
        </span>
      ),
      onOk: async () => {
        ipsetTemplateGenerateDataApiOpsIpsettemplatesData({})
        message.info("请半个小时之后刷新查看")
      },
    })
  }

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#ffc069",
              colorPrimaryHover: "#ffd591",
            },
          },
        }}
      >
        <Button
          type="primary"
          disabled={!access.ipsetTemplateGenerateDataApiOpsIpsettemplatesData}
          onClick={handleClick}
        >
          更新 IP Set 数据库
        </Button>
      </ConfigProvider>
    </>
  )
}
