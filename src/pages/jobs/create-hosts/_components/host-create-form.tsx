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
  confirm?: boolean

  envUid?: string
  env?: CMDB.EnvOption

  projectUid?: string
  project?: CMDB.ProjectOption

  hostTypeUid?: string
  hostType?: CMDB.HostTypeOption

  opsUids?: string[]
  supportUids?: string[]
  description?: string

  appUids?: string[]
  apps?: CMDB.AppOption[]

  tagList?: string[]
  count?: number

  cloudUid?: string
  cloud?: CMDB.CloudUseableCloud

  cloudTagUids?: string[]
  cloudTags?: CMDB.CloudTagOption[]

  instanceTypeUid?: string
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

  regionUid?: string
  region?: CMDB.CloudUseableRegion

  zoneUid?: string
  zone?: CMDB.CloudUseableZone

  vpcSubnetUids?: { vpcUid?: string; vpcId?: string; subnetUid?: string }[]

  securityGroupUids?: string[]
  securityGroups?: CMDB.SecurityGroupOption[]

  imageUid?: string
  image?: CMDB.ImageOption

  password?: string

  instanceChargeRenewFlag?: string
  instanceChargeType?: string
  internetChargeType?: string
  publicIpAssigned?: boolean

  _resourceGroup?: string
  _cityId?: string[]
  number?: number
}

