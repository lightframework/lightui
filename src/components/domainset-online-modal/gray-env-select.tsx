import { useQueryDomainsetEnvOptions } from "@/lib/hooks/data"
import { ProFormSelect, ProFormText } from "@ant-design/pro-components"
import useFormInstance from "antd/es/form/hooks/useFormInstance"

export default function GrayEnvSelect() {
  const form = useFormInstance()

  const { data, isFetching } = useQueryDomainsetEnvOptions()

  return (
    <>
      <ProFormSelect
        label="灰度环境"
        name="grayEnvUid"
        showSearch
        options={data
          ?.filter((item) => item.IsGray)
          .map((item) => ({ label: item.EnvName, value: item.Uid }))}
        fieldProps={{
          loading: isFetching,
        }}
        placeholder=""
        rules={[
          {
            required: true,
            message: "请选择灰度环境",
          },
        ]}
        onChange={(value: string, option) => {
          form.setFieldValue(
            "grayEnvName",
            (option as { label: string; value: string })?.label,
          )
        }}
      />
      <ProFormText name="grayEnvName" hidden />
    </>
  )
}
