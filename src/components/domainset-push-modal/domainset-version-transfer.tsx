import { useQueryDomainsetVersionOptions } from "@/lib/hooks/data"
import { ProFormItem } from "@ant-design/pro-components"
import { Select, Transfer } from "antd"
import { useEffect, useState } from "react"

export default function DomainsetVersionTransfer() {
  const [domainsetVersionIdMap, setDomainsetVersionIdMap] = useState<
    Record<string, string>
  >({})
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const { data } = useQueryDomainsetVersionOptions()

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  useEffect(() => {}, [data])

  return (
    <ProFormItem
      label="域名集"
      name="versionIds"
      transform={(domainsetIds: string[]) => {
        const versionIds = domainsetIds.map((domainsetId) => {
          const versionId = domainsetVersionIdMap[domainsetId]

          if (versionId) {
            return versionId
          }

          return data
            ?.find((item) => String(item.Id) === domainsetId)
            ?.versions?.at(0)?.domainsetVersionId
        })

        return {
          versionIds,
        }
      }}
      rules={[
        {
          required: true,
          message: "请选择要推送的域名集",
        },
      ]}
    >
      <Transfer
        titles={["可选域名集", "待推送域名集"]}
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
                setDomainsetVersionIdMap((value) => ({
                  ...value,
                  [item.Id]: i,
                }))
              }
              style={{ width: 150 }}
              defaultValue={
                domainsetVersionIdMap[item.Id] ??
                item.versions?.at(0)?.domainsetVersionId
              }
              options={item.versions?.map((item) => ({
                label: item.domainsetVersionName,
                value: item.domainsetVersionId,
              }))}
            />
          </div>
        )}
      />
    </ProFormItem>
  )
}
