import {
  useQueryDomainSetTagOptions,
  useQueryDomainsetVersionOptions,
} from "@/lib/hooks/data"
import { ProFormItem } from "@ant-design/pro-components"
import { Select, Transfer } from "antd"
import { useEffect, useState } from "react"

export default function DomainsetVersionTransfer() {
  const [domainsetVersionIdMap, setDomainsetVersionIdMap] = useState<
    Record<string, string>
  >({})
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const [tags, setTags] = useState<string[] | undefined>()

  const { data } = useQueryDomainsetVersionOptions({ tags: tags?.join(",") })
  const { data: domainSetTags } = useQueryDomainSetTagOptions()
  const domainSetTagOptions = domainSetTags?.map((tag) => ({
    value: tag,
    label: tag,
  }))

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
        titles={[
          <div key="left">
            <Select
              mode="multiple"
              options={domainSetTagOptions}
              showSearch
              allowClear
              style={{ width: 150, marginRight: 8, textAlign: "left" }}
              maxTagCount="responsive"
              value={tags}
              onChange={setTags}
              placeholder="标签"
            />
            可选域名集
          </div>,
          "待推送域名集",
        ]}
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
            <div className="w-24 truncate">{item.name}</div>
            <Select
              onClick={(e) => e.stopPropagation()}
              onChange={(i) =>
                setDomainsetVersionIdMap((value) => ({
                  ...value,
                  [item.Id]: i,
                }))
              }
              style={{ width: 170 }}
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
