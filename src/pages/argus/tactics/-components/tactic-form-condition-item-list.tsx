import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { AutoComplete, Button, Form, Select, Space } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { NamePath } from "antd/es/form/interface"

function TagValueField({ namePath, name }: { namePath: number; name: number }) {
  const tagKey = useWatch(["conditions", namePath, name, "key"])

  const { data: tagValueOptions } = useQuery({
    queryKey: ["dict-entries", tagKey],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: tagKey,
      }).then((res) => res.data?.items ?? []),
    enabled: !!tagKey,
  })

  return (
    <Form.Item
      name={[name, "values"]}
      noStyle
      rules={[
        {
          required: true,
          message: "请选择 Value",
        },
      ]}
    >
      <Select
        placeholder={tagKey ? "请选择 Value" : "请先选择 Key"}
        mode="tags"
        style={{
          width: 360,
        }}
        options={tagValueOptions?.map((item) => ({
          value: item.key,
          label: item.value,
        }))}
      />
    </Form.Item>
  )
}

interface TacticFormConditionItemListProps {
  name: NamePath
}

export default function TacticFormConditionItemList({
  name: namePath,
}: TacticFormConditionItemListProps) {
  const form = useFormInstance()

  const { data: tagKeyOptions } = useQuery({
    queryKey: ["dict-entries", "alert_tag_key"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_tag_key",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: matchMode } = useQuery({
    queryKey: ["dict-entries", "tactic_condition_match_mode"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "tactic_condition_match_mode",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <Form.List
      name={namePath}
      initialValue={[{}]}
      rules={[
        {
          validator: (_, value) => {
            if (!Array.isArray(value) || value.length === 0) {
              return Promise.reject("请配置策略规则")
            } else {
              return Promise.resolve()
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <div className="space-y-2">
          {fields.map(({ key, name }, index) => (
            <div key={key} className="flex items-center gap-2">
              {fields.length > 1 && index !== 0 && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f3f4f6] text-[#3f56e2]">
                  且
                </div>
              )}
              <Space.Compact>
                <Form.Item
                  name={[name, "key"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请选择 Key",
                    },
                  ]}
                >
                  <AutoComplete
                    placeholder="请选择/输入 Key"
                    options={tagKeyOptions?.map((item) => ({
                      value: item.key,
                      label: item.value,
                    }))}
                    style={{
                      width: fields.length > 1 && index !== 0 ? 142 : 174,
                    }}
                    onChange={() =>
                      form.setFieldValue(
                        ["conditions", namePath, name, "values"],
                        undefined,
                      )
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={[name, "match_mode"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请选择匹配条件",
                    },
                  ]}
                >
                  <Select
                    placeholder="匹配条件"
                    options={matchMode?.map((mode) => ({
                      value: mode.key,
                      label: mode.value,
                    }))}
                    style={{
                      width: 70,
                    }}
                    suffixIcon={null}
                  />
                </Form.Item>
                <TagValueField namePath={namePath} name={name} />
              </Space.Compact>
              <MinusCircleOutlined
                className="cursor-pointer"
                onClick={() => remove(index)}
              />
            </div>
          ))}
          <Button onClick={() => add()} className="mt-2">
            <PlusOutlined />
            添加
          </Button>
          <Form.ErrorList className="text-red-500" errors={errors} />
        </div>
      )}
    </Form.List>
  )
}
