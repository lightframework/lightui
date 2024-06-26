import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { projectUpdateApiCmdbProjectsByUid } from "@/services/cmdb/project"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { message } from "antd"

export default function ProjectUpdateModalForm({
  open,
  onCancel,
  project,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  project?: CMDB.ProjectInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.ProjectUpdateReq>
      title="更新项目"
      name="project-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={project}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!project) return false
        await projectUpdateApiCmdbProjectsByUid({ uid: project.Uid }, formData)
        message.success("更新成功")
        onCancel()
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
