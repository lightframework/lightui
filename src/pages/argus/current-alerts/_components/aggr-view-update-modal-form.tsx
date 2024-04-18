import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { alertAggrViewUpdateApiArgusAlertAggrViewsById } from "@/services/argus/alertAggrView"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { message } from "antd"

export default function AggrViewUpdateModalForm({
  open,
  onCancel,
  view,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  view?: ARGUS.AlertAggrView
  onFinish?: VoidFunction
}) {
  const { data: aggrFields } = useQuery({
    queryKey: ["dict-entries", "alert_tag_key"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_tag_key",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <ModalForm<ARGUS.AlertAggrViewUpdateReq>
      title="更新聚合规则"
      name="aggr-view-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="vertical"
      open={open}
      initialValues={{ ...view, rule: view?.rule.split("::") }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!view) return false

        await alertAggrViewUpdateApiArgusAlertAggrViewsById(
          { id: String(view.id) },
          {
            ...formData,
            rule: (formData.rule as unknown as string[]).join("::"),
          },
        )
        message.success("更新成功")
        onCancel()
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
