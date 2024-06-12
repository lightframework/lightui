import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { packagesVersionApiDepPackagesByRepoversion } from "@/services/dep/packages"
import {
  taskCreateApiDepTasks,
  taskCreateCrypApiDepTasksCryp,
} from "@/services/dep/task"
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormRadio,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Form, Select, message } from "antd"
import { useEffect, useState } from "react"
import CmRepoSelect from "./cm-repo-select"
import { SmPackageField } from "./deploy-modal-form"
import OnlineDeployConfirmModal from "./online-deploy-confirm-modal"

interface FormValues extends DEP.TaskCreateReq {
  versions?: string[]
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
        onFinishFailed={console.log}
        labelCol={{ span: 4 }}
        onFinish={async (formData) => {
          if (!env) return false

          const packages = [
            {
              repo: "frontend-vue-release-local",
              module: [
                {
                  moduleName: "frontend",
                  version: formData.versions?.at(0),
                },
              ],
            },
            {
              repo: "backend-maven-release-local",
              module: [
                {
                  moduleName: "backend",
                  version: formData.versions?.at(1),
                },
              ],
            },
            {
              repo: "broker-go-release-local",
              module: [
                {
                  moduleName: "broker",
                  version: formData.versions?.at(2),
                },
              ],
            },
            {
              repo: "commsver-generic-release-local",
              module: [
                {
                  moduleName: "commsver",
                  version: formData.versions?.at(3),
                },
              ],
            },
          ].filter(
            (item) =>
              item.module.at(0)?.moduleName && item.module.at(0)?.version,
          ) as DEP.TaskCreateReq["package"]

          const normalizedData = {
            ...formData,
            envId: env.EnvId,
            package: formData.type === "SM" ? formData.package : packages,
          }

          if (normalizedData.type === "SM") {
            const smData = normalizedData as DEP.TaskCreateCrypReq

            if (!env.CustomerId) {
              message.error("环境未设置CustomerId，无法部署")
              return false
            }
            if (
              smData.installMonitor &&
              (!env.MonitorWriteUrl ||
                !env.MonitorBasicAuthUser ||
                !env.MonitorBasicAuthPass)
            ) {
              message.error(
                "当选择安装监控时，环境需配置MonitorWriteUrl、MonitorBasicAuthUser和MonitorBasicAuthPass",
              )
              return false
            }
            if (
              smData.setDomain &&
              (!env.CmnDomainUrl || !env.CsdpDomainUrl || !env.OsmDomainUrl)
            ) {
              message.error(
                "当选择设置域名时，环境需配置CmnDomainUrl、CsdpDomainUrl和OsmDomainUrl",
              )
              return false
            }
            if (smData.cmnSetKeepalived && !env.CmnVip) {
              message.error("当选择cmnSetKeepalived时，环境需配置CmnVip")
              return false
            }
            if (smData.csdpSetKeepalived && !env.CsdpVip) {
              message.error("当选择csdpSetKeepalived时，环境需配置CsdpVip")
              return false
            }
            if (smData.osmSetKeepalived && !env.OsmVip) {
              message.error("当选择osmSetKeepalived时，环境需配置OsmVip")
              return false
            }
          }

          if (env.State === "ONLINE") {
            setFormData(normalizedData)
            setShowOnlineDeployConfirmModal(true)
            return false
          }

          if (normalizedData.type === "SM") {
            await taskCreateCrypApiDepTasksCryp(normalizedData)
          } else {
            await taskCreateApiDepTasks(normalizedData)
          }
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
            taskType: "upgrade",
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
            { label: "商密", value: "SM" },
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
          options={[
            { label: "升级", value: "upgrade" },
            { label: "部署", value: "deploy" },
          ]}
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
              case "upgrade": {
                let job = ""

                if (type === "SM") {
                  job = "smupgrade-deploy-pipeline"
                } else {
                  job = "orchupgrade-deploy-pipeline"
                }

                setFieldValue("job", job)
                options = [job]
                break
              }
              case "deploy": {
                let job = ""

                if (type === "SM") {
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
        <ProFormDependency name={["type"]}>
          {({ type }) =>
            type === "SM" ? (
              <>
                <Form.Item label="商密参数">
                  <div className="grid grid-cols-2">
                    <ProFormCheckbox
                      label="安装监控"
                      name="installMonitor"
                      initialValue={false}
                      labelCol={{ span: 16 }}
                    />
                    <ProFormCheckbox
                      label="设置域名"
                      name="setDomain"
                      initialValue={false}
                      labelCol={{ span: 16 }}
                    />
                    <ProFormCheckbox
                      label="cmnSetKeepalived"
                      name="cmnSetKeepalived"
                      initialValue={false}
                      labelCol={{ span: 16 }}
                    />
                    <ProFormCheckbox
                      label="csdpSetKeepalived"
                      name="csdpSetKeepalived"
                      initialValue={false}
                      labelCol={{ span: 16 }}
                    />
                    <ProFormCheckbox
                      label="osmSetKeepalived"
                      name="osmSetKeepalived"
                      initialValue={false}
                      labelCol={{ span: 16 }}
                    />
                  </div>
                </Form.Item>
                <CmRepoSelect isOnline={env?.State === "ONLINE"} />
                <SmPackageField />
              </>
            ) : (
              <div>
                <Form.Item label="依赖包" required />
                <div className="-translate-y-2 rounded-md border border-solid border-gray-200 p-2">
                  <Form.Item<FieldType>
                    noStyle
                    shouldUpdate={(prev, curr) =>
                      prev.taskType !== curr.taskType
                    }
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
            )
          }
        </ProFormDependency>
      </ModalForm>
      <OnlineDeployConfirmModal
        open={showOnlineDeployConfirmModal}
        onCancel={() => setShowOnlineDeployConfirmModal(false)}
        env={env}
        onFinish={async () => {
          if (formData?.type === "SM") {
            await taskCreateCrypApiDepTasksCryp(formData)
          } else {
            await taskCreateApiDepTasks(formData!)
          }
          message.success("创建部署任务成功")
          onCancel()
          onFinish?.()
        }}
      />
    </>
  )
}