export function generateEmptyHostFormData(): HostCreateFormData {
  return {
    uuid: uuidV4(),

    vpcSubnetUids: [{}],
    count: 1,
    diskType: DEFAULT_DISK_TYPE,
    diskSize: DEFAULT_DISK_SIZE,
    instanceChargePeriod: "1",
    instanceChargeRenewFlag: DEFAULT_INSTANCE_RENEW_FLAG,
    instanceChargeType: DEFAULT_INSTANCE_CHARGE_TYPE,
    internetChargeType: DEFAULT_INTERNET_CHARGE_TYPE,
    internetMaxBandwidthOut: "200",
    publicIpAssigned: true,
    confirm: false,

    cpu: "1",
    memory: "2",

    _resourceGroup: "ops",
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
  const { form, readonly } = useHostCreateForm()
  const { data, isPending } = useQueryEnvOptions()

  const envUid = useWatch("envUid", form)

  useEffect(() => {
    form.setFieldValue("env", data?.find((item) => item.Uid === envUid))
  }, [data, envUid])

  return (
    <>
      <ProFormText name="env" hidden />
      <ProFormSelect
        label="所属环境"
        name="envUid"
        showSearch
        readonly={readonly}
        placeholder=""
        fieldProps={{ loading: isPending }}
        options={data?.map((env) => ({
          label: env.EnvName,
          value: env.Uid,
        }))}
        rules={[{ required: true, message: "请选择环境" }]}
      />
    </>
  )
}

function ProjectSelect() {
  const { form, readonly } = useHostCreateForm()
  const projectUid = useWatch("projectUid", form)

  const { data, isPending } = useQueryProjectOptions()

  useEffect(() => {
    form.setFieldValue("project", data?.find((item) => item.Uid === projectUid))
  }, [data, projectUid])

  return (
    <>
      <>
        <ProFormText name="project" hidden />
        <ProFormSelect
          label="所属项目"
          name="projectUid"
          showSearch
          readonly={readonly}
          placeholder=""
          fieldProps={{ loading: isPending }}
          options={data?.map((project) => ({
            label: `${project.ProjectName}${
              project.Project ? ` - ${project.Project}` : ""
            }`,
            value: project.Uid,
          }))}
        />
      </>
    </>
  )
}

function HostTypeSelect() {
  const { form, readonly } = useHostCreateForm()
  const hostTypeUid = useWatch("hostTypeUid", form)

  const { data, isPending } = useQueryHostTypeOptions()

  useEffect(() => {
    form.setFieldValue(
      "hostType",
      data?.find((item) => item.Uid === hostTypeUid),
    )
  }, [data, hostTypeUid])

  return (
    <>
      <ProFormText name="hostType" hidden />
      <ProFormSelect
        label="主机类型"
        name="hostTypeUid"
        showSearch
        readonly={readonly}
        placeholder=""
        fieldProps={{ loading: isPending }}
        options={data?.map((hostType) => ({
          label: hostType.HostType,
          value: hostType.Uid,
        }))}
        rules={[{ required: true, message: "请选择主机类型" }]}
      />
    </>
  )
}

function ResourceGroupSelect() {
  const { readonly } = useHostCreateForm()

  return (
    <ProFormSelect
      label="资源组"
      name="_resourceGroup"
      placeholder=""
      readonly={readonly}
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
  const { form, readonly } = useHostCreateForm()

  return (
    <>
      <ProFormText name="cityUid" hidden />
      <ProFormCascader
        name="_cityId"
        label="城市"
        readonly={readonly}
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
  const { readonly } = useHostCreateForm()
  const opsPersons = usePersonOptions("运维")

  return (
    <ProFormSelect
      label="运维"
      name="opsUids"
      mode="multiple"
      showSearch
      readonly={readonly}
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
  const { readonly } = useHostCreateForm()
  const supportPersons = usePersonOptions("技术支持")

  return (
    <ProFormSelect
      label="技术支持"
      name="supportUids"
      mode="multiple"
      readonly={readonly}
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
  const { form, readonly } = useHostCreateForm()
  const appUids = useWatch("appUids", form)

  const { data, isPending } = useQueryAppOptions()

  useEffect(() => {
    const apps = appUids?.map(
      (uid) => data?.find((item) => item.Uid === uid),
    ) as HostCreateFormData["apps"]
    form.setFieldValue("apps", apps)
  }, [data, appUids])

  return (
    <>
      <ProFormText name="apps" hidden />
      <ProFormSelect
        label="应用"
        name="appUids"
        readonly={readonly}
        mode="multiple"
        fieldProps={{ loading: isPending }}
        showSearch
        placeholder=""
        options={data?.map((app) => ({
          label: `${app.App}:${app.Version}`,
          value: app.Uid,
        }))}
      />
    </>
  )
}

function TagListSelect() {
  const { readonly } = useHostCreateForm()

  return (
    <ProFormSelect
      label="旧cmdb标签"
      name="tagList"
      mode="multiple"
      showSearch
      readonly={readonly}
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
  const { readonly } = useHostCreateForm()

  return (
    <ProFormTextArea
      label="备注"
      readonly={readonly}
      name="description"
      placeholder=""
      fieldProps={{ rows: 1 }}
    />
  )
}

function CloudSelect() {
  const { form, readonly } = useHostCreateForm()

  const cloudUid = useWatch("cloudUid", form)

  const { data, isPending } = useUsableClouds()

  // 云商默认选中第一项
  useEffect(() => {
    if (!isPending && !data?.find((item) => item.Uid === cloudUid)) {
      form.setFieldValue("cloudUid", data?.at(0)?.Uid)
    }
  }, [data])

  useEffect(() => {
    form.setFieldValue("cloud", data?.find((item) => item.Uid === cloudUid))
  }, [cloudUid, data])

  return (
    <>
      <ProFormText name="cloud" hidden />
      <ProFormSelect
        label="云商"
        name="cloudUid"
        showSearch
        readonly={readonly}
        placeholder=""
        fieldProps={{ loading: isPending }}
        options={data?.map((cloud) => ({
          label: cloud.CloudName,
          value: cloud.Uid,
        }))}
        rules={[{ required: true, message: "请选择云商" }]}
      />
    </>
  )
}

function RegionSelect() {
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const regionUid = useWatch("regionUid", form)

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

  // 区域默认选中第一项
  useEffect(() => {
    if (!isPending && !options?.find((option) => option.Uid === regionUid)) {
      form.setFieldValue("regionUid", options?.at(0)?.Uid)
    }
  }, [options])

  useEffect(() => {
    form.setFieldValue(
      "region",
      options?.find((option) => option.Uid === regionUid),
    )
  }, [regionUid, options])

  return (
    <>
      <ProFormText name="region" hidden />
      <ProFormSelect
        label="区域"
        name="regionUid"
        showSearch
        readonly={readonly}
        placeholder=""
        fieldProps={{ loading: isPending }}
        options={options}
        rules={[{ required: true, message: "请选择区域" }]}
      />
    </>
  )
}

function ZoneSelect() {
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const zoneUid = useWatch("zoneUid", form)

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

  // 可用区默认选中第一项
  useEffect(() => {
    if (!isPending && !options?.find((option) => option.Uid === zoneUid)) {
      form.setFieldValue("zoneUid", options?.at(0)?.Uid)
    }
  }, [options])

  useEffect(() => {
    form.setFieldValue(
      "zone",
      options?.find((option) => option.Uid === zoneUid),
    )
  }, [options, zoneUid])

  return (
    <>
      <ProFormText name="zone" hidden />
      <ProFormSelect
        label="可用区"
        name="zoneUid"
        showSearch
        readonly={readonly}
        placeholder=""
        fieldProps={{ loading: isPending }}
        options={options}
        rules={[{ required: true, message: "请选择可用区" }]}
      />
    </>
  )
}

function ImageSelect() {
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const hostType = useWatch("hostType", form)
  const imageUid = useWatch("imageUid", form)

  const keywords = hostType?.ImageKeyword

  const { data, isPending } = useQueryImageOptions(region?.Uid, keywords)

  const images = useMemo(
    () => data?.filter((image) => image.ImageState === "NORMAL"),
    [data],
  )

  useEffect(() => {
    if (!isPending && !images?.find((image) => image.Uid === imageUid)) {
      form.setFieldValue("imageUid", images?.at(0)?.Uid)
    }
  }, [images])

  useEffect(() => {
    form.setFieldValue("image", images?.find((item) => item.Uid === imageUid))
  }, [images, imageUid])

  return (
    <>
      <ProFormText name="image" hidden />
      <ProFormSelect
        label="镜像"
        name="imageUid"
        showSearch
        readonly={readonly}
        placeholder=""
        disabled={!cloud?.SupportApi}
        fieldProps={{ loading: isPending }}
        options={images?.map((image) => ({
          label: image.ImageName,
          value: image.Uid,
        }))}
        rules={
          cloud?.SupportApi
            ? [{ required: true, message: "请选择镜像" }]
            : undefined
        }
      />
    </>
  )
}

function InstanceTypeSelect() {
  const { form, readonly } = useHostCreateForm()

  const zone = useWatch("zone", form)
  const cloud = useWatch("cloud", form)
  const instanceTypeUid = useWatch("instanceTypeUid", form)

  const { data, isPending } = useQueryInstanceTypeOptions(zone?.Uid)

  const instanceTypes = useMemo(
    () => data?.filter((instanceType) => instanceType.Status === "SELL"),
    [data],
  )

  // 重新验证
  useEffect(() => {
    if (
      !isPending &&
      !instanceTypes?.find((item) => item.Uid === instanceTypeUid)
    ) {
      form.resetFields(["instanceTypeUid"])
    }
  }, [instanceTypes])

  useEffect(() => {
    form.setFieldValue(
      "instanceType",
      data?.find((item) => item.Uid === instanceTypeUid),
    )
  }, [data, instanceTypeUid])

  return (
    <>
      <ProFormText name="instanceType" hidden />
      <ProFormSelect
        label="资源规格"
        name="instanceTypeUid"
        showSearch
        readonly={readonly}
        placeholder=""
        disabled={!cloud?.SupportApi}
        fieldProps={{ loading: isPending }}
        options={instanceTypes?.map((instanceType) => ({
          label:
            instanceType.Cpu && instanceType.Memory
              ? `${instanceType.InstanceType}_${instanceType.Cpu}C${instanceType.Memory}G`
              : instanceType.InstanceType,
          value: instanceType.Uid,
        }))}
        rules={
          cloud?.SupportApi
            ? [{ required: true, message: "请选择资源规格" }]
            : undefined
        }
      />
    </>
  )
}

function CpuSelect() {
  const { form, readonly } = useHostCreateForm()

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
        disabled={disabled || readonly}
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
  const { form, readonly } = useHostCreateForm()

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
        disabled={disabled || readonly}
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
  const { form, readonly } = useHostCreateForm()
  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="付费方式"
      disabled={!cloud?.SupportApi}
      name="instanceChargeType"
      readonly={readonly}
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
  const { form, readonly } = useHostCreateForm()
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
        disabled={!cloud?.SupportApi || readonly}
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
  const { form, readonly } = useHostCreateForm()
  const instanceChargeType = useWatch("instanceChargeType", form)

  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="续费模式"
      name="instanceChargeRenewFlag"
      placeholder=""
      readonly={readonly}
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
  const { form, readonly } = useHostCreateForm()
  const cloud = useWatch("cloud", form)

  return (
    <ProFormSwitch
      label="绑定公网IP"
      name="publicIpAssigned"
      readonly={readonly}
      checkedChildren="是"
      unCheckedChildren="否"
      disabled={!cloud?.SupportApi}
    />
  )
}

function InternetMaxBandwidthOutSelect() {
  const { form, readonly } = useHostCreateForm()
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
        disabled={readonly}
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
  const { form, readonly } = useHostCreateForm()
  const publicIpAssigned = useWatch("publicIpAssigned", form)

  const cloud = useWatch("cloud", form)

  return (
    <ProFormSelect
      label="付费类型"
      name="internetChargeType"
      placeholder=""
      readonly={readonly}
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
  const { readonly } = useHostCreateForm()

  return (
    <div className="flex">
      <ProFormSelect
        label="系统盘"
        name="diskType"
        placeholder=""
        disabled={readonly}
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
        disabled={readonly}
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
  const { readonly } = useHostCreateForm()

  return (
    <ProFormList
      label="数据盘"
      name="dataDisks"
      readonly={readonly}
      copyIconProps={readonly ? false : undefined}
      deleteIconProps={readonly ? false : undefined}
    >
      <div className="flex">
        <ProFormSelect
          name="diskType"
          placeholder=""
          width={160}
          disabled={readonly}
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
          disabled={readonly}
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

function SubnetSelect({ index, vpcUid }: { index: number; vpcUid?: string }) {
  const { form, readonly } = useHostCreateForm()

  const zone = useWatch("zone", form)
  const cloud = useWatch("cloud", form)
  const subnetUid = useWatch(["vpcSubnetUids", index, "subnetUid"], form)

  const { data, isPending } = useQuerySubnetOptions(vpcUid)

  const subnets = useMemo(
    () =>
      data?.filter(
        (subnet) => !subnet.Zone || !zone || subnet.Zone === zone.Zone,
      ),
    [data, zone],
  )

  useEffect(() => {
    if (
      !isPending &&
      !!subnetUid &&
      !subnets?.find((subnet) => subnet.Uid === subnetUid)
    ) {
      form.resetFields([["vpcSubnetUids", index, "subnetUid"]])
    }
  }, [subnets])

  return (
    <ProFormSelect
      name="subnetUid"
      showSearch
      width={250}
      fieldProps={{
        loading: isPending,
      }}
      onChange={(v) => console.log(v)}
      disabled={!cloud?.SupportApi || readonly}
      placeholder="子网"
      options={subnets?.map((subnet) => ({
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
    />
  )
}

function VpcSelect({
  loading,
  vpcs,
  index,
}: {
  loading?: boolean
  vpcs?: { VpcName: string; Uid: string; VpcId: string }[]
  index: number
}) {
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const vpcUid = useWatch(["vpcSubnetUids", index, "vpcUid"], form)

  useEffect(() => {
    form.setFieldValue(
      ["vpcSubnetUids", index, "vpcId"],
      vpcs?.find((vpc) => vpc.Uid === vpcUid)?.VpcId,
    )
  }, [vpcUid])

  return (
    <>
      <ProFormText name="vpcId" hidden />
      <ProFormSelect
        name="vpcUid"
        showSearch
        width={250}
        fieldProps={{
          loading,
        }}
        disabled={!cloud?.SupportApi || readonly}
        placeholder={"VPC"}
        options={vpcs?.map((vpc) => ({
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
      />
    </>
  )
}

function VpcSubnetMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const vpcSubnetUids = useWatch("vpcSubnetUids", form)
  const hostType = useWatch("hostType", form)
  const keywords = hostType?.VpcKeyword

  const { data, isPending, refetch } = useQueryVpcOptions(region?.Uid, keywords)

  // 重新验证
  useEffect(() => {
    if (!isPending) {
      const filteredVpcSubnetUids = vpcSubnetUids?.filter(
        (item) => !!data?.find((vpc) => vpc.Uid === item.vpcUid),
      )

      const notFound =
        !filteredVpcSubnetUids || filteredVpcSubnetUids.length === 0

      form.setFieldValue(
        "vpcSubnetUids",
        notFound
          ? cloud?.SupportApi
            ? [{}]
            : undefined
          : filteredVpcSubnetUids,
      )
    }
  }, [data])

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
      name="vpcSubnetUids"
      readonly={readonly}
      copyIconProps={readonly ? false : undefined}
      deleteIconProps={readonly ? false : undefined}
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
        <div className={clsx("flex", readonly && "gap-x-2")}>
          {contextHolder}
          <VpcSelect loading={isPending} vpcs={data} index={index} />

          <ProFormDependency name={["vpcUid"]}>
            {({ vpcUid }) => <SubnetSelect index={index} vpcUid={vpcUid} />}
          </ProFormDependency>

          {!readonly && (
            <CloudSyncIconButton className="ml-2 mt-px" onClick={sync} />
          )}
        </div>
      )}
    </ProFormList>
  )
}

function SecurityGroupMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const region = useWatch("region", form)
  const vpcIds = useWatch("vpcSubnetUids", form)?.map((item) => item.vpcId)
  const securityGroupUids = useWatch("securityGroupUids", form)
  const hostType = useWatch("hostType", form)
  const keywords = hostType?.SecKeyword

  const { data, isPending, refetch } = useQuerySecurityGroupOptions(
    region?.Uid,
    keywords,
  )

  const securityGroups = useMemo(() => {
    console.log(vpcIds)
    if (!vpcIds || vpcIds.length === 0) return data
    return data?.filter((item) => !item.VpcId || vpcIds.includes(item.VpcId))
  }, [data, vpcIds])

  // 重新验证
  useEffect(() => {
    if (isPending) {
      const filteredSgUids = securityGroupUids?.filter(
        (uid) => !!securityGroups?.find((sg) => sg.Uid === uid),
      )
      form.setFieldValue("securityGroupUids", filteredSgUids)
    }
  }, [securityGroups])

  useEffect(() => {
    const sgs = securityGroupUids?.map(
      (uid) => securityGroups?.find((sg) => sg.Uid === uid),
    ) as HostCreateFormData["securityGroups"]
    form.setFieldValue("securityGroups", sgs)
  }, [securityGroupUids, securityGroups])

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
        <ProFormText name="securityGroups" hidden />
        <ProFormSelect
          label="安全组"
          name="securityGroupUids"
          mode="multiple"
          readonly={readonly}
          showSearch
          disabled={!cloud?.SupportApi}
          placeholder=""
          fieldProps={{ loading: isPending }}
          options={securityGroups?.map((securityGroup) => ({
            label: securityGroup.SecurityGroupName,
            value: securityGroup.Uid,
          }))}
        />
      </div>
      {!readonly && <CloudSyncIconButton onClick={sync} />}
    </div>
  )
}

function CloudTagMultiSelect() {
  const [modal, contextHolder] = useModal()
  const { form, readonly } = useHostCreateForm()

  const cloud = useWatch("cloud", form)
  const cloudTagUids = useWatch("cloudTagUids", form)

  const { data, isPending, refetch } = useQueryCloudTagOptions(cloud?.Uid)

  // 重新验证
  useEffect(() => {
    if (!isPending) {
      const filteredCloudTagUids = cloudTagUids?.filter(
        (uid) => !!data?.find((item) => item.Uid === uid),
      )
      form.setFieldValue("cloudTagUids", filteredCloudTagUids)
    }
  }, [data])

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
          name="cloudTagUids"
          mode="multiple"
          showSearch
          readonly={readonly}
          disabled={!cloud?.SupportApi}
          placeholder=""
          fieldProps={{ loading: isPending }}
          options={data?.map((tag) => ({
            label: `${tag.Key}:${tag.Value}`,
            value: tag.Uid,
          }))}
          rules={[
            {
              validateTrigger: ["onBlur", "onChange"],
              message: "不能选择拥有相同Key的云商标签",
              validator: (_, value) => {
                const tags: any[] = value ?? []
                const tagKeySet = new Set<string>()
                for (const tag of tags) {
                  const key = data?.find((item) => item.Uid === tag)?.Key
                  if (!key) {
                    continue
                  }
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
      {!readonly && <CloudSyncIconButton onClick={sync} />}
    </div>
  )
}

function PasswordInput() {
  const { form, readonly } = useHostCreateForm()

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
      readonly={readonly}
      placeholder=""
      rules={[
        {
          required: true,
          message: "请输入登录密码",
        },
        {
          pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
          message: "不少于8个字符，至少包含数字、字母、特殊字符三种类型",
        },
      ]}
    />
  )
}

function CountInput() {
  const { fromSubTask } = useHostCreateForm()

  return (
    <ProFormDigit
      label="数量"
      name="count"
      placeholder=""
      min={1}
      hidden={fromSubTask}
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

function ConfirmSwitch() {
  const { readonly } = useHostCreateForm()

  return (
    <ProFormSwitch
      name="confirm"
      label="手动确认"
      readonly={readonly}
      checkedChildren="是"
      unCheckedChildren="否"
    />
  )
}

function SubTaskNumberDisplay() {
  const { fromSubTask } = useHostCreateForm()

  return (
    <ProFormText name="number" label="序号" readonly hidden={!fromSubTask} />
  )
}

export default function HostCreateForm({
  readonly,
  onValuesChange,
}: {
  readonly?: boolean
  onValuesChange?: VoidFunction
}) {
  const { form } = useHostCreateForm()

  return (
    <ProForm
      readonly={readonly}
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
        <SubTaskNumberDisplay />
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
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ConfirmSwitch />
        </div>
      </section>
    </ProForm>
  )
}
