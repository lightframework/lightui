import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryEnvOptions,
  useQueryHostTypeOptions,
  useQueryInstanceOptions,
  useQueryProjectOptions,
} from "@/lib/hooks/data"
import { hostUpdateApiCmdbHostsByUid } from "@/services/cmdb/host"
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import dayjs, { Dayjs } from "dayjs"

function HostTypeSelect() {
  const hostTypeOptionsQuery = useQueryHostTypeOptions()
  const form = useFormInstance()

  return (
    <ProFormSelect
      label="主机类型"
      name="HostTypeUid"
      showSearch
      fieldProps={{
        loading: hostTypeOptionsQuery.isFetching,
      }}
      options={hostTypeOptionsQuery.data?.map((item) => ({
        label: item.HostType,
        value: item.Uid,
      }))}
      placeholder=""
      rules={[
        {
          required: true,
          message: "请选择主机类型",
        },
      ]}
      onChange={() => form.setFieldValue("Business", undefined)}
    />
  )
}

function BusinessSelect() {
  const hostTypeOptionsQuery = useQueryHostTypeOptions()

  const hostTypeUid: string | undefined = useWatch("HostTypeUid")

  const hostType = hostTypeOptionsQuery.data?.find(
    (item) => item.Uid === hostTypeUid,
  )

  const businesses = hostType?.Businesses ?? []

  return businesses.length > 0 ? (
    <ProFormSelect
      label="业务类型"
      name="Business"
      placeholder=""
      options={businesses}
      rules={[{ required: true, message: "请选择业务类型" }]}
    />
  ) : null
}

