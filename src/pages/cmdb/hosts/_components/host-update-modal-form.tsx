import { REGEX_HOST_PASSWORD } from "@/constants/regex"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryEnvOptions,
  useQueryHostTypeOptions,
  useQueryHostUpdateSecretOptions,
  useQueryInstanceOptions,
  useQueryProjectOptions,
} from "@/lib/hooks/data"
import { copyTextToClipboard, generatePassword } from "@/lib/utils"
import FieldSet from "@/pages/argus/tactics/-components/fieldset"
import { hostUpdateApiCmdbHostsByUid } from "@/services/cmdb/host"
import { CopyOutlined } from "@ant-design/icons"
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Alert, Button, Drawer, Form, Radio, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { NamePath } from "antd/es/form/interface"
import dayjs, { Dayjs } from "dayjs"
import { useId } from "react"

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

function PasswordInput({ name, label }: { name: NamePath; label: string }) {
  const form = useFormInstance()

  const hostTypeOptionsQuery = useQueryHostTypeOptions()

  const hostTypeUid: string | undefined = useWatch("HostTypeUid")

  const hostType = hostTypeOptionsQuery.data?.find(
    (item) => item.Uid === hostTypeUid,
  )

  return (
    <div className="flex items-center justify-between">
      <ProFormText.Password
        className="shrink-0"
        label={label}
        name={name}
        labelCol={{ span: 24 }}
        fieldProps={{ style: { width: 280 } }}
        placeholder=""
        rules={[REGEX_HOST_PASSWORD]}
      />
      <div className="translate-y-[3px]">
        <Button
          type="text"
          icon={<CopyOutlined />}
          onClick={async () => {
            await copyTextToClipboard(form.getFieldValue(name))
            message.success("复制成功")
          }}
        />
        <Radio.Group defaultValue="generate" buttonStyle="solid">
          <Radio.Button
            value="generate"
            onClick={() => {
              form.setFieldValue(name, generatePassword())
              form.validateFields([name])
            }}
          >
            随机生成
          </Radio.Button>
          <Radio.Button
            value="default"
            disabled={!hostType?.DefaultLoginPassword}
            onClick={() => {
              form.setFieldValue(name, hostType?.DefaultLoginPassword)
              form.validateFields([name])
            }}
          >
            使用默认
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
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
  const formId = useId()
  const envOptionsQuery = useQueryEnvOptions()
  const projectOptionsQuery = useQueryProjectOptions()
  const opsPersons = usePersonOptions("运维")
  const supportPersons = usePersonOptions("技术支持")
  const appOptionsQuery = useQueryAppOptions()
  const instanceOptionsQuery = useQueryInstanceOptions()
  const secretOptionsQuery = useQueryHostUpdateSecretOptions()

  return (
    <Drawer
      open={open}
      title="更新主机"
      onClose={onCancel}
      width={500}
      destroyOnClose
      classNames={{ body: "!pt-0" }}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit" form={formId}>
            确定
          </Button>
        </div>
      }
    >
      <Form<{
        HostName: string
        EnvUid: string
        ProjectUids?: string[]
        LoginPort?: number
        LoginUser?: string
        LoginPassword?: string
        LoginKey?: string
        CommonLoginKey?: string
        CommonLoginPassword?: string
        CommonLoginUser?: string
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
        id={formId}
        name="host-update"
        layout="vertical"
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
          LoginPassword: host?.LoginPassword,
          LoginKey: host?.LoginKey,
          CommonLoginKey: host?.CommonLoginKey,
          CommonLoginPassword: host?.CommonLoginPassword,
          CommonLoginUser: host?.CommonLoginUser,
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
        labelCol={{ span: 5 }}
        scrollToFirstError
        onFinish={async (formData) => {
          if (!host) return false

          if (!formData.LoginPassword && !formData.LoginKey) {
            message.error("必须填写管理员密码或者管理员密钥之一")
            return false
          }

          await hostUpdateApiCmdbHostsByUid(
            { uid: host.Uid },
            {
              Host: {
                ...formData,
                ExpirationTime: formData.ExpirationTime
                  ? dayjs(formData.ExpirationTime).unix()
                  : undefined,
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
        <FieldSet title="基本信息" index={1}>
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
          <ProFormTextArea
            label="备注"
            labelCol={{ span: 4 }}
            name="Description"
            placeholder=""
          />
        </FieldSet>
        <FieldSet title="管理信息" index={2}>
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
          <ProFormDatePicker
            label="到期时间"
            name="ExpirationTime"
            placeholder=""
          />
        </FieldSet>
        <FieldSet title="JumpServer" index={3}>
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
        </FieldSet>
        <FieldSet title="用户访问" index={4}>
          <ProFormDigit label="登录端口" name="LoginPort" placeholder="" />
          <ProFormText
            label="管理员"
            name="LoginUser"
            placeholder=""
            rules={[{ required: true, message: "请输入管理员" }]}
          />
          <Alert
            closable
            type="info"
            message="密码和密钥任选其一，管理员必填"
            className="mb-3"
          />
          <PasswordInput name="LoginPassword" label="管理员密码" />
          <ProFormSelect
            name="LoginKey"
            label="管理员密钥"
            placeholder=""
            options={secretOptionsQuery.data?.map((item) => ({
              value: item,
              label: item,
            }))}
          />
          <ProFormText label="普通用户" name="CommonLoginUser" placeholder="" />
          <PasswordInput name="CommonLoginPassword" label="普通用户密码" />
          <ProFormSelect
            name="CommonLoginKey"
            label="普通用户密钥"
            placeholder=""
            options={secretOptionsQuery.data?.map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </FieldSet>
      </Form>
    </Drawer>
  )
}
