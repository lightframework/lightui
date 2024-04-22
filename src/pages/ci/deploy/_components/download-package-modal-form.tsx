import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { packagesVersionApiDepPackagesByRepoversion } from "@/services/dep/packages"
import { taskCreateApiDepTasks } from "@/services/dep/task"
import { ModalForm, ProFormRadio } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Form, Select, message } from "antd"
import { useEffect, useState } from "react"
import OnlineDeployConfirmModal from "./online-deploy-confirm-modal"

interface FormValues extends Pick<DEP.TaskCreateReq, "job" | "taskType"> {
  versions: string[]
}

type FieldType = Partial<FormValues>

function VersionField({ repo, index }: { repo: string; index: number }) {
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
      rules={[{ required: true, message: "请选择版本" }]}
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

          const normalizedData = {
            ...formData,
            envId: env.EnvId,
            product: "Orch",
            type: "Orch",
            toolsType: "release",
            package: [
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
            ],
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
            taskType: "升级",
          } satisfies FieldType
        }
      >
        <ProFormRadio.Group
          label="任务类型"
          name="taskType"
          options={["升级", "部署"]}
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
                setFieldValue("job", "orchupgrade-deploy-pipeline")
                options = ["orchupgrade-deploy-pipeline"]
                break
              }
              case "部署": {
                setFieldValue("job", "orchinstall-deploy-pipeline")
                options = ["orchinstall-deploy-pipeline"]
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
            {[
              "frontend-vue-release-local",
              "backend-maven-release-local",
              "broker-go-release-local",
              "commsver-generic-release-local",
            ].map((repo, index) => (
              <VersionField key={repo} repo={repo} index={index} />
            ))}
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
