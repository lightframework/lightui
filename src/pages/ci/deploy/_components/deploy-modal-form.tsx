import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  packagesOnlineRepoApiDepPackagesRepoonline,
  packagesOnlineVersionApiDepPackagesVersiononline,
} from "@/services/dep/packages"
import { taskCreateApiDepTasks } from "@/services/dep/task"
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Form, message } from "antd"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect } from "react"

type FieldType = Partial<DEP.TaskCreateReq>

function RepoField() {
  const { data, isFetching } = useQuery({
    queryKey: ["online-repo-options"],
    queryFn: () =>
      packagesOnlineRepoApiDepPackagesRepoonline().then(
        (res) => res.data?.repos ?? [],
      ),
  })

  return (
    <ProFormSelect
      label="仓库"
      name="repo"
      rules={[{ required: true, message: "请选择仓库" }]}
      options={data?.map((repo) => ({ label: repo, value: repo }))}
      fieldProps={{ loading: isFetching }}
      placeholder=""
      showSearch
    />
  )
}

function VersionField({ repo }: { repo: string }) {
  const form = useFormInstance()

  const { data, isFetching } = useQuery({
    queryKey: ["online-repo-version-options", repo],
    queryFn: () =>
      packagesOnlineVersionApiDepPackagesVersiononline({ repo }).then(
        (res) => res.data?.versions ?? [],
      ),
  })

  useEffect(() => {
    form.setFieldValue("version", data?.at(0))
  }, [data])

  return (
    <ProFormSelect
      label="版本"
      name="version"
      rules={[{ required: true, message: "请选择版本" }]}
      options={data?.map((version) => ({ label: version, value: version }))}
      fieldProps={{ loading: isFetching }}
      placeholder=""
      showSearch
    />
  )
}

export default function DeployModalForm({
  open,
  onCancel,
  env,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<DEP.TaskCreateReq>
      title="创建部署任务"
      name="ci-deploy"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!env) return false
        await taskCreateApiDepTasks({ envId: env.EnvId, ...formData })
        message.success("创建部署任务成功")
        onCancel()
        onFinish?.()
        return true
      }}
      initialValues={
        {
          product: "Orch",
          type: "Orch",
          taskType: "升级",
          job: "默认",
        } satisfies Partial<DEP.TaskCreateReq>
      }
    >
      <ProFormText
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
        placeholder=""
      />
      <ProFormRadio.Group
        label="产品"
        name="product"
        options={["Orch", "CPE"]}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        label="类型"
        name="type"
        options={["Orch", "CPE"]}
        rules={[{ required: true }]}
      />
      <RepoField />
      <Form.Item<FieldType>
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.repo !== currentValues.repo
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const repo = getFieldValue("repo")
          return repo ? <VersionField repo={repo} /> : null
        }}
      </Form.Item>
      <ProFormRadio.Group
        label="任务类型"
        name="taskType"
        options={["升级", "部署"]}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        label="jenkins"
        name="job"
        options={["默认", "test-cq"]}
        rules={[{ required: true }]}
      />
      <ProFormText
        label="操作人"
        name="operator"
        placeholder=""
        rules={[{ required: true }]}
      />
    </ModalForm>
  )
}
