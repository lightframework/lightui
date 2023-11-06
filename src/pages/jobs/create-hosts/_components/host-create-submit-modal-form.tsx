import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { hostCreateApiOpsHosts } from "@/services/ops/host"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { history } from "@umijs/max"
import { Button, message } from "antd"
import { HostCreateFormData } from "./host-create-form"

export default function HostCreateSubmitModalForm({
  hosts,
  disabled,
  onFinish,
}: {
  hosts: HostCreateFormData[]
  disabled?: boolean
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.HostCreateReq>
      title="创建主机任务"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={disabled}>
          提交
        </Button>
      }
      initialValues={{ topic: hosts.at(0)?.project?.ProjectName }}
      autoFocusFirstInput
      layout="horizontal"
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        const hostsData: OPS.Host[] = hosts.map((host) => ({
          EnvUid: host.env!.Uid,
          ProjectUid: host.project?.Uid,
          TagList: host.tagList!,
          Description: host.description,
          AppUids: host.apps?.map((app) => app.Uid),
          Count: host.count!,
          OpsUids: host.opsUids,
          SupportUids: host.supportUids,
          HostTypeUid: host.hostType!.Uid,
          CityUid: host.cityUid!,
          Instance: {
            CloudTagUids: host.cloudTags?.map((tag) => tag.Uid),
            CloudUid: host.cloud!.Uid,
            Cpu: Number.parseInt(host.cpu!),
            DataDisks:
              host.dataDisks?.map((disk) => ({
                DiskSize: disk.diskSize!,
                DiskType: disk.diskType!,
              })) ?? [],
            ImageUid: host.image?.Uid,
            InstanceChargePrepaid: {
              Period: Number.parseInt(host.instanceChargePeriod!),
              RenewFlag: host.instanceChargeRenewFlag!,
            },
            InstanceChargeType: host.instanceChargeType!,
            InstanceTypeUid: host.instanceType?.Uid,
            InternetAccessible: {
              InternetChargeType: host.internetChargeType,
              InternetMaxBandwidthOut: host.internetMaxBandwidthOut
                ? Number.parseInt(host.internetMaxBandwidthOut)
                : undefined,
              PublicIpAssigned: host.publicIpAssigned!,
            },
            Memory: Number.parseInt(host.memory!),
            Password: host.password!,
            RegionUid: host.region!.Uid,
            SecurityGroupUids: host.securityGroups?.map((item) => item.Uid),
            SystemDisk: { DiskSize: host.diskSize!, DiskType: host.diskType! },
            SubnetUids: host.vpcSubnets
              ?.filter((item) => item.subnet !== undefined)
              .map((item) => item.subnet!.Uid),
            ZoneUid: host.zone!.Uid,
          },
        }))

        await hostCreateApiOpsHosts({
          ...formData,
          hosts: hostsData,
        })
        message.success("创建成功")
        onFinish?.()
        history.push("/jobs/tasks")
        return true
      }}
    >
      <ProFormText
        label="任务名称"
        name="topic"
        placeholder=""
        rules={[{ required: true, message: "请输入任务名称" }]}
      />
      <ProFormTextArea label="备注" placeholder="" />
    </ModalForm>
  )
}
