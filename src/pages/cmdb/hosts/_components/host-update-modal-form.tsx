import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { IPV4_REGEX } from "@/constants/regex"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryEnvOptions,
  useQueryProjectOptions,
} from "@/lib/hooks/data"
import { hostUpdateApiCmdbHostsByUid } from "@/services/cmdb/host"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

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
      PrivateIpAddresses?: string[]
      PublicIpAddresses?: string[]
      AppUids?: string[]
    }>
      title="更新主机信息"
      name="host-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        HostName: host?.HostName,
        EnvUid: host?.Env.Uid,
        ProjectUids: host?.ProjectSet?.map((project) => project.Uid),
        LoginUser: host?.LoginUser,
        State: host?.State,
        LoginPort: host?.LoginPort,
        Description: host?.Description,
        OpsUids: host?.OpsSet?.map((ops) => ops.Uid),
        SupportUids: host?.SupportSet?.map((support) => support.Uid),
        AppUids: host?.AppSet?.map((app) => app.Uid),
        PublicIpAddresses: host?.Instance?.PublicIpAddresses,
        PrivateIpAddresses: host?.Instance?.PrivateIpAddresses,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!host) return false

        await hostUpdateApiCmdbHostsByUid(
          { uid: (host as any).Uid },
          {
            Host: {
              Number: host.Number,
              AppUids: formData.AppUids,
              Description: formData.Description,
              EnvUid: formData.EnvUid,
              HostName: formData.HostName,
              HostTypeUid: host.HostType.Uid,
              Instance: {
                CloudTagUids: host.Instance.CloudTagOptionSet?.map(
                  (tag) => tag.Uid,
                ),
                DataDisks: host.Instance.DataDisks,
                SystemDisk: host.Instance.SystemDisk,
                Cpu: host.Instance.Cpu,
                CreatedTime: host.Instance.CreatedTime,
                DefaultLoginPort: host.Instance.DefaultLoginPort,
                DefaultLoginUser: host.Instance.DefaultLoginUser,
                Password: host.Instance.Password,
                ExpiredTime: host.Instance.ExpiredTime,
                ImageUid: host.Instance.Image.Uid,
                InstanceChargeType: host.Instance.InstanceChargeType,
                InstanceId: host.Instance.InstanceId,
                InstanceName: host.Instance.InstanceName,
                InstanceState: host.Instance.InstanceState,
                InstanceType: host.Instance.InstanceType,
                Memory: host.Instance.Memory,
                OsName: host.Instance.OsName,
                PrivateIpAddresses: formData.PrivateIpAddresses,
                PublicIpAddresses: formData.PublicIpAddresses,
                RenewFlag: host.Instance.RenewFlag,
                RestrictState: host.Instance.RestrictState,
                SecurityGroupUids: host.Instance.SecurityGroupSet?.map(
                  (item) => item.Uid,
                ),
                SubnetUids: host.Instance.SubnetWithVpcSet?.map(
                  (item) => item.Uid,
                ),
                Uuid: host.Instance.Uuid,
                ZoneUid: host.Instance.Zone.Uid,
              },
              LoginPassword: host.LoginPassword,
              LoginPort: formData.LoginPort,
              LoginUser: formData.LoginUser,
              OpsUids: formData.OpsUids,
              ProjectUids: formData.ProjectUids,
              State: formData.State,
              SupportUids: formData.SupportUids,
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
        label="公网IP"
        name="PublicIpAddresses"
        mode="tags"
        placeholder="回车键输入IP列表"
        rules={[
          { required: true, message: "请输入公网IP" },
          {
            validateTrigger: ["onBlur", "onChange"],
            validator: (_, value) => {
              if (Array.isArray(value)) {
                for (const ip of value) {
                  if (!IPV4_REGEX.test(ip)) {
                    return Promise.reject(`${ip}不是有效的IP地址`)
                  }
                }
              }
              return Promise.resolve()
            },
          },
        ]}
      />
      <ProFormSelect
        label="私网IP"
        name="PrivateIpAddresses"
        mode="tags"
        placeholder="回车键输入IP列表"
        rules={[
          {
            validateTrigger: ["onBlur", "onChange"],
            validator: (_, value) => {
              if (Array.isArray(value)) {
                for (const ip of value) {
                  if (!IPV4_REGEX.test(ip)) {
                    return Promise.reject(`${ip}不是有效的IP地址`)
                  }
                }
              }
              return Promise.resolve()
            },
          },
        ]}
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
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
