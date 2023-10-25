import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ZoneCreateApiCmdbZones } from "@/services/cmdb/zone"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Tooltip, message } from "antd"
import { useMetaData } from "../../_lib/use-meta-data"

export default function ZoneCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const { cloud, regionUid } = useMetaData()

  const button = (
    <Button
      type="primary"
      disabled={cloud?.SupportApi || !access.ZoneCreateApiCmdbZones}
    >
      <PlusOutlined />
      新建
    </Button>
  )

  return (
    <ModalForm<CMDB.ZoneCreateReq>
      title="新建可用区"
      name="zone-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        cloud?.SupportApi ? (
          <Tooltip title="该云商不支持手动添加可用区">{button}</Tooltip>
        ) : (
          button
        )
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await ZoneCreateApiCmdbZones(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText name="RegionUid" initialValue={regionUid} hidden />
      <ProFormText
        label="ID"
        name="Zone"
        placeholder=""
        rules={[{ required: true, message: "请输入可用区ID" }]}
      />
      <ProFormText
        label="名称"
        name="ZoneName"
        placeholder=""
        rules={[{ required: true, message: "请输入可用区名称" }]}
      />
      <ProFormSwitch
        label="可用状态"
        name="ZoneState"
        initialValue={true}
        transform={(value) => (value ? "AVAILABLE" : "UNAVAILABLE")}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
