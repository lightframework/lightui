import {
  AllAuAutoUpdateDict,
  AllAuGetWayDict,
  AllAuOverWallDict,
  AllAuSupportApiDict,
  AuResourceTypeDict,
} from "@/constants/dict"
import {
  auCreateApiOpsAu,
  auReadOneApiOpsAuById,
  auUpdateApiOpsAuById,
} from "@/services/ops/au"
import { domainsetOptionsApiOpsDomainsetsOptions } from "@/services/ops/domainset"
import { ipsetOptionsApiOpsIpsetsOptions } from "@/services/ops/ipset"
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Drawer, Form, message } from "antd"
import { useId } from "react"

type FormValues = OPS.AuCreateReq

export interface RelatedAccessUnitFormDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
  accessUnit?: OPS.AuList
}

export default function RelatedAccessUnitFormDrawer({
  open,
  onClose,
  onFinish,
  accessUnit,
}: RelatedAccessUnitFormDrawerProps) {
  const formId = useId()

  const { data, isFetching } = useQuery({
    queryKey: ["accessunit", accessUnit?.id],
    queryFn: () => auReadOneApiOpsAuById({ id: String(accessUnit?.id) }),
    enabled: !!accessUnit?.id,
    select: (data) => data.data?.data,
  })

  const { data: ipSetOptions } = useQuery({
    queryKey: ["ipset-options"],
    queryFn: () => ipsetOptionsApiOpsIpsetsOptions(),
    select: (data) =>
      data.data?.list?.map((item) => ({ value: item.id, label: item.name })),
  })

  const { data: domainSetOptions } = useQuery({
    queryKey: ["domainset-options"],
    queryFn: () => domainsetOptionsApiOpsDomainsetsOptions(),
    select: (data) =>
      data.data?.list?.map((item) => ({ value: item.id, label: item.name })),
  })

  return (
    <Drawer
      open={open}
      title={accessUnit ? "编辑RelatedAU" : "添加RelatedAU"}
      onClose={onClose}
      destroyOnClose
      width={500}
      loading={isFetching}
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
        initialValues={data}
        onFinish={async (values) => {
          if (accessUnit) {
            await auUpdateApiOpsAuById(
              { id: accessUnit.id.toString() },
              { ...values, related: true },
            )
            message.success("编辑成功")
          } else {
            await auCreateApiOpsAu({ ...values, related: true })
            message.success("新建成功")
          }
          onClose()
          onFinish?.()
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          rules={[{ required: true }]}
          placeholder=""
        />
        <ProFormSelect
          name="resourceType"
          label="资源类型"
          mode="multiple"
          options={Object.entries(AuResourceTypeDict).map(([key, meta]) => ({
            value: key,
            label: meta.label,
          }))}
          placeholder=""
        />
        <ProFormSelect
          name="ipsetIds"
          label="IPSet"
          mode="multiple"
          options={ipSetOptions}
          placeholder=""
        />
        <ProFormSelect
          name="domainsetIds"
          label="DomainSet"
          mode="multiple"
          options={domainSetOptions}
          placeholder=""
        />
        <ProFormSelect
          name="overWall"
          label="FQ"
          options={Object.entries(AllAuOverWallDict).map(([key, meta]) => ({
            value: Number(key),
            label: meta.label,
            disabled: !meta.label.includes("手动"),
          }))}
          placeholder=""
        />
        <ProFormSelect
          name="autoUpdate"
          label="自动更新"
          options={Object.entries(AllAuAutoUpdateDict).map(([key, meta]) => ({
            value: Number(key),
            label: meta.label,
            disabled: !meta.label.includes("手动"),
          }))}
          placeholder=""
        />
        <ProFormSelect
          name="officialSupportApi"
          label="官网支持API"
          options={Object.entries(AllAuSupportApiDict).map(([key, meta]) => ({
            value: Number(key),
            label: meta.label,
            disabled: !meta.label.includes("手动"),
          }))}
          placeholder=""
        />
        <ProFormSelect
          name="getWay"
          label="获取方式"
          mode="multiple"
          options={Object.entries(AllAuGetWayDict).map(([key, meta]) => ({
            value: key,
            label: meta.label,
            disabled: !meta.label.includes("手动"),
          }))}
          placeholder=""
        />
        <ProFormTextArea name="description" label="备注" placeholder="" />
        <ProFormTextArea name="faultRecords" label="故障记录" placeholder="" />
        <ProFormTextArea name="issueRecords" label="问题记录" placeholder="" />
        <ProFormTextArea name="information" label="相关信息" placeholder="" />
      </Form>
    </Drawer>
  )
}
