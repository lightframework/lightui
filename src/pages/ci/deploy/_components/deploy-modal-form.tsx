import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  packagesAllRepoApiDepPackagesRepo,
  packagesOnlineRepoApiDepPackagesRepoonline,
  packagesOnlineVersionApiDepPackagesVersiononline,
  packagesVersionApiDepPackagesByRepoversion,
} from "@/services/dep/packages"
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
import { Form, Input, Select, Space, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect, useState } from "react"
import CmRepoSelect from "./cm-repo-select"
import OnlineDeployConfirmModal from "./online-deploy-confirm-modal"

type FieldType = Partial<DEP.TaskCreateReq>

function VersionField({
  index,
  secondIndex = 0,
  moduleName,
  isOnline,
  required,
}: {
  index: number
  secondIndex?: number
  moduleName?: string
  isOnline?: boolean
  required?: boolean
}) {
  const form = useFormInstance()
  const repo: string | undefined = useWatch(["package", index, "repo"])

  const { data: versionOptions, isFetching: isFetchingVersionOptions } =
    useQuery({
      queryKey: [
        "deploy-form-repo-version-options",
        repo,
        moduleName,
        isOnline,
      ],
      queryFn: () =>
        isOnline
          ? packagesOnlineVersionApiDepPackagesVersiononline({
              repo: repo!,
              module: moduleName,
            }).then((res) => res.data?.versions ?? [])
          : packagesVersionApiDepPackagesByRepoversion({
              repo: repo!,
              module: moduleName,
            }).then((res) => res.data?.versions ?? []),
      enabled: !!repo,
    })

  useEffect(() => {
    if (!repo) {
      form.setFieldValue(
        ["package", index, "module", secondIndex, "version"],
        undefined,
      )
    }
  }, [repo, index])

  return (
    <Form.Item
      name={["package", index, "module", secondIndex, "version"]}
      noStyle
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
        style={{ width: 120 }}
        placeholder="版本"
      />
    </Form.Item>
  )
}

function ModuleVersionField({
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

  useEffect(() => {
    form.setFieldValue(["package", index, "module", 0, "moduleName"], label)
  }, [])

  return (
    <Form.Item label={label} required={required}>
      <Form.Item name={["package", index, "module", 0, "moduleName"]} hidden>
        <Input />
      </Form.Item>
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
              form.setFieldValue(
                ["package", index, "module", 0, "version"],
                undefined,
              )
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
          <ModuleVersionField
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

function SmModuleVersionField({
  module,
  index,
  isOnline,
}: {
  module: string
  index: number
  isOnline?: boolean
}) {
  const form = useFormInstance()

  useEffect(() => {
    form.setFieldValue(["package", 0, "module", index, "moduleName"], module)
  }, [])

  return (
    <Form.Item>
      <Space.Compact>
        <Form.Item name={["package", 0, "module", index, "moduleName"]} noStyle>
          <Select
            options={[{ value: module, label: module }]}
            style={{ width: 320 }}
            showSearch
            filterOption={(input: string, option?: { label: string }) => {
              return (
                option?.label
                  .toLocaleLowerCase()
                  .includes(input.trim().toLocaleLowerCase()) ?? false
              )
            }}
            placeholder="模块"
          />
        </Form.Item>
        <VersionField
          index={0}
          secondIndex={index}
          required
          isOnline={isOnline}
          moduleName={module}
        />
      </Space.Compact>
    </Form.Item>
  )
}

export function SmPackageField({ isOnline }: { isOnline?: boolean }) {
  return (
    <div>
      <Form.Item label="依赖包" required />
      <div className="-translate-y-2 rounded-md border border-solid border-gray-200 p-2">
        {["cmn", "cmn-frontend", "csdp", "csdp-frontend", "osm"].map(
          (module, index) => (
            <SmModuleVersionField
              key={module}
              index={index}
              module={module}
              isOnline={isOnline}
            />
          ),
        )}
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
              (item) =>
                !!item.module.at(0)?.moduleName && !!item.module.at(0)?.version,
            ),
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
            taskType: "connectTest",
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
            { label: "商密", value: "SM" },
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
          options={
            env?.State === "ONLINE"
              ? [
                  { label: "连通测试", value: "connectTest" },
                  { label: "升级", value: "upgrade" },
                ]
              : [
                  { label: "连通测试", value: "connectTest" },
                  { label: "升级", value: "upgrade" },
                  { label: "部署", value: "deploy" },
                ]
          }
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

            const pipeline = env?.Pipline || "orch"

            switch (taskType) {
              case "upgrade": {
                let job = ""

                if (type === "SM") {
                  job = env?.Pipline
                    ? `${env?.Pipline}-sm-upgrade`
                    : "sm-upgrade"
                } else {
                  job =
                    env?.EnvType === "all"
                      ? `${pipeline}-upgrade-ansible`
                      : `${pipeline}-upgrade`
                }

                setFieldValue("job", job)
                options = [job]
                break
              }
              case "deploy": {
                let job = ""

                if (type === "SM") {
                  job = "sm-install"
                } else {
                  job = "orch-install"
                }

                setFieldValue("job", job)
                options = [job]
                break
              }
              case "connectTest": {
                setFieldValue("job", "connectivity-test")
                options = ["connectivity-test"]
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
                <SmPackageField isOnline={env?.State === "ONLINE"} />
              </>
            ) : (
              <PackageField isOnline={env?.State === "ONLINE"} />
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
