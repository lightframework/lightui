import { useQueryIpsetEnvOptions } from "@/lib/hooks/data"
import { ProFormItem } from "@ant-design/pro-components"
import { ConfigProvider, Transfer } from "antd"
import { useState } from "react"

export default function EnvTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const { data } = useQueryIpsetEnvOptions()

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Transfer: {
            listWidth: 400,
          },
        },
      }}
    >
      <ProFormItem
        label="环境"
        name="envUids"
        rules={[
          {
            required: true,
            message: "请选择要推送的环境",
          },
        ]}
      >
        <Transfer
          titles={["可选环境", "待推送环境"]}
          dataSource={data}
          rowKey={(item) => item.Uid}
          showSearch
          onChange={onChange}
          targetKeys={targetKeys}
          render={(item) =>
            `${item.EnvName} - ${
              item.State === "ONLINE"
                ? "线上"
                : item.State === "TEST"
                  ? "测试"
                  : item.State === "GRAY"
                    ? "灰度"
                    : item.State
            }`
          }
        />
      </ProFormItem>
    </ConfigProvider>
  )
}
