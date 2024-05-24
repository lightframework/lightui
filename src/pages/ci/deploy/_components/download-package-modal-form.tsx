import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { packagesVersionApiDepPackagesByRepoversion } from "@/services/dep/packages"
import { taskCreateApiDepTasks } from "@/services/dep/task"
import { ModalForm, ProFormRadio } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Form, Select, message } from "antd"
import { useEffect, useState } from "react"
import OnlineDeployConfirmModal from "./online-deploy-confirm-modal"

interface FormValues extends DEP.TaskCreateReq {
  versions: string[]
}

type FieldType = Partial<FormValues>

function VersionField({
  repo,
  index,
  required,
}: {
  repo: string
  index: number
  required?: boolean
}) {
  const { data: versionOptions, isFetching: isFetchingVersionOptions } =
    useQuery({
      queryKey: ["download-package-form-repo-version-options", repo],
      queryFn: () =>
        packagesVersionApiDepPackagesByRepoversion({ repo }).then(
          (res) => res.data?.versions ?? [],
        ),
    })

  return (
    <Form.Item
      name={["versions", index]}
      label={repo}
      labelCol={{ span: 12 }}
      dependencies={["taskType"]}
      rules={[{ required, message: "请选择版本" }]}
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
        placeholder="版本"
      />
    </Form.Item>
  )
}

export default function DownloadPackageModalForm({
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
      <ModalForm<FormValues>
        title="下载离线包"
        name="ci-download-package"
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

          const packages = [
            {
              repo: "frontend-vue-release-local",
              version: formData.versions[0],
            },
            {
              repo: "backend-maven-release-local",
              version: formData.versions[1],
            },
            {
              repo: "broker-go-release-local",
              version: formData.versions[2],
            },
            {
              repo: "commsver-generic-release-local",
              version: formData.versions[3],
            },
          ].filter((item) => item.repo && item.version)

          const normalizedData = {
            ...formData,
            envId: env.EnvId,
            package: packages,
          }

          if (env.State === "ONLINE") {
            setFormData(normalizedData)
            setShowOnlineDeployConfirmModal(true)
            return false
          }

          await taskCreateApiDepTasks(normalizedData)
          message.success("创建下载离线包任务成功")
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
          } satisfies FieldType
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
          options={["release"]}
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          label="任务类型"
          name="taskType"
          options={["升级", "部署"]}
          rules={[{ required: true }]}
        />
        <Form.Item<FieldType>
          noStyle
          shouldUpdate={(prev, current) =>
            prev.taskType !== current.taskType || prev.type !== current.type
          }
        >
          {({ getFieldValue, setFieldValue }) => {
            const taskType = getFieldValue("taskType")
            const type = getFieldValue("type")

            let options: string[] = []

            switch (taskType) {
              case "升级": {
                let job = ""

                if (type === "merSecret") {
                  job = "smupgrade-deploy-pipeline"
                } else {
                  job = "orchupgrade-deploy-pipeline"
                }

                setFieldValue("job", job)
                options = [job]
                break
              }
              case "部署": {
                let job = ""

                if (type === "merSecret") {
                  job = "sminstall-deploy-pipeline"
                } else {
                  job = "orchinstall-deploy-pipeline"
                }

                setFieldValue("job", job)
                options = [job]
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
        <div>
          <Form.Item label="依赖包" required />
          <div className="-translate-y-2 rounded-md border border-solid border-gray-200 p-2">
            <Form.Item<FieldType>
              noStyle
              shouldUpdate={(prev, curr) => prev.taskType !== curr.taskType}
            >
              {({ getFieldValue }) => {
                const taskType = getFieldValue("taskType")

                return [
                  {
                    repo: "frontend-vue-release-local",
                    required: true,
                  },
                  {
                    repo: "backend-maven-release-local",
                    required: true,
                  },
                  {
                    repo: "broker-go-release-local",
                    required: taskType === "部署",
                  },
                  {
                    repo: "commsver-generic-release-local",
                    required: taskType === "部署",
                  },
                ].map((repo, index) => (
                  <VersionField
                    key={repo.repo}
                    repo={repo.repo}
                    index={index}
                    required={repo.required}
                  />
                ))
              }}
            </Form.Item>
          </div>
        </div>
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
