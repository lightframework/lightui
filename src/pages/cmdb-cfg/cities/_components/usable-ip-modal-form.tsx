import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  awdbGetPingIpApiOpsIpsetsTemplatesPing,
  locationListApiOpsIpsetsTemplatesLocation,
} from "@/services/ops/ipsettemplate"
import {
  ModalForm,
  ProFormSelect,
  useDebounceValue,
} from "@ant-design/pro-components"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { useState } from "react"

function LocationField() {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounceValue(value, 500)

  const { data, isFetching } = useQuery({
    queryKey: ["limit", debouncedValue],
    queryFn: () =>
      locationListApiOpsIpsetsTemplatesLocation({
        keywords: debouncedValue,
      }).then((res) => res.data?.list ?? []),
    placeholderData: keepPreviousData,
    enabled: !!debouncedValue,
  })

  const handleSearch = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ProFormSelect
      label="地区"
      name="location"
      placeholder="输入关键字查询地区"
      showSearch
      options={data?.map((item) => ({
        label: item.name,
        value: item.name,
      }))}
      fieldProps={{
        loading: isFetching,
        defaultActiveFirstOption: false,
        filterOption: false,
        onSearch: handleSearch,
      }}
      rules={[
        {
          required: true,
          message: "请选择地区",
        },
      ]}
    />
  )
}

export default function UsableIpModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<OPS.AwdbGetPingIpReq>
      title="地区可用IP"
      name="usable-ip"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.awdbGetPingIpApiOpsIpsetsTemplatesPing}
        >
          地区可用IP
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 3 }}
      onFinish={async (formData) => {
        await awdbGetPingIpApiOpsIpsetsTemplatesPing(formData)
        message.info("正在执行，结果将发送到钉钉")
        onFinish?.()
        return true
      }}
    >
      <LocationField />
    </ModalForm>
  )
}
