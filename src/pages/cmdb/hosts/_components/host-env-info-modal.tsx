import { toLocaleDateTimeString } from "@/lib/utils"
import { envReadOneApiCmdbEnvsByUid } from "@/services/cmdb/env"
import { ProDescriptions } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Modal } from "antd"

export default function HostEnvInfoModal({
  open,
  onCancel,
  env,
}: {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvOption
}) {
  const { data } = useQuery({
    queryKey: ["env-info", env?.Uid],
    queryFn: () =>
      envReadOneApiCmdbEnvsByUid({ uid: env!.Uid }).then(
        (res) => res.data as CMDB.EnvInfo,
      ),
    enabled: !!env?.Uid,
  })

  return (
    <Modal
      title="环境详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
      width={800}
    >
      <div className="max-h-[600px] overflow-y-auto">
        {data && (
          <ProDescriptions title={data.EnvName} column={2}>
            <ProDescriptions.Item label="环境名称" copyable>
              {data.EnvName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="环境UID" copyable>
              {data.Uid}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="环境ID" copyable>
              {data.EnvId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="环境Key" copyable>
              {data.EnvKey}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="官网链接" copyable span={2}>
              {data.DomainName && (
                <a href={data.DomainName} rel="noreferrer" target="_blank">
                  {data.DomainName}
                </a>
              )}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="API链接" copyable span={2}>
              {data.ApiDomainName}
            </ProDescriptions.Item>

            <ProDescriptions.Item label="运维">
              {data.Ops?.map((item) => item.PersonName).join(" ")}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="QA">
              {data.Qa?.map((item) => item.PersonName).join(" ")}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="销售">
              {data.Sale?.map((item) => item.PersonName).join(" ")}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="技术支持">
              {data.Support?.map((item) => item.PersonName).join(" ")}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="创建者">
              {data.createBy}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间">
              {toLocaleDateTimeString(data.createAt)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="更新者">
              {data.updateBy}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="更新时间">
              {toLocaleDateTimeString(data.updateAt)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="备注" span={2}>
              {data.Description}
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </div>
    </Modal>
  )
}
