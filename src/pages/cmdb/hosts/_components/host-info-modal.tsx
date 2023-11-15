import CopyableText from "@/components/copyable-text"
import VerticalDataList from "@/components/vertical-data-list"
import {
  dictDisplay,
  dictGet,
  diskTypeDict,
  hostStateDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from "@/constants/dict"
import { toLocaleDateTimeString } from "@/lib/utils"
import { ProDescriptions } from "@ant-design/pro-components"
import { Button, Modal } from "antd"

export default function HostInfoModal({
  open,
  onCancel,
  host,
}: {
  open: boolean
  onCancel: VoidFunction
  host?: CMDB.HostInfo
}) {
  return (
    <Modal
      title="主机详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
      width="60%"
    >
      <div className="max-h-[600px] overflow-y-auto">
        {host && (
          <ProDescriptions title={host.HostName} column={4}>
            <ProDescriptions.Item label="主机类型">
              {host.HostType?.HostType}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="状态">
              {dictGet(host.State, hostStateDict)?.label ?? host.State}
              {host.State === "TO_BE_DESTROYED" &&
                `（释放时间：${toLocaleDateTimeString(host.removeAt)}）`}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="所属环境" copyable>
              {host.Env?.EnvName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="所属项目">
              <div className="flex gap-x-2">
                {host.ProjectSet?.map((project) => (
                  <span key={project.Project}>{project.ProjectName}</span>
                )) ?? "-"}
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="运维人员" span={2}>
              <div className="flex gap-x-2">
                {host.OpsSet?.map((person) => (
                  <span key={person.Uid}>{person.PersonName}</span>
                )) ?? "-"}
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="技术支持" span={2}>
              <div className="flex gap-x-2">
                {host.SupportSet?.map((person) => (
                  <span key={person.Uid}>{person.PersonName}</span>
                )) ?? "-"}
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="应用" span={2}>
              <div className="flex gap-x-2">
                {host.AppSet?.filter((app) => app.App).map((app) => (
                  <span key={app.Uid}>
                    {app.Version ? `${app.App}:${app.Version}` : app.App}
                  </span>
                )) ?? "-"}
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="备注" span={2}>
              {host.Description}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="云商" span={2}>
              {host.Instance?.Zone.Region.Cloud.CloudName} -{" "}
              {host.Instance?.Zone.Region.RegionName} -{" "}
              {host.Instance?.Zone.ZoneName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="云商标签" span={2}>
              <VerticalDataList
                items={host.Instance?.CloudTagOptionSet}
                renderItem={(item) => `${item.Key}:${item.Value}`}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="实例名称" span={2}>
              {host.Instance?.InstanceName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="实例ID" span={2}>
              {host.Instance?.InstanceId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="实例状态">
              {host.Instance?.InstanceState}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="资源规格">
              {host.Instance?.InstanceType}_{host.Instance?.Cpu}C
              {host.Instance?.Memory}G
            </ProDescriptions.Item>
            <ProDescriptions.Item label="系统盘">
              {dictDisplay(
                host.Instance?.SystemDisk.DiskType ?? "-",
                diskTypeDict,
              )}{" "}
              - {host.Instance?.SystemDisk.DiskSize}GB
            </ProDescriptions.Item>
            <ProDescriptions.Item label="数据盘">
              <VerticalDataList
                items={host.Instance?.DataDiskSet}
                renderItem={(item, index) =>
                  `${index + 1}：${dictDisplay(
                    item.DiskType,
                    diskTypeDict,
                  )} - ${item.DiskSize}GB`
                }
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="操作系统">
              {host.Instance?.OsName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="默认用户">
              {host.Instance?.DefaultLoginUser}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="默认端口">
              {host.Instance?.DefaultLoginPort}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="镜像">
              {host.Instance?.Image.ImageName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="付费方式">
              {dictDisplay(
                host.Instance?.InstanceChargeType,
                instanceChargeTypeDict,
              )}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="续费模式">
              {dictDisplay(host.Instance?.RenewFlag ?? "-", renewFlagDict)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="IP地址" span={2}>
              <div>
                <VerticalDataList
                  items={host.Instance?.PublicIpAddresses}
                  renderItem={(ip) =>
                    ip ? (
                      <CopyableText text={`${ip}（公）`} copyText={ip} />
                    ) : null
                  }
                  empty={null}
                />
                <VerticalDataList
                  items={host.Instance?.PrivateIpAddresses}
                  renderItem={(ip) =>
                    ip ? (
                      <CopyableText text={`${ip}（私）`} copyText={ip} />
                    ) : null
                  }
                  empty={null}
                />
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="网络" span={2}>
              <VerticalDataList
                items={host.Instance?.SubnetWithVpcSet}
                renderItem={(item) =>
                  `${item.Vpc.VpcName} : ${item.SubnetName}`
                }
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="安全组" span={2}>
              <VerticalDataList
                items={host.Instance?.SecurityGroupSet}
                renderItem={(item) => item.SecurityGroupName}
              />
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </div>
    </Modal>
  )
}
