import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  packagesOnlineRepoApiDepPackagesRepoonline,
  packagesOnlineVersionApiDepPackagesVersiononline,
} from "@/services/dep/packages"
import { taskCreateApiDepTasks } from "@/services/dep/task"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Form, Select, Space, Tooltip, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"

type FieldType = Partial<DEP.TaskCreateReq>

function VersionField({ name }: { name: number }) {
  const repo: string | undefined = useWatch(["package", name, "repo"])

  const { data: versionOptions, isFetching: isFetchingVersionOptions } =
    useQuery({
      queryKey: ["online-repo-version-options", repo],
      queryFn: () =>
        packagesOnlineVersionApiDepPackagesVersiononline({ repo }).then(
          (res) => res.data?.versions ?? [],
        ),
      enabled: !!repo,
    })

  return (
    <Form.Item name={[name, "version"]} noStyle>
      <Select
        loading={isFetchingVersionOptions}
        options={versionOptions?.map((version) => ({
          label: version,
          value: version,
        }))}
        showSearch
        allowClear
        filterOption={(input: string, option?: { label: string }) => {
          return (
            option?.label
              .toLocaleLowerCase()
              .includes(input.trim().toLocaleLowerCase()) ?? false
          )
        }}
        style={{ width: 110 }}
        placeholder="版本"
      />
    </Form.Item>
  )
}

export function PackageField() {
  const form = useFormInstance()

  const { data: repoOptions, isFetching: isFetchingRepoOptions } = useQuery({
    queryKey: ["online-repo-options"],
    queryFn: () =>
      packagesOnlineRepoApiDepPackagesRepoonline().then(
        (res) => res.data?.repos ?? [],
      ),
  })

  return (
    <Form.Item label="依赖包" required>
      <Form.List
        name="package"
        rules={[
          {
            validator(_, packages: FieldType["package"]) {
              if (!packages || packages.length < 1) {
                return Promise.reject()
              } else {
                return Promise.resolve()
              }
            },
            message: "请添加依赖包",
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 12 }}>
                <Space.Compact>
                  <Form.Item name={[name, "repo"]} noStyle>
                    <Select
                      options={repoOptions?.map((repo) => ({
                        label: repo,
                        value: repo,
                      }))}
                      loading={isFetchingRepoOptions}
                      style={{ width: 240 }}
                      allowClear
                      showSearch
                      filterOption={(
                        input: string,
                        option?: { label: string },
                      ) => {
                        return (
                          option?.label
                            .toLocaleLowerCase()
                            .includes(input.trim().toLocaleLowerCase()) ?? false
                        )
                      }}
                      placeholder="仓库"
                      onChange={() => {
                        form.setFieldValue(
                          ["package", name, "version"],
                          undefined,
                        )
                      }}
                    />
                  </Form.Item>
                  <VersionField name={name} />
                </Space.Compact>
                <Tooltip title="删除此项">
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </Tooltip>
              </Space>
            ))}
            <Form.Item noStyle>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                添加依赖包
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
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
      onValuesChange={console.log}
      initialValues={
        {
          product: "Orch",
          type: "Orch",
          taskType: "升级",
          job: "默认",
          package: [{}] as any,
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
      <PackageField />
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
