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
      modalProps={{
        maskClosable: false,
      }}
      initialValues={{ topic: hosts.at(0)?.project?.ProjectName }}
      autoFocusFirstInput
      layout="horizontal"
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        const hostsData: OPS.Host[] = hosts.map((host) => ({
          NeedConfirm: !!host.confirm,
          EnvUid: host.envUid!,
          ProjectUid: host.projectUid,
          TagList: host.tagList!,
          Description: host.description,
          AppUids: host.appUids,
          Count: host.count!,
          OpsUids: host.opsUids,
          SupportUids: host.supportUids,
          HostTypeUid: host.hostTypeUid!,
          CityUid: host.cityUid!,
          Instance: {
            CloudTagUids: host.cloudTagUids,
            CloudUid: host.cloudUid!,
            Cpu: Number.parseInt(host.cpu!),
            DataDisks:
              host.dataDisks?.map((disk) => ({
                DiskSize: disk.diskSize!,
                DiskType: disk.diskType!,
              })) ?? [],
            ImageUid: host.imageUid,
            InstanceChargePrepaid: {
              Period: Number.parseInt(host.instanceChargePeriod!),
              RenewFlag: host.instanceChargeRenewFlag!,
            },
            InstanceChargeType: host.instanceChargeType!,
            InstanceTypeUid: host.instanceTypeUid,
            InternetAccessible: {
              InternetChargeType: host.internetChargeType,
              InternetMaxBandwidthOut: host.internetMaxBandwidthOut
                ? Number.parseInt(host.internetMaxBandwidthOut)
                : undefined,
              PublicIpAssigned: host.publicIpAssigned!,
            },
            Memory: Number.parseInt(host.memory!),
            Password: host.password!,
            RegionUid: host.regionUid!,
            SecurityGroupUids: host.securityGroupUids,
            SystemDisk: { DiskSize: host.diskSize!, DiskType: host.diskType! },
            SubnetUids: host.vpcSubnetUids
              ?.filter((item) => item.subnetUid !== undefined)
              .map((item) => item.subnetUid) as string[],
            ZoneUid: host.zoneUid!,
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
