import { cloudSyncTargetMap } from "@/constants/cloud"
import {
  DEFAULT_DISK_SIZE,
  DEFAULT_DISK_TYPE,
  DEFAULT_INSTANCE_CHARGE_TYPE,
  DEFAULT_INSTANCE_RENEW_FLAG,
  DEFAULT_INTERNET_CHARGE_TYPE,
  diskTypeDict,
  instanceChargeTypeDict,
  internetChargeTypeDict,
  renewFlagDict,
} from "@/constants/dict"
import tagList from "@/constants/old-cmdb-tag-list.json"
import { usePersonOptions } from "@/lib/hooks"
import {
  useQueryAppOptions,
  useQueryCloudTagOptions,
  useQueryEnvOptions,
  useQueryHostTypeOptions,
  useQueryImageOptions,
  useQueryInstanceTypeOptions,
  useQueryProjectOptions,
  useQuerySecurityGroupOptions,
  useQuerySubnetOptions,
  useQueryVpcOptions,
} from "@/lib/hooks/data"
import useCityOptions from "@/lib/hooks/use-city-options"
import {
  cloudSyncApiCmdbCloudsSync,
  cloudUseablesApiCmdbCloudsUsables,
} from "@/services/cmdb/cloud"
import { SyncOutlined } from "@ant-design/icons"
import {
  ProForm,
  ProFormCascader,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { AutoComplete, Tooltip, message } from "antd"
import { useWatch } from "antd/es/form/Form"
import useModal from "antd/es/modal/useModal"
import clsx from "clsx"
import { useEffect, useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { useHostCreateForm } from "./host-create-form-provider"

function useUsableClouds() {
  const { form } = useHostCreateForm()

  const resourceGroup = useWatch("_resourceGroup", form)
  const cityId = useWatch("_cityId", form)

  const query = useQuery({
    queryKey: ["usable-clouds", resourceGroup, cityId],
    queryFn: () =>
      cloudUseablesApiCmdbCloudsUsables({
        ResourceGroup: resourceGroup,
        City: cityId?.at(2),
      }).then((res) => res.data?.Tree ?? []),
    enabled: !!resourceGroup && Array.isArray(cityId) && cityId.length === 3,
  })

  return query
}

export interface HostCreateFormData {
  uuid: string
  cityUid?: string
  env?: CMDB.EnvOption
  project?: CMDB.ProjectOption
  hostType?: CMDB.HostTypeOption
  opsUids?: string[]
  supportUids?: string[]
  description?: string
  apps?: CMDB.AppOption[]
  tagList?: string[]
  count?: number
  cloud?: CMDB.CloudUseableCloud
  cloudTags?: CMDB.CloudTagOption[]
  instanceType?: CMDB.InstanceTypeQuotaItemOption

  // AutoComplete need string value
  cpu?: string
  memory?: string
  instanceChargePeriod?: string
  internetMaxBandwidthOut?: string

  diskSize?: number
  diskType?: string
  dataDisks?: {
    diskSize?: number
    diskType?: string
  }[]
  region?: CMDB.CloudUseableRegion
  zone?: CMDB.CloudUseableZone
  vpcSubnets?: { vpc?: CMDB.VpcOption; subnet?: CMDB.SubnetOption }[]
  securityGroups?: CMDB.SecurityGroupOption[]
  image?: CMDB.ImageOption
  password?: string

  instanceChargeRenewFlag?: string
  instanceChargeType?: string
  internetChargeType?: string
  publicIpAssigned?: boolean

  _resourceGroup?: string
  _cityId?: string[]
}

export function generateEmptyHostFormData(): HostCreateFormData {
  return {
    uuid: uuidV4(),

    vpcSubnets: [{}],
    count: 1,
    diskType: DEFAULT_DISK_TYPE,
    diskSize: DEFAULT_DISK_SIZE,
    instanceChargePeriod: "1",
    instanceChargeRenewFlag: DEFAULT_INSTANCE_RENEW_FLAG,
    instanceChargeType: DEFAULT_INSTANCE_CHARGE_TYPE,
    internetChargeType: DEFAULT_INTERNET_CHARGE_TYPE,
    internetMaxBandwidthOut: "200",
    publicIpAssigned: true,

    env: undefined,
    project: undefined,
    hostType: undefined,
    opsUids: undefined,
    supportUids: undefined,
    description: undefined,
    apps: undefined,
    tagList: undefined,
    cloud: undefined,
    cloudTags: undefined,
    instanceType: undefined,
    cpu: "1",
    memory: "2",
    dataDisks: undefined,
    region: undefined,
    zone: undefined,
    securityGroups: undefined,
    image: undefined,
    password: undefined,

    _resourceGroup: "ops",
    _cityId: undefined,
    cityUid: undefined,
  }
}

function HostNameDisplay() {
  const { form } = useHostCreateForm()

  const hostType = useWatch("hostType", form)
  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const apps = useWatch("apps", form)
  const cityId = useWatch("_cityId", form)
  const ruleRuleDefinition = hostType?.RuleDefinition

  let hostName = ruleRuleDefinition ?? "-"

  if (ruleRuleDefinition) {
    if (cloud) {
      hostName = hostName.replaceAll("{{.Cloud}}", cloud.Cloud)
    }
    if (region) {
      hostName = hostName.replaceAll("{{.Region}}", region?.Region)
    }
    if (apps) {
      hostName = hostName.replaceAll(
        "{{.Apps}}",
        apps.map((app) => app.App).join("-"),
      )
    }
    if (cityId && cityId.length === 3) {
      hostName = hostName.replaceAll("{{.City}}", cityId.at(2) ?? "{{.City}}")
    }
  }

  return (
    <ProFormText
      label="主机名"
      readonly
      fieldProps={{
        value: hostName,
      }}
    />
  )
}

function EnvSelect() {
  const { form } = useHostCreateForm()
  const { data, isPending } = useQueryEnvOptions()

  return (
    <ProFormSelect
      label="所属环境"
      name="env"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={data?.map((env) => ({
        ...env,
        label: env.EnvName,
        value: env.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("env", option)}
      rules={[{ required: true, message: "请选择环境" }]}
    />
  )
}

function ProjectSelect() {
  const { form } = useHostCreateForm()

  const { data, isPending } = useQueryProjectOptions()

  return (
    <ProFormSelect
      label="所属项目"
      name="project"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={data?.map((project) => ({
        ...project,
        label: `${project.ProjectName} - ${project.Project}`,
        value: project.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("project", option)}
    />
  )
}

function HostTypeSelect() {
  const { form } = useHostCreateForm()

  const { data, isPending } = useQueryHostTypeOptions()

  return (
    <ProFormSelect
      label="主机类型"
      name="hostType"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={data?.map((hostType) => ({
        ...hostType,
        label: hostType.HostType,
        value: hostType.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("hostType", option)}
      rules={[{ required: true, message: "请选择主机类型" }]}
    />
  )
}

function ResourceGroupSelect() {
  return (
    <ProFormSelect
      label="资源组"
      name="_resourceGroup"
      placeholder=""
      rules={[{ required: true, message: "请选择资源组" }]}
      options={[
        {
          value: "ops",
          label: "运维",
        },
        {
          value: "qa",
          label: "测试",
        },
      ]}
    />
  )
}

function CitySelect() {
  const options = useCityOptions({ valueById: true })
  const { form } = useHostCreateForm()

  return (
    <>
      <ProFormText name="cityUid" hidden />
      <ProFormCascader
        name="_cityId"
        label="城市"
        fieldProps={{
          options,
          showSearch: {
            filter: (inputValue, path) => {
              return path.some(
                (item) =>
                  item.id.toLowerCase().includes(inputValue.toLowerCase()) ||
                  item.label.toLowerCase().includes(inputValue.toLowerCase()),
              )
            },
          },
          onChange: (_: any, option: { uid: string }[]) => {
            if (Array.isArray(option) && option.length === 3) {
              form.setFieldValue("cityUid", option[2].uid)
            }
          },
        }}
        placeholder=""
        rules={[{ required: true, message: "请选择城市" }]}
      />
    </>
  )
}

function UsableCloudsMsg() {
  const { form } = useHostCreateForm()

  const resourceGroup = useWatch("_resourceGroup", form)
  const cityId = useWatch("_cityId", form)

  const { data, isPending } = useUsableClouds()

  if (!resourceGroup || !cityId || isPending) return null

  if (!data || data.length === 0) {
    return (
      <p className="-mt-2 ml-20 text-red-400">该资源组和城市的组合无可用云商</p>
    )
  }

  return null
}

function OpsMultiSelect() {
  const opsPersons = usePersonOptions("运维")

  return (
    <ProFormSelect
      label="运维"
      name="opsUids"
      mode="multiple"
      showSearch
      placeholder=""
      options={opsPersons.map((ops) => ({
        label: ops.PersonName,
        value: ops.Uid,
      }))}
      rules={[
        {
          required: true,
          message: "请选择至少一名运维人员",
        },
      ]}
    />
  )
}

function SupportMultiSelect() {
  const supportPersons = usePersonOptions("技术支持")

  return (
    <ProFormSelect
      label="技术支持"
      name="supportUids"
      mode="multiple"
      showSearch
      placeholder=""
      options={supportPersons.map((support) => ({
        label: support.PersonName,
        value: support.Uid,
      }))}
    />
  )
}

function AppMultiSelect() {
  const { form } = useHostCreateForm()

  const { data, isPending } = useQueryAppOptions()

  return (
    <ProFormSelect
      label="应用"
      name="apps"
      mode="multiple"
      fieldProps={{ loading: isPending }}
      showSearch
      placeholder=""
      options={data?.map((app) => ({
        ...app,
        label: `${app.App}:${app.Version}`,
        value: app.Uid,
      }))}
      onChange={(_, options) => form.setFieldValue("apps", options)}
    />
  )
}

function TagListSelect() {
  return (
    <ProFormSelect
      label="旧cmdb标签"
      name="tagList"
      mode="multiple"
      showSearch
      placeholder=""
      options={tagList.map((tag) => ({
        label: tag,
        value: tag,
      }))}
      rules={[
        {
          required: true,
          message: "请选择旧cmdb标签",
        },
      ]}
    />
  )
}

function DescriptionTextArea() {
  return (
    <ProFormTextArea
      label="备注"
      name="description"
      placeholder=""
      fieldProps={{ rows: 1 }}
    />
  )
}

function CloudSelect() {
  const { form, isInitial } = useHostCreateForm()

  const cloud = useWatch("cloud", form)

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(["cloudTags"])
    }
  }, [cloud])

  const { data, isPending } = useUsableClouds()

  useEffect(() => {
    if (data && data.length > 0 && !cloud) {
      const option = data[0]
      form.setFieldValue("cloud", {
        ...option,
        label: option.CloudName,
        value: option.Uid,
      })
    }
  }, [cloud, data])

  return (
    <ProFormSelect
      label="云商"
      name="cloud"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={data?.map((cloud) => ({
        ...cloud,
        label: cloud.CloudName,
        value: cloud.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("cloud", option)}
      rules={[{ required: true, message: "请选择云商" }]}
    />
  )
}

function RegionSelect() {
  const { form, isInitial } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(["securityGroups", "image"])
      form.setFieldValue("vpcSubnets", [{}])
    }
  }, [region])

  const { data, isPending } = useUsableClouds()

  const options = useMemo(
    () =>
      data
        ?.find((item) => item.Cloud === cloud?.Cloud)
        ?.RegionSet?.map((region) => ({
          ...region,
          label: region.RegionName,
          value: region.Uid,
        })),
    [data, cloud],
  )

  useEffect(() => {
    if (cloud && options && options.length > 0) {
      form.setFieldValue("region", options[0])
    }
  }, [cloud, options])

  return (
    <ProFormSelect
      label="区域"
      name="region"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={options}
      onChange={(_, option) => form.setFieldValue("region", option)}
      rules={[{ required: true, message: "请选择区域" }]}
    />
  )
}

function ZoneSelect() {
  const { form, isInitial } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const zone = useWatch("zone", form)

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(["instanceType"])
    }
  }, [zone])

  useEffect(() => {
    const vpcSubnets = form.getFieldValue(
      "vpcSubnets",
    ) as HostCreateFormData["vpcSubnets"]
    if (vpcSubnets) {
      const newVpcSubnets = vpcSubnets.filter(
        (vpcSubnet) =>
          !vpcSubnet.subnet ||
          !vpcSubnet.subnet.Zone ||
          vpcSubnet.subnet.Zone === zone?.Zone,
      )
      form.setFieldValue(
        "vpcSubnets",
        newVpcSubnets.length === 0 ? [{}] : newVpcSubnets,
      )
      form.validateFields(["vpcSubnets"])
    }
  }, [zone])

  const { data, isPending } = useUsableClouds()

  const options = useMemo(
    () =>
      data
        ?.find((item) => item.Cloud === cloud?.Cloud)
        ?.RegionSet?.find((item) => item.Region === region?.Region)
        ?.ZoneSet?.map((zone) => ({
          ...zone,
          label: zone.ZoneName,
          value: zone.Uid,
        })),
    [data, region],
  )

  useEffect(() => {
    if (region && options && options.length > 0) {
      form.setFieldValue("zone", options[0])
    }
  }, [region, options])

  return (
    <ProFormSelect
      label="可用区"
      name="zone"
      showSearch
      placeholder=""
      fieldProps={{ loading: isPending }}
      options={options}
      onChange={(_, option) => form.setFieldValue("zone", option)}
      rules={[{ required: true, message: "请选择可用区" }]}
    />
  )
}

function ImageSelect() {
  const { form } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const hostType = useWatch("hostType", form)
  const keywords = hostType?.ImageKeyword

  const { data, isPending } = useQueryImageOptions(region?.Uid, keywords)

  const images = data?.filter((image) => image.ImageState === "NORMAL")

  useEffect(() => {
    if (images) {
      const selectedImage: CMDB.ImageOption | undefined =
        form.getFieldValue("image")
      if (
        !selectedImage ||
        !images?.find((image) => image.ImageId === selectedImage.ImageId)
      ) {
        form.setFieldValue(
          "image",
          images.length > 0
            ? {
                ...images[0],
                label: images[0].ImageName,
                value: images[0].Uid,
              }
            : undefined,
        )
      }
    }
  }, [images])

  return (
    <ProFormSelect
      label="镜像"
      name="image"
      showSearch
      placeholder=""
      disabled={!cloud?.SupportApi}
      fieldProps={{ loading: isPending }}
      options={images?.map((image) => ({
        ...image,
        label: image.ImageName,
        value: image.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("image", option)}
      rules={
        cloud?.SupportApi
          ? [{ required: true, message: "请选择镜像" }]
          : undefined
      }
    />
  )
}

function InstanceTypeSelect() {
  const { form } = useHostCreateForm()

  const zone = useWatch("zone", form)
  const cloud = useWatch("cloud", form)

  const { data, isPending } = useQueryInstanceTypeOptions(zone?.Uid)

  const instanceTypes = data?.filter(
    (instanceType) => instanceType.Status === "SELL",
  )

  return (
    <ProFormSelect
      label="资源规格"
      name="instanceType"
      showSearch
      placeholder=""
      disabled={!cloud?.SupportApi}
      fieldProps={{ loading: isPending }}
      options={instanceTypes?.map((instanceType) => ({
        ...instanceType,
        label:
          instanceType.Cpu && instanceType.Memory
            ? `${instanceType.InstanceType}_${instanceType.Cpu}C${instanceType.Memory}G`
            : instanceType.InstanceType,
        value: instanceType.Uid,
      }))}
      onChange={(_, option) => form.setFieldValue("instanceType", option)}
      rules={
        cloud?.SupportApi
          ? [{ required: true, message: "请选择资源规格" }]
          : undefined
      }
    />
  )
}

function CpuSelect() {
  const { form } = useHostCreateForm()

  const instanceType = useWatch("instanceType", form)

  const disabled =
    instanceType && instanceType.Cpu > 0 && instanceType.Memory > 0

  useEffect(() => {
    if (disabled) {
      form.setFieldValue("cpu", instanceType?.Cpu ?? 0)
      form.validateFields(["cpu"])
    }
  }, [instanceType])

  return (
    <ProForm.Item
      label="CPU"
      name="cpu"
      rules={[
        {
          required: true,
          message: "请选择CPU核心数",
        },
        {
          pattern: /^[1-9]\d*$/,
          message: "请输入正整数",
        },
      ]}
    >
      <AutoComplete
        disabled={disabled}
        suffixIcon="核心"
        options={[
          {
            value: "1",
          },
          {
            value: "2",
          },
          {
            value: "4",
          },
          {
            value: "6",
          },
          {
            value: "8",
          },
          {
            value: "16",
          },
          {
            value: "24",
          },
          {
            value: "32",
          },
        ]}
      />
    </ProForm.Item>
  )
}

function MemorySelect() {
  const { form } = useHostCreateForm()

  const instanceType = useWatch("instanceType", form)

  const disabled =
    instanceType && instanceType.Cpu > 0 && instanceType.Memory > 0

  useEffect(() => {
    if (disabled) {
      form.setFieldValue("memory", instanceType?.Memory ?? 0)
      form.validateFields(["memory"])
    }
  }, [instanceType])

  return (
    <ProForm.Item
      label="内存"
      name="memory"
      rules={[
        {
          required: true,
          message: "请选择内存大小",
        },
        {
          pattern: /^[1-9]\d*$/,
          message: "请输入正整数",
        },
      ]}
    >
      <AutoComplete
        disabled={disabled}
        suffixIcon="GB"
        options={[
          {
            value: "1",
          },
          {
            value: "2",
          },
          {
            value: "4",
          },
          {
            value: "6",
          },
          {
            value: "8",
          },
          {
            value: "16",
          },
          {
            value: "24",
          },
          {
            value: "32",
          },
        ]}
      />
    </ProForm.Item>
  )
}

function InstanceChargeTypeSelect() {
  const { form } = useHostCreateForm()
  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="付费方式"
      disabled={!cloud?.SupportApi}
      name="instanceChargeType"
      options={Object.entries(instanceChargeTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      placeholder=""
      rules={[
        {
          required: true,
          message: "请选择付费方式",
        },
      ]}
    />
  )
}

function InstanceChargePeriodSelect() {
  const { form } = useHostCreateForm()
  const instanceChargeType = useWatch("instanceChargeType", form)

  const cloud = useWatch("cloud", form)

  return (
    <ProForm.Item
      label="时长"
      hidden={instanceChargeType !== "PREPAID"}
      name="instanceChargePeriod"
      rules={[
        {
          required: true,
          message: "请选择开通时长",
        },
        {
          pattern: /^[1-9]\d*$/,
          message: "请输入正整数",
        },
      ]}
    >
      <AutoComplete
        disabled={!cloud?.SupportApi}
        suffixIcon="月"
        options={[
          {
            value: "1",
          },
          {
            value: "2",
          },
          {
            value: "3",
          },
          {
            value: "4",
          },
          {
            value: "5",
          },
          {
            value: "6",
          },
          {
            value: "7",
          },
          {
            value: "8",
          },
          {
            value: "9",
          },
          {
            value: "10",
          },
          {
            value: "11",
          },
          {
            value: "12",
          },
          {
            value: "24",
          },
          {
            value: "36",
          },
          {
            value: "48",
          },
          {
            value: "64",
          },
        ]}
      />
    </ProForm.Item>
  )
}

function InstanceChargeRenewFlagSelect() {
  const { form } = useHostCreateForm()
  const instanceChargeType = useWatch("instanceChargeType", form)

  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="续费模式"
      name="instanceChargeRenewFlag"
      placeholder=""
      disabled={!cloud?.SupportApi}
      hidden={instanceChargeType !== "PREPAID"}
      options={Object.entries(renewFlagDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      rules={[{ required: true, message: "请选择续费模式" }]}
    />
  )
}

function PublicIpAssignedSwitch() {
  const { form } = useHostCreateForm()
  const cloud = useWatch("cloud", form)

  return (
    <ProFormSwitch
      label="绑定公网IP"
      name="publicIpAssigned"
      disabled={!cloud?.SupportApi}
    />
  )
}

function InternetMaxBandwidthOutSelect() {
  const { form } = useHostCreateForm()
  const publicIpAssigned = useWatch("publicIpAssigned", form)

  return (
    <ProForm.Item
      label="带宽"
      hidden={!publicIpAssigned}
      name="internetMaxBandwidthOut"
      rules={[
        {
          required: true,
          message: "请选择或者输入带宽大小",
        },
        {
          pattern: /^[1-9]\d*$/,
          message: "请输入正整数",
        },
      ]}
    >
      <AutoComplete
        suffixIcon="MB"
        options={[
          {
            value: "50",
          },
          {
            value: "100",
          },
          {
            value: "200",
          },
        ]}
      />
    </ProForm.Item>
  )
}

function InternetChargeTypeSelect() {
  const { form } = useHostCreateForm()
  const publicIpAssigned = useWatch("publicIpAssigned", form)

  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="付费类型"
      name="internetChargeType"
      placeholder=""
      disabled={!cloud?.SupportApi}
      hidden={!publicIpAssigned}
      options={Object.entries(internetChargeTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      rules={[
        {
          required: true,
          message: "请选择付费类型",
        },
      ]}
    />
  )
}

function SystemDiskSelect() {
  return (
    <div className="flex">
      <ProFormSelect
        label="系统盘"
        name="diskType"
        placeholder=""
        width={160}
        options={Object.entries(diskTypeDict).map(([key, value]) => ({
          label: value,
          value: key,
        }))}
        rules={[
          {
            required: true,
            message: "请选择硬盘类型",
          },
        ]}
      />

      <ProFormDigit
        name="diskSize"
        min={10}
        max={2000}
        placeholder=""
        fieldProps={{
          step: 10,
          addonAfter: "GB",
        }}
        width={110}
        rules={[
          {
            required: true,
            message: "请输入硬盘大小",
          },
        ]}
      />
    </div>
  )
}

function DataDiskMultiSelect() {
  return (
    <ProFormList label="数据盘" name="dataDisks">
      <div className="flex">
        <ProFormSelect
          name="diskType"
          placeholder=""
          width={160}
          options={Object.entries(diskTypeDict).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          initialValue={DEFAULT_DISK_TYPE}
          rules={[
            {
              required: true,
              message: "请选择硬盘类型",
            },
          ]}
        />

        <ProFormDigit
          name="diskSize"
          min={10}
          max={2000}
          placeholder=""
          fieldProps={{
            step: 10,
            addonAfter: "GB",
          }}
          width={110}
          initialValue={DEFAULT_DISK_SIZE}
          rules={[
            {
              required: true,
              message: "请输入硬盘大小",
            },
          ]}
        />
      </div>
    </ProFormList>
  )
}

function CloudSyncIconButton({
  className,
  onClick,
}: {
  className?: string
  onClick: VoidFunction
}) {
  return (
    <Tooltip className={clsx("mb-6", className)} title="同步">
      <SyncOutlined
        width={12}
        height={12}
        className="cursor-pointer hover:text-blue-400"
        onClick={onClick}
      />
    </Tooltip>
  )
}

function SubnetSelect({ index, vpc }: { index: number; vpc?: CMDB.VpcOption }) {
  const { form, isInitial } = useHostCreateForm()
  const zone = useWatch("zone", form)
  const cloud = useWatch("cloud", form)

  const { data, isPending } = useQuerySubnetOptions(vpc?.Uid)

  useEffect(() => {
    if (!isInitial) {
      form.resetFields([["vpcSubnets", index, "subnet"]])
    }
  }, [vpc?.Uid])

  const subnets = data?.filter(
    (subnet) => !subnet.Zone || subnet.Zone === zone?.Zone,
  )

  return (
    <ProFormSelect
      name="subnet"
      showSearch
      width={250}
      fieldProps={{
        loading: isPending,
      }}
      disabled={!cloud?.SupportApi}
      placeholder="子网"
      options={subnets?.map((subnet) => ({
        ...subnet,
        label: subnet.SubnetName,
        value: subnet.Uid,
      }))}
      rules={
        cloud?.SupportApi
          ? [
              {
                required: true,
                message: "请选择子网",
              },
            ]
          : undefined
      }
      onChange={(_, option) =>
        form.setFieldValue(["vpcSubnets", index, "subnet"], option)
      }
    />
  )
}

function VpcSubnetMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const vpcSubnets = useWatch("vpcSubnets", form)
  const vpcIds = vpcSubnets?.map((vpcSubnet) => vpcSubnet.vpc?.VpcId) ?? []

  const hostType = useWatch("hostType", form)
  const keywords = hostType?.VpcKeyword

  const { data, isPending, refetch } = useQueryVpcOptions(region?.Uid, keywords)

  useEffect(() => {
    if (data) {
      const selectedVpcs: HostCreateFormData["vpcSubnets"] =
        form.getFieldValue("vpcSubnets")

      if (!selectedVpcs) {
        return
      }

      const newVpcs = []

      for (const vpc of selectedVpcs) {
        if (data.find((item) => item.VpcId === vpc.vpc?.VpcId)) {
          newVpcs.push(vpc)
        }
      }

      form.setFieldValue("vpcSubnets", newVpcs.length !== 0 ? newVpcs : [{}])
    }
  }, [data])

  useEffect(() => {
    const securityGroups = form.getFieldValue(
      "securityGroups",
    ) as HostCreateFormData["securityGroups"]
    if (securityGroups) {
      const newGroups = securityGroups.filter(
        (sg) => !sg.VpcId || vpcIds.includes(sg.VpcId),
      )
      form.setFieldValue("securityGroups", newGroups)
      form.validateFields(["securityGroups"])
    }
  }, [vpcIds])

  const sync = () => {
    if (cloud && region) {
      modal.confirm({
        title: "确定要同步网络吗？",
        content: `所选云商：${cloud?.CloudName}，所选区域：${region.RegionName}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            RegionUid: region.Uid,
            target: cloudSyncTargetMap["vpc"],
          })
          refetch()
          message.success("同步成功")
        },
      })
    } else {
      message.warning("请先选择云商和区域")
    }
  }

  return (
    <ProFormList
      label="网络"
      name="vpcSubnets"
      rules={
        cloud?.SupportApi
          ? [
              {
                required: true,
                message: "请选择网络",
                validator: (_, value) => {
                  if (!value || value.length === 0) {
                    return Promise.reject()
                  } else {
                    return Promise.resolve()
                  }
                },
              },
            ]
          : undefined
      }
    >
      {(_, index) => (
        <div className="flex">
          {contextHolder}
          <ProFormSelect
            name="vpc"
            showSearch
            width={250}
            fieldProps={{
              loading: isPending,
            }}
            disabled={!cloud?.SupportApi}
            placeholder={"VPC"}
            options={data?.map((vpc) => ({
              ...vpc,
              label: vpc.VpcName,
              value: vpc.Uid,
            }))}
            rules={
              cloud?.SupportApi
                ? [
                    {
                      required: true,
                      message: "请选择VPC",
                    },
                  ]
                : undefined
            }
            onChange={(_, option) =>
              form.setFieldValue(["vpcSubnets", index, "vpc"], option)
            }
          />

          <ProFormDependency name={["vpc"]}>
            {({ vpc }) => <SubnetSelect index={index} vpc={vpc} />}
          </ProFormDependency>

          <CloudSyncIconButton className="ml-2 mt-px" onClick={sync} />
        </div>
      )}
    </ProFormList>
  )
}

function SecurityGroupMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const vpcSubnets = useWatch("vpcSubnets", form)
  const vpcIds = vpcSubnets?.map((item) => item.vpc?.VpcId) ?? []

  const hostType = useWatch("hostType", form)
  const keywords = hostType?.SecKeyword

  const { data, isPending, refetch } = useQuerySecurityGroupOptions(
    region?.Uid,
    keywords,
  )

  const securityGroups = data?.filter(
    (securityGroup) =>
      !securityGroup.VpcId || vpcIds.includes(securityGroup.VpcId),
  )

  useEffect(() => {
    if (securityGroups) {
      const selectedSgs: HostCreateFormData["securityGroups"] =
        form.getFieldValue("securityGroups")

      if (!selectedSgs) {
        return
      }

      const newSgs = []

      for (const sg of selectedSgs) {
        if (
          securityGroups.find(
            (item) => item.SecurityGroupId === sg.SecurityGroupId,
          )
        ) {
          newSgs.push(sg)
        }
      }

      form.setFieldValue(
        "securityGroups",
        newSgs.length !== 0 ? newSgs : undefined,
      )
    }
  }, [securityGroups])

  const sync = () => {
    if (cloud && region) {
      modal.confirm({
        title: "确定要同步安全组吗？",
        content: `所选云商：${cloud?.CloudName}，所选区域：${region.RegionName}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            RegionUid: region.Uid,
            target: cloudSyncTargetMap["security-group"],
          })
          refetch()
          message.success("同步成功")
        },
      })
    } else {
      message.warning("请先选择云商和区域")
    }
  }

  return (
    <div className="flex gap-x-2">
      {contextHolder}
      <div className="w-full">
        <ProFormSelect
          label="安全组"
          name="securityGroups"
          mode="multiple"
          showSearch
          disabled={!cloud?.SupportApi}
          placeholder=""
          fieldProps={{ loading: isPending }}
          options={securityGroups?.map((securityGroup) => ({
            ...securityGroup,
            label: securityGroup.SecurityGroupName,
            value: securityGroup.Uid,
          }))}
          onChange={(_, options) =>
            form.setFieldValue("securityGroups", options)
          }
        />
      </div>
      <CloudSyncIconButton onClick={sync} />
    </div>
  )
}

function CloudTagMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form } = useHostCreateForm()

  const cloud = useWatch("cloud", form)

  const { data, isPending, refetch } = useQueryCloudTagOptions(cloud?.Uid)

  const sync = () => {
    if (cloud) {
      modal.confirm({
        title: "确定要同步云商标签吗？",
        content: `所选云商：${cloud?.CloudName}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            target: cloudSyncTargetMap["tag"],
          })
          refetch()
          message.success("同步成功")
        },
      })
    } else {
      message.warning("请先选择云商")
    }
  }

  return (
    <div className="flex gap-x-2">
      {contextHolder}
      <div className="w-full">
        <ProFormSelect
          label="云商标签"
          name="cloudTags"
          mode="multiple"
          showSearch
          disabled={!cloud?.SupportApi}
          placeholder=""
          fieldProps={{ loading: isPending }}
          options={data?.map((tag) => ({
            ...tag,
            label: `${tag.Key}:${tag.Value}`,
            value: `${tag.Key}:${tag.Value}`,
          }))}
          onChange={(_, options) => form.setFieldValue("cloudTags", options)}
          rules={[
            {
              validateTrigger: ["onBlur", "onChange"],
              message: "不能选择拥有相同Key的云商标签",
              validator: (_, value) => {
                const tags: any[] = value ?? []
                const tagKeySet = new Set<string>()
                for (const tag of tags) {
                  const key =
                    typeof tag === "string" ? tag.split(":")[0] : tag.Key
                  if (tagKeySet.has(key)) {
                    return Promise.reject()
                  } else {
                    tagKeySet.add(key)
                  }
                }
                return Promise.resolve()
              },
            },
          ]}
        />
      </div>
      <CloudSyncIconButton onClick={sync} />
    </div>
  )
}

function PasswordInput() {
  const { form } = useHostCreateForm()

  const hostType = useWatch("hostType", form)

  useEffect(() => {
    if (hostType?.DefaultLoginPassword) {
      form.setFieldValue("password", hostType.DefaultLoginPassword)
    }
  }, [hostType])

  return (
    <ProFormText.Password
      label="登录密码"
      tooltip="默认为所选主机类型配置的登录密码"
      name="password"
      placeholder=""
      rules={[
        {
          pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
          message: "不少于8个字符，至少包含数字、字母、特殊字符三种类型",
        },
      ]}
    />
  )
}

function CountInput() {
  return (
    <ProFormDigit
      label="数量"
      name="count"
      placeholder=""
      min={1}
      fieldProps={{ precision: 0 }}
      rules={[
        {
          required: true,
          message: "请输入机器数量",
        },
        {
          pattern: /^[1-9]\d*$/,
          message: "请输入正整数",
        },
      ]}
    />
  )
}

export default function HostCreateForm({
  onValuesChange,
}: {
  onValuesChange: VoidFunction
}) {
  const { form } = useHostCreateForm()

  return (
    <ProForm
      form={form}
      name="host-create"
      layout="horizontal"
      labelCol={{ style: { width: 85 } }}
      submitter={{ render: false }}
      onValuesChange={onValuesChange}
    >
      <section>
        <h3 className="mb-4 text-sm font-semibold">管理信息</h3>
        <ProFormText name="uuid" hidden />
        <ProFormText name="envId" hidden />
        <HostNameDisplay />
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <EnvSelect />
          <HostTypeSelect />
        </div>

        <ProjectSelect />

        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ResourceGroupSelect />
          <CitySelect />
        </div>

        <UsableCloudsMsg />

        <div className="gap-2 xl:grid xl:grid-cols-2">
          <OpsMultiSelect />
          <SupportMultiSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <AppMultiSelect />
          <TagListSelect />
        </div>

        <DescriptionTextArea />
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold">配置信息</h3>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <CloudSelect />
          <RegionSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ZoneSelect />
          <ImageSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <InstanceTypeSelect />
          <div className="gap-2 xl:grid xl:grid-cols-2">
            <CpuSelect />
            <MemorySelect />
          </div>
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-3">
          <InstanceChargeTypeSelect />
          <InstanceChargePeriodSelect />
          <InstanceChargeRenewFlagSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-3">
          <PublicIpAssignedSwitch />
          <InternetMaxBandwidthOutSelect />
          <InternetChargeTypeSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <SystemDiskSelect />
          <DataDiskMultiSelect />
        </div>
        <VpcSubnetMultiSelect />
        <SecurityGroupMultiSelect />
        <CloudTagMultiSelect />
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <PasswordInput />
          <CountInput />
        </div>
      </section>
    </ProForm>
  )
}
