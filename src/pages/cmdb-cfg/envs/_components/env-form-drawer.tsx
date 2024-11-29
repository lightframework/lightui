import { useQueryUserOptions } from "@/lib/hooks/data"
import FieldSet from "@/pages/argus/tactics/-components/fieldset"
import {
  EnvCreateApiCmdbEnvs,
  envUpdateApiCmdbEnvsByUid,
} from "@/services/cmdb/env"
import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Button, Drawer, Form, Switch, message } from "antd"
import { useEffect, useId, useState } from "react"

type FormValues = CMDB.EnvCreateReq

export interface EnvFormDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
  env?: CMDB.EnvInfo
}

export default function EnvFormDrawer({
  open,
  onClose,
  onFinish,
  env,
}: EnvFormDrawerProps) {
  const formId = useId()

  const { data: userOptions } = useQueryUserOptions()

  const [isOrch, setIsOrch] = useState(false)

  useEffect(() => {
    if (env?.State) {
      setIsOrch(true)
    }
  }, [env])

  return (
    <Drawer
      open={open}
      title={env ? "编辑环境" : "添加环境"}
      onClose={onClose}
      destroyOnClose
      width={500}
      maskClosable={false}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" htmlType="submit" form={formId}>
            确定
          </Button>
        </div>
      }
    >
      <Form<FormValues>
        id={formId}
        layout="vertical"
        initialValues={
          (env
            ? {
                ...env,
                OpsIds: env?.Ops?.map((person) => person.Id),
                QaIds: env?.Qa?.map((person) => person.Id),
                SaleIds: env?.Sale?.map((person) => person.Id),
                SupportIds: env?.Support?.map((person) => person.Id),
              }
            : {
                State: "ONLINE",
              }) satisfies Partial<FormValues>
        }
        onFinish={async (values) => {
          if (env) {
            await envUpdateApiCmdbEnvsByUid({ uid: env.Uid }, values)
            message.success("编辑成功")
          } else {
            await EnvCreateApiCmdbEnvs(values)
            message.success("新建成功")
          }
          onClose()
          onFinish?.()
        }}
      >
        <FieldSet title="基本信息" index={1}>
          <ProFormText
            label="环境ID"
            name="EnvId"
            placeholder=""
            rules={[{ required: true, message: "请输入环境ID" }]}
          />
          <ProFormText
            label="环境名称"
            name="EnvName"
            placeholder=""
            rules={[{ required: true, message: "请输入环境名称" }]}
          />
          <ProFormText
            label="环境Key"
            name="EnvKey"
            placeholder=""
            rules={[{ required: true, message: "请输入环境Key" }]}
          />
          <ProFormSelect
            label="Jumpserver注册"
            name="JumpAddress"
            options={["jumpserver", "jumpserver-ope"]}
            placeholder=""
          />
          <ProFormTextArea label="备注" name="Description" placeholder="" />
        </FieldSet>

        <Form.Item label="Orch" className="mt-4">
          <Switch checked={isOrch} onChange={setIsOrch} />
        </Form.Item>

        {isOrch && (
          <>
            <FieldSet title="访问与认证" index={2}>
              <ProFormRadio.Group
                label="状态"
                name="State"
                options={[
                  {
                    label: "线上",
                    value: "ONLINE",
                  },
                  {
                    label: "测试",
                    value: "TEST",
                  },
                  {
                    label: "灰度",
                    value: "GRAY",
                  },
                ]}
                rules={[{ required: true, message: "请选择状态" }]}
              />
              <ProFormText label="官网链接" name="DomainName" placeholder="" />
              <ProFormText
                label="API链接"
                name="ApiDomainName"
                placeholder=""
              />
              <ProFormText label="SecretId" name="SecretId" placeholder="" />
              <ProFormText label="SecretKey" name="SecretKey" placeholder="" />
            </FieldSet>

            <FieldSet title="管理信息" index={3}>
              <ProFormSelect
                label="运维"
                name="OpsIds"
                showSearch
                mode="multiple"
                placeholder=""
                options={userOptions?.map((person) => ({
                  label: `${person.nickname} @ ${person.username}`,
                  value: person.id,
                }))}
              />
              <ProFormSelect
                label="QA"
                name="QaIds"
                showSearch
                mode="multiple"
                placeholder=""
                options={userOptions?.map((person) => ({
                  label: `${person.nickname} @ ${person.username}`,
                  value: person.id,
                }))}
              />
              <ProFormSelect
                label="销售"
                name="SaleIds"
                showSearch
                mode="multiple"
                placeholder=""
                options={userOptions?.map((person) => ({
                  label: `${person.nickname} @ ${person.username}`,
                  value: person.id,
                }))}
              />
              <ProFormSelect
                label="技术支持"
                name="SupportIds"
                showSearch
                mode="multiple"
                placeholder=""
                options={userOptions?.map((person) => ({
                  label: `${person.nickname} @ ${person.username}`,
                  value: person.id,
                }))}
              />
            </FieldSet>

            <FieldSet title="CI/CD相关" index={4}>
              <ProFormSelect
                label="Orch操作系统"
                name="OsType"
                options={["centos", "euler", "ubuntu"]}
                placeholder=""
                rules={[{ required: true, message: "请选择Orch操作系统" }]}
              />
              <ProFormSelect
                label="Orch部署架构"
                name="EnvType"
                options={["split", "all"]}
                placeholder=""
                rules={[{ required: true, message: "请选择Orch部署架构" }]}
              />
              <ProFormSelect
                label="CPU类型"
                name="CpuType"
                options={[
                  { value: "x86", label: "x86" },
                  { value: "arm", label: "arm" },
                ]}
                placeholder=""
                rules={[{ required: true, message: "请选择Orch语言" }]}
              />
              <ProFormSelect
                label="Orch语言"
                name="EnvLanguage"
                options={[
                  { value: "cn", label: "中文" },
                  { value: "us", label: "英文" },
                ]}
                placeholder=""
                rules={[{ required: true, message: "请选择Orch语言" }]}
              />
              <ProFormSelect
                label="升级通知群Webhook"
                mode="tags"
                name="NoticeGroups"
                placeholder="会车分隔"
              />
              <ProFormText
                name="CustomerId"
                label="CustomerId"
                placeholder=""
              />
              <ProFormText
                name="MonitorWriteUrl"
                label="MonitorWriteUrl"
                placeholder=""
              />
              <ProFormText
                name="MonitorBasicAuthUser"
                label="MonitorBasicAuthUser"
                placeholder=""
              />
              <ProFormText.Password
                name="MonitorBasicAuthPass"
                label="MonitorBasicAuthPass"
                placeholder=""
              />
              <ProFormText
                name="CmnDomainUrl"
                label="CmnDomainUrl"
                placeholder=""
              />
              <ProFormText name="CmnVip" label="CmnVip" placeholder="" />
              <ProFormText
                name="CsdpDomainUrl"
                label="CsdpDomainUrl"
                placeholder=""
              />
              <ProFormText name="CsdpVip" label="CsdpVip" placeholder="" />
              <ProFormText
                name="OsmDomainUrl"
                label="OsmDomainUrl"
                placeholder=""
              />
              <ProFormText name="OsmVip" label="OsmVip" placeholder="" />
            </FieldSet>
          </>
        )}
      </Form>
    </Drawer>
  )
}
