import {
  useQueryCloudOptions,
  useQueryRegionOptions,
  useQueryZoneOptions,
} from "@/lib/hooks/data"
import { ProFormSelect } from "@ant-design/pro-components"
import { useWatch } from "antd/es/form/Form"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect } from "react"

export default function CloudSelect() {
  const form = useFormInstance()
  const cloudUid = useWatch("CloudUid", form)
  const regionUid = useWatch("RegionUid", form)
  const zoneUid = useWatch("ZoneUid", form)

  const cloudQuery = useQueryCloudOptions()
  const regionQuery = useQueryRegionOptions(cloudUid)
  const zoneQuery = useQueryZoneOptions(regionUid)

  useEffect(() => {
    if (
      regionQuery.data &&
      !regionQuery.data.some((region) => region.Uid === regionUid)
    ) {
      form.setFieldValue("RegionUid", undefined)
      form.setFieldValue("ZoneUid", undefined)
    }
  }, [regionQuery.data, regionUid])

  useEffect(() => {
    if (
      zoneQuery.data &&
      !zoneQuery.data.some((zone) => zone.Uid === zoneUid)
    ) {
      form.setFieldValue("ZoneUid", undefined)
    }
  }, [zoneQuery.data, zoneUid])

  return (
    <>
      <ProFormSelect
        name="CloudUid"
        label="云商"
        options={cloudQuery.data?.map((cloud) => ({
          label: cloud.CloudName,
          value: cloud.Uid,
        }))}
        fieldProps={{
          loading: cloudQuery.isFetching,
        }}
        rules={[
          {
            required: true,
            message: "请选择云商",
          },
        ]}
        placeholder=""
      />

      <ProFormSelect
        name="RegionUid"
        label="区域"
        options={regionQuery.data?.map((region) => ({
          label: region.RegionName,
          value: region.Uid,
        }))}
        fieldProps={{
          loading: regionQuery.isFetching,
        }}
        rules={[
          {
            required: true,
            message: "请选择区域",
          },
        ]}
        placeholder=""
      />
      <ProFormSelect
        name="ZoneUid"
        label="可用区"
        options={zoneQuery.data?.map((zone) => ({
          label: zone.ZoneName,
          value: zone.Uid,
        }))}
        fieldProps={{
          loading: zoneQuery.isFetching,
        }}
        rules={[
          {
            required: true,
            message: "请选择可用区",
          },
        ]}
        placeholder=""
      />
    </>
  )
}
