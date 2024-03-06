import { useQueryCertOptions } from "@/lib/hooks/data"
import { ProFormItem } from "@ant-design/pro-components"
import { Transfer } from "antd"
import { useState } from "react"

export default function CertTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const { data } = useQueryCertOptions()

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  return (
    <ProFormItem
      label="证书"
      name="certIds"
      rules={[
        {
          required: true,
          message: "请选择要下发的证书",
        },
      ]}
    >
      <Transfer
        titles={["可选证书", "待下发证书"]}
        dataSource={data}
        listStyle={{ height: 360, width: 337 }}
        rowKey={(item) => String(item.id)}
        showSearch
        onChange={onChange}
        targetKeys={targetKeys}
        render={(item) => `${item.domain} - ${item.certName}`}
      />
    </ProFormItem>
  )
}