export default function HostUpdateModalForm({
  open,
  onCancel,
  host,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  host?: CMDB.HostInfo
  onFinish?: VoidFunction
}) {
  const envOptionsQuery = useQueryEnvOptions()
  const projectOptionsQuery = useQueryProjectOptions()
  const opsPersons = usePersonOptions("运维")
  const supportPersons = usePersonOptions("技术支持")
  const appOptionsQuery = useQueryAppOptions()
  const instanceOptionsQuery = useQueryInstanceOptions()

  return (
    <ModalForm<{
      HostName: string
      EnvUid: string
      ProjectUids?: string[]
      LoginUser?: string
      LoginPort?: number
      Description?: string
      OpsUids?: string[]
      SupportUids?: string[]
      State?: string
      AppUids?: string[]
      HostTypeUid: string
      Business?: string
      JumpId?: string
      JumpPath?: string
      InstanceUid: string
      ExpirationTime?: Dayjs
    }>
      title="更新主机信息"
      name="host-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        HostTypeUid: host?.HostType?.Uid,
        Business: host?.Business,
        ExpirationTime: host?.ExpirationTime
          ? dayjs.unix(host.ExpirationTime)
          : undefined,
        HostName: host?.HostName,
        EnvUid: host?.Env?.Uid,
        ProjectUids: host?.ProjectSet?.map((project) => project.Uid),
        LoginUser: host?.LoginUser,
        State: host?.State,
        LoginPort: host?.LoginPort,
        Description: host?.Description,
        OpsUids: host?.OpsSet?.map((ops) => ops.Uid),
        SupportUids: host?.SupportSet?.map((support) => support.Uid),
        AppUids: host?.AppSet?.map((app) => app.Uid),
        JumpId: host?.JumpId,
        JumpPath: host?.JumpPath,
        InstanceUid: host?.Instance?.Uid,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
        centered: true,
      }}
      labelCol={{ span: 4 }}
      onValuesChange={console.log}
      onFinish={async (formData) => {
        if (!host) return false

        await hostUpdateApiCmdbHostsByUid(
          { uid: host.Uid },
          {
            Host: {
              AppUids: formData.AppUids,
              Description: formData.Description,
              EnvUid: formData.EnvUid,
              HostName: formData.HostName,
              HostTypeUid: formData.HostTypeUid,
              Business: formData.Business,
              ExpirationTime: formData.ExpirationTime
                ? dayjs(formData.ExpirationTime).unix()
                : undefined,
              JumpId: formData.JumpId,
              JumpPath: formData.JumpPath,
              LoginPort: formData.LoginPort,
              LoginUser: formData.LoginUser,
              OpsUids: formData.OpsUids,
              ProjectUids: formData.ProjectUids,
              State: formData.State,
              SupportUids: formData.SupportUids,
              InstanceUid: formData.InstanceUid,
              LoginPassword: host.LoginPassword,
              Number: host.Number,
            },
          },
        )

        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="主机名"
        name="HostName"
        rules={[
          {
            required: true,
            message: "请输入主机名",
          },
        ]}
        placeholder=""
      />
      <ProFormSelect
        label="关联实例"
        name="InstanceUid"
        showSearch
        fieldProps={{
          loading: instanceOptionsQuery.isFetching,
        }}
        options={instanceOptionsQuery.data?.map((item) => ({
          label: item.InstanceName,
          value: item.Uid,
        }))}
        rules={[
          {
            required: true,
            message: "请选择关联实例",
          },
        ]}
      />
      <HostTypeSelect />
      <BusinessSelect />
      <ProFormSelect
        label="所属环境"
        name="EnvUid"
        showSearch
        fieldProps={{
          loading: envOptionsQuery.isPending,
        }}
        options={envOptionsQuery.data?.map((env) => ({
          label: env.EnvName,
          value: env.Uid,
        }))}
        rules={[
          {
            required: true,
            message: "请选择所属环境",
          },
        ]}
        placeholder=""
      />
      <ProFormSelect
        label="所属项目"
        name="ProjectUids"
        mode="multiple"
        showSearch
        fieldProps={{
          loading: projectOptionsQuery.isPending,
        }}
        options={projectOptionsQuery.data?.map((project) => ({
          label: project.ProjectName,
          value: project.Uid,
        }))}
        placeholder=""
      />
      <ProFormSelect
        label="状态"
        name="State"
        showSearch
        options={[
          {
            label: "待创建",
            value: "TO_BE_CREATE",
          },
          {
            label: "待完善",
            value: "TO_BE_COMPLEMENT",
          },
          {
            label: "待更新",
            value: "TO_BE_UPDATE",
          },
          {
            label: "PENDING",
            value: "PENDING",
          },
          {
            label: "待销毁",
            value: "TO_BE_DESTROYED",
          },
          {
            label: "已销毁",
            value: "DESTROYED",
          },
          {
            label: "RUNNING",
            value: "RUNNING",
          },
        ]}
        placeholder=""
        rules={[
          {
            required: true,
            message: "请选择状态",
          },
        ]}
      />
      <ProFormText label="登录用户" name="LoginUser" placeholder="" />
      <ProFormText
        label="登录端口"
        name="LoginPort"
        placeholder=""
        rules={[
          {
            pattern:
              /^(?:[1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: "请输入合法的端口号",
          },
        ]}
        transform={(value) => Number(value)}
      />

      <ProFormSelect
        label="运维"
        name="OpsUids"
        placeholder=""
        mode="multiple"
        showSearch
        options={opsPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
        rules={[
          {
            required: true,
            message: "请选择至少一名运维人员",
          },
        ]}
      />
      <ProFormSelect
        label="技术支持"
        name="SupportUids"
        placeholder=""
        mode="multiple"
        showSearch
        options={supportPersons.map((person) => ({
          label: person.PersonName,
          value: person.Uid,
        }))}
      />
      <ProFormSelect
        label="应用"
        name="AppUids"
        mode="multiple"
        placeholder=""
        showSearch
        fieldProps={{
          loading: appOptionsQuery.isPending,
        }}
        options={appOptionsQuery.data?.map((app) => ({
          label: `${app.App}${app.Version ? `:${app.Version}` : ""}`,
          value: app.Uid,
        }))}
      />
      <ProFormText label="JumpId" name="JumpId" placeholder="" />
      <ProFormText
        label="JumpPath"
        name="JumpPath"
        placeholder=""
        rules={[
          {
            pattern: /^\/[^]*[^/]$/,
            message: 'JumpPath以"/"开头，结尾不能为"/"',
          },
        ]}
      />
      <ProFormDatePicker label="到期时间" name="ExpiredTime" placeholder="" />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
