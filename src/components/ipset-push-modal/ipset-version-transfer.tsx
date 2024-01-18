import { useQueryIpsetVersionOptions } from "@/lib/hooks/data"
import { ProFormItem } from "@ant-design/pro-components"
import { Select, Transfer } from "antd"
import { useEffect, useState } from "react"

export default function IpSetVersionTransfer() {
  const [ipsetVersionIdMap, setIpsetVersionIdMap] = useState<
    Record<string, string>
  >({})
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const { data } = useQueryIpsetVersionOptions()

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  useEffect(() => {}, [data])

  return (
    <ProFormItem
      label="IP Set"
      name="versionIds"
      transform={(ipsetIds: string[]) => {
        const versionIds = ipsetIds.map((ipsetId) => {
          const versionId = ipsetVersionIdMap[ipsetId]

          if (versionId) {
            return versionId
          }

          return data
            ?.find((item) => String(item.Id) === ipsetId)
            ?.versions.at(0)?.ipsetVersionId
        })

        return {
          versionIds,
        }
      }}
      rules={[
        {
          required: true,
          message: "请选择要推送的 IP Set",
        },
      ]}
    >
      <Transfer
        titles={["可选 IP Set", "待推送 IP Set"]}
        dataSource={data}
        listStyle={{ height: 360, width: 400 }}
        rowKey={(item) => String(item.Id)}
        showSearch
        filterOption={(inputValue, option) => {
          return option.name
            .toLowerCase()
            .includes(inputValue.trim().toLowerCase())
        }}
        onChange={onChange}
        targetKeys={targetKeys}
        render={(item) => (
          <div className="flex items-center">
            <div className="w-36 truncate">{item.name}</div>
            <Select
              onClick={(e) => e.stopPropagation()}
              onChange={(i) =>
                setIpsetVersionIdMap((value) => ({
                  ...value,
                  [item.Id]: i,
                }))
              }
              style={{ width: 150 }}
              defaultValue={
                ipsetVersionIdMap[item.Id] ??
                item.versions.at(0)?.ipsetVersionId
              }
              options={item.versions.map((item) => ({
                label: item.ipsetVersionName,
                value: item.ipsetVersionId,
              }))}
            />
          </div>
        )}
      />
    </ProFormItem>
  )
}
