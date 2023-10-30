import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import { useQueryPersonOptions } from "@/lib/hooks/data"
import { projectUpdateApiCmdbProjectsByUid } from "@/services/cmdb/project"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { message } from "antd"
import { useMemo } from "react"

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
  const salePersons = usePersonOptions("销售")

  const { data } = useQueryPersonOptions()

  const saleIds = useMemo(() => {
    const ids: string[] = []

    project?.Sales?.split(",").forEach((sale) => {
      const find = salePersons.find((item) => item.PersonName === sale)
      if (find) {
        ids.push(find.Uid)
      }
    })

    return ids
  }, [project, salePersons])

  const clientIds = useMemo(() => {
    const ids: string[] = []

    project?.Clients?.split(",").forEach((client) => {
      const find = data?.find((item) => item.PersonName === client)
      if (find) {
        ids.push(find.Uid)
      }
    })

    return ids
  }, [project, data])

  return (
    <ModalForm<CMDB.ProjectUpdateReq>
      title="更新项目"
      name="project-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...project,
        SaleIds: saleIds,
        ClientIds: clientIds,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
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
      <ProFormSelect
        label="客户"
        name="ClientIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={clientPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="销售"
        name="SaleIds"
        showSearch
        mode="multiple"
        placeholder=""
        options={salePersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
    </ModalForm>
  )
}
