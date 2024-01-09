import { envIpsetApiOpsIpsetsByEnvuid } from "@/services/ops/ipset"
import { ProFormItem } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { ConfigProvider, Transfer } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useState } from "react"

export default function IpSetVersionTransfer() {
  const form = useFormInstance()

  const grayEnvUid = useWatch("grayEnvUid", form)

  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const { data } = useQuery({
    queryKey: ["ipset-by-env", grayEnvUid],
    queryFn: () =>
      envIpsetApiOpsIpsetsByEnvuid({ uid: grayEnvUid }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!grayEnvUid,
  })

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Transfer: {
            listWidth: 400,
            listHeight: 360,
          },
        },
      }}
    >
      <ProFormItem
        label="ipset"
        name="versionIds"
        rules={[
          {
            required: true,
            message: "请选择要推送的ipset",
          },
        ]}
      >
        <Transfer
          titles={["可选ipset", "待推送ipset"]}
          dataSource={data}
          rowKey={(item) => String(item.versionId)}
          showSearch
          filterOption={(inputValue, option) => {
            return (
              option.ipsetName
                .toLowerCase()
                .includes(inputValue.trim().toLowerCase()) ||
              option.versionName
                .toLowerCase()
                .includes(inputValue.trim().toLowerCase())
            )
          }}
          onChange={onChange}
          targetKeys={targetKeys}
          render={(item) => (
            <div className="flex items-center">
              <div className="w-36 truncate">{item.ipsetName}</div>
              <div>{item.versionName}</div>
            </div>
          )}
        />
      </ProFormItem>
    </ConfigProvider>
  )
}
