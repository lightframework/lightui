import { ipsetVersionsOfEnvApiOpsIpsetsByEnvuid } from "@/services/ops/ipset"
import { ProFormItem } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Transfer } from "antd"
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
      ipsetVersionsOfEnvApiOpsIpsetsByEnvuid({ uid: grayEnvUid }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!grayEnvUid,
  })

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  return (
    <ProFormItem
      label="IP集"
      name="versionIds"
      rules={[
        {
          required: true,
          message: "请选择要推送的IP集",
        },
      ]}
    >
      <Transfer
        titles={["可选IP集", "待推送IP集"]}
        dataSource={data}
        rowKey={(item) => String(item.versionId)}
        showSearch
        listStyle={{ height: 360, width: 400 }}
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
  )
}
