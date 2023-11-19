import useCityOptions from "@/lib/hooks/use-city-options"
import {
  getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehost,
  updateCreateHostSubTaskApiOpsBySubtasksidcreatehost,
} from "@/services/ops/task"
import { useQuery } from "@tanstack/react-query"
import { Modal, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { memo, useEffect } from "react"
import HostCreateForm from "../../create-hosts/_components/host-create-form"
import HostCreateFormProvider, {
  useHostCreateForm,
} from "../../create-hosts/_components/host-create-form-provider"

type SubTaskConfigModalProps = {
  subTaskId?: number
  open: boolean
  onCancel: VoidFunction
  readonly?: boolean
  onFinish?: VoidFunction
}

function getCityTuple(
  options: ReturnType<typeof useCityOptions>,
  cityUid: string,
) {
  if (!options) return undefined

  for (const continent of options) {
    for (const country of continent.children) {
      for (const city of country.children) {
        if (city.uid === cityUid) {
          return [continent.id, country.id, city.id]
        }
      }
    }
  }

  return undefined
}

function SubTaskConfigModalInner({
  subTaskId,
  open,
  onCancel,
  readonly,
  onFinish,
}: SubTaskConfigModalProps) {
  const [modal, contextHolder] = useModal()
  const { form, setIsInitial } = useHostCreateForm()

  const { data } = useQuery({
    queryKey: ["sub-task-config", subTaskId],
    queryFn: () =>
      getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehost({
        id: String(subTaskId),
      }).then((res) => res.data?.host),
    enabled: !!subTaskId,
  })

  const cityOptions = useCityOptions({ valueById: true })

  useEffect(() => {
    if (data && cityOptions) {
      setIsInitial(true)
      form.setFieldsValue({
        envUid: data.EnvUid,
        count: 1,
        hostTypeUid: data.HostTypeUid,
        appUids: data.AppUids ?? [],
        opsUids: data.OpsUids ?? [],
        number: data.Number,
        supportUids: data.SupportUids ?? [],
        projectUid: data.ProjectUid,
        tagList: data.TagList ?? [],
        description: data.Description,
        _resourceGroup: "ops",
        cityUid: data.CityUid,
        _cityId: getCityTuple(cityOptions, data.CityUid),

        cloudUid: data.Instance.CloudUid,
        regionUid: data.Instance.RegionUid,
        zoneUid: data.Instance.ZoneUid,
        cloudTagUids: data.Instance.CloudTagUids ?? [],
        cpu: String(data.Instance.Cpu),
        diskSize: data.Instance.SystemDisk?.DiskSize,
        diskType: data.Instance.SystemDisk?.DiskType,
        imageUid: data.Instance.ImageUid,
        instanceChargePeriod: String(
          data.Instance.InstanceChargePrepaid?.Period,
        ),
        instanceChargeRenewFlag: data.Instance.InstanceChargePrepaid?.RenewFlag,
        instanceChargeType: data.Instance.InstanceChargeType,
        instanceTypeUid: data.Instance.InstanceTypeUid,
        internetChargeType:
          data.Instance.InternetAccessible?.InternetChargeType,
        internetMaxBandwidthOut: String(
          data.Instance.InternetAccessible?.InternetMaxBandwidthOut,
        ),
        publicIpAssigned: data.Instance.InternetAccessible?.PublicIpAssigned,
        memory: String(data.Instance.Memory),
        password: data.Instance.Password,
        securityGroupUids: data.Instance.SecurityGroupUids ?? [],
        vpcSubnetUids: data.Instance.VpcSubnets?.map((item: any) => ({
          vpcUid: item.VpcUid,
          subnetUid: item.SubnetUid,
        })),
        dataDisks: data.Instance.DataDisks?.map((disk) => ({
          diskSize: disk.DiskSize,
          diskType: disk.DiskType,
        })),
      })

      setTimeout(() => setIsInitial(false), 1500)
    }
  }, [data, cityOptions])

  const submit = async () => {
    if (readonly) {
      return true
    }

    try {
      const host = await form.validateFields()

      const res = await modal.confirm({
        title: "确认修改配置并重新执行流水线？",
        onOk: async () => {
          await updateCreateHostSubTaskApiOpsBySubtasksidcreatehost(
            { id: String(subTaskId) },
            {
              host: {
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
                  SystemDisk: {
                    DiskSize: host.diskSize!,
                    DiskType: host.diskType!,
                  },
                  SubnetUids: host.vpcSubnetUids
                    ?.filter((item) => item.subnetUid !== undefined)
                    .map((item) => item.subnetUid) as string[],
                  ZoneUid: host.zoneUid!,
                },
              },
            },
          )
          message.success("重新执行成功")
          return true
        },
      })
      return res
    } catch (error) {
      message.error("请先完成主机配置")
      return false
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onCancel={onCancel}
        width={"60%"}
        centered
        onOk={async () => {
          const ok = await submit()
          if (ok) {
            onCancel()
            onFinish?.()
          }
        }}
      >
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <HostCreateForm />
        </div>
      </Modal>
    </>
  )
}

const SubTaskConfigModal = memo((props: SubTaskConfigModalProps) => {
  return (
    <HostCreateFormProvider readonly={props.readonly} fromSubTask>
      <SubTaskConfigModalInner {...props} />
    </HostCreateFormProvider>
  )
})

export default SubTaskConfigModal
