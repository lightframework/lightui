import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ProjectCreateApiCmdbProjects } from "@/services/cmdb/project"
import { PlusOutlined } from "@ant-design/icons"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function ProjectCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  return (
    <ModalForm<CMDB.ProjectCreateReq>
      title="新建项目"
      name="project-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.ProjectCreateApiCmdbProjects}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await ProjectCreateApiCmdbProjects(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText label="CusID" name="CusId" placeholder="" />
      <ProFormText
        label="项目ID"
        name="Project"
        placeholder=""
        rules={[{ required: true, message: "请输入项目ID" }]}
      />
      <ProFormText
        label="项目名称"
        name="ProjectName"
        placeholder=""
        rules={[{ required: true, message: "请输入项目名称" }]}
      />
      <ProFormText label="标识" name="Ident" placeholder="" />
      <ProFormText label="客户" name="Client" placeholder="" />
      <ProFormText label="销售" name="Sale" placeholder="" />
    </ModalForm>
  )
}
