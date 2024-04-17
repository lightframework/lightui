import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { AlertAggrViewCreateApiArgusAlertAggrViews } from "@/services/argus/alertAggrView"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function AggrViewCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  const { data: aggrFields } = useQuery({
    queryKey: ["dict-entries", "alert_aggr_fields"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_aggr_fields",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <ModalForm<ARGUS.AlertAggrViewCreateReq>
      title="创建聚合规则"
      name="aggr-view-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="link"
          disabled={!access["AlertAggrViewCreateApiArgusAlert-aggr-views"]}
        >
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="vertical"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await AlertAggrViewCreateApiArgusAlertAggrViews({
          ...formData,
          rule: (formData.rule as unknown as string[]).join("::"),
        })
        message.success("创建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入聚合规则名称" }]}
      />
      <ProFormSelect
        label="规则"
        name="rule"
        placeholder=""
        mode="multiple"
        rules={[{ required: true, message: "请选择聚合规则" }]}
        options={aggrFields?.map((item) => ({
          value: item.key,
          label: item.value,
        }))}
      />
      <ProFormSwitch
        label="是否公开"
        name="cate"
        rules={[{ required: true, message: "请选择是否公开" }]}
        transform={(value) => (value ? 1 : 0)}
      />
    </ModalForm>
  )
}
