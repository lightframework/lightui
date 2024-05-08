import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  packagesAllRepoApiDepPackagesRepo,
  packagesOnlineRepoApiDepPackagesRepoonline,
  packagesOnlineVersionApiDepPackagesVersiononline,
  packagesVersionApiDepPackagesByRepoversion,
} from "@/services/dep/packages"
import { taskCreateApiDepTasks } from "@/services/dep/task"
import { ModalForm, ProFormRadio } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Form, Select, Space, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect, useState } from "react"
import OnlineDeployConfirmModal from "./online-deploy-confirm-modal"

type FieldType = Partial<DEP.TaskCreateReq>

function VersionField({
  index,
  isOnline,
  required,
}: {
  index: number
  isOnline?: boolean
  required?: boolean
}) {
  const form = useFormInstance()
  const repo: string | undefined = useWatch(["package", index, "repo"])

  const { data: versionOptions, isFetching: isFetchingVersionOptions } =
    useQuery({
      queryKey: ["deploy-form-repo-version-options", repo, isOnline],
      queryFn: () =>
        isOnline
          ? packagesOnlineVersionApiDepPackagesVersiononline({
              repo: repo!,
            }).then((res) => res.data?.versions ?? [])
          : packagesVersionApiDepPackagesByRepoversion({ repo: repo! }).then(
              (res) => res.data?.versions ?? [],
            ),
      enabled: !!repo,
    })

  useEffect(() => {
    if (!repo) {
      form.setFieldValue(["package", index, "version"], undefined)
    }
  }, [repo, index])

  return (
    <Form.Item
      name={["package", index, "version"]}
      noStyle
      dependencies={["taskType"]}
      rules={[
        { required, message: "请选择版本" },
        (form) => ({
          validateTrigger: ["onBlur", "onChange"],
          message: "请选择版本",
          validator: (_, value) => {
            const repo = form.getFieldValue(["package", index, "repo"])
            if (repo && !value) {
              return Promise.reject()
            }
            return Promise.resolve()
          },
        }),
      ]}
    >
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
        style={{ width: 120 }}
        placeholder="版本"
      />
    </Form.Item>
  )
}

function RepoVersionField({
  label,
  index,
  repoOptions,
  isOnline,
  required,
}: {
  label: string
  index: number
  repoOptions?: { label: string; value: string }[]
  isOnline?: boolean
  required?: boolean
}) {
  const form = useFormInstance()

  return (
    <Form.Item label={label} name={["package", index]} required={required}>
      <Space.Compact>
        <Form.Item
          name={["package", index, "repo"]}
          noStyle
          dependencies={["taskType"]}
          rules={[{ required, message: "请选择仓库" }]}
        >
          <Select
            options={repoOptions}
            style={{ width: 250 }}
            allowClear
            showSearch
            filterOption={(input: string, option?: { label: string }) => {
              return (
                option?.label
                  .toLocaleLowerCase()
                  .includes(input.trim().toLocaleLowerCase()) ?? false
              )
            }}
            placeholder="仓库"
            onChange={() => {
              form.setFieldValue(["package", index, "version"], undefined)
            }}
          />
        </Form.Item>
        <VersionField index={index} isOnline={isOnline} required={required} />
      </Space.Compact>
    </Form.Item>
  )
}

export function PackageField({ isOnline }: { isOnline?: boolean }) {
  const taskType = useWatch("taskType")

  const { data: repoOptions } = useQuery({
    queryKey: ["deploy-form-repo-options", isOnline],
    queryFn: () =>
      isOnline
        ? packagesOnlineRepoApiDepPackagesRepoonline().then(
            (res) => res.data?.data ?? [],
          )
        : packagesAllRepoApiDepPackagesRepo().then(
            (res) => res.data?.data ?? [],
          ),
  })

  return (
    <div>
      <Form.Item label="依赖包" required />

      <div className="-translate-y-2 rounded-md border border-solid border-gray-200 p-2">
        {["frontend", "backend", "broker", "commsver"].map((name, index) => (
          <RepoVersionField
            key={name}
            label={name}
            index={index}
            repoOptions={repoOptions
              ?.find((item) => item.name === name)
              ?.repos?.map((repo) => ({ label: repo, value: repo }))}
            isOnline={isOnline}
            required={
              taskType === "部署" || name === "frontend" || name === "backend"
                ? true
                : undefined
            }
          />
        ))}
      </div>
    </div>
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
  const [showOnlineDeployConfirmModal, setShowOnlineDeployConfirmModal] =
    useState(false)
  const [formData, setFormData] = useState<DEP.TaskCreateReq | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!open) {
      setFormData(undefined)
    }
  }, [open])

  return (
    <>
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

          const normalizedData = {
            ...formData,
            envId: env.EnvId,
            package: formData.package?.filter(
              (item) => item.repo && item.version,
            ),
          }

          if (env.State === "ONLINE") {
            setFormData(normalizedData)
            setShowOnlineDeployConfirmModal(true)
            return false
          }

          await taskCreateApiDepTasks(normalizedData)
          message.success("创建部署任务成功")
          onCancel()
          onFinish?.()
          return true
        }}
        initialValues={
          {
            product: "Orch",
            type: "Orch",
            toolsType: "release",
            taskType: "升级",
          } satisfies Partial<DEP.TaskCreateReq>
        }
      >
        <ProFormRadio.Group
          label="产品"
          name="product"
          options={["Orch"]}
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          label="类型"
          name="type"
          options={[
            { label: "Orch", value: "Orch" },
            { label: "商密", value: "merSecret" },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          label="代码类型"
          name="toolsType"
          options={
            env?.State === "ONLINE" ? ["release"] : ["release", "develop"]
          }
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          label="任务类型"
          name="taskType"
          options={env?.State === "ONLINE" ? ["升级"] : ["升级", "部署"]}
          rules={[{ required: true }]}
        />
        <Form.Item<FieldType>
          noStyle
          shouldUpdate={(prev, current) => prev.taskType !== current.taskType}
        >
          {({ getFieldValue, setFieldValue }) => {
            const taskType = getFieldValue("taskType")

            let options: string[] = []

            switch (taskType) {
              case "升级": {
                const job =
                  env?.EnvType === "all"
                    ? "orch-upgrade-ansible"
                    : "orch-upgrade"
                setFieldValue("job", job)
                options = [job]
                break
              }
              case "部署": {
                setFieldValue("job", "orch-install")
                options = ["orch-install"]
                break
              }
            }

            return (
              <ProFormRadio.Group
                label="jenkins"
                name="job"
                options={options}
                rules={[{ required: true }]}
              />
            )
          }}
        </Form.Item>
        <PackageField isOnline={env?.State === "ONLINE"} />
      </ModalForm>
      <OnlineDeployConfirmModal
        open={showOnlineDeployConfirmModal}
        onCancel={() => setShowOnlineDeployConfirmModal(false)}
        env={env}
        onFinish={async () => {
          await taskCreateApiDepTasks(formData!)
          message.success("创建部署任务成功")
          onCancel()
          onFinish?.()
        }}
      />
    </>
  )
}
