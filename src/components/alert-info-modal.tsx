import { toLocaleDateTimeString } from "@/lib/utils"
import { alertReadOneRespApiArgusAlertsByHash } from "@/services/argus/alert"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { SearchOutlined } from "@ant-design/icons"
import { ProDescriptions } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Modal, Tag } from "antd"
import { useState } from "react"
import StdStringDisplayModal from "./std-string-display-modal"

export default function AlertInfoModal({
  open,
  onCancel,
  alert,
}: {
  open: boolean
  onCancel: VoidFunction
  alert?: ARGUS.Alert
}) {
  const { data } = useQuery({
    queryKey: ["alert", alert?.hash],
    queryFn: () =>
      alertReadOneRespApiArgusAlertsByHash({ hash: alert!.hash }).then(
        (res) => res.data,
      ),
    enabled: !!alert,
  })

  const { data: severityOptions } = useQuery({
    queryKey: ["dict-entries", "alert_severity_level"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_severity_level",
      }).then((res) => res.data?.items ?? []),
  })

  const [viewEvents, setViewEvents] = useState(false)

  return (
    <>
      <Modal
        title="告警详情"
        open={open}
        onCancel={onCancel}
        footer={<Button onClick={onCancel}>返回</Button>}
        width="40%"
      >
        <div className="max-h-[70dvh] overflow-y-auto">
          {data && (
            <ProDescriptions title={data.rule_name} column={1}>
              <ProDescriptions.Item label="ID">
                {data.rule_id}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="规则备注">
                {data.rule_note}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="告警级别">
                <Tag
                  color={
                    data.severity === 1
                      ? "red"
                      : data.severity === 2
                        ? "orange"
                        : "yellow"
                  }
                >
                  {severityOptions?.find(
                    (item) => item.key === String(data.severity),
                  )?.value ?? data.severity}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="事件状态">
                {data.status}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="事件">
                <Button
                  type="link"
                  size="small"
                  onClick={() => setViewEvents(true)}
                >
                  <span>{data.events?.length}</span>
                  <SearchOutlined />
                </Button>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="首次触发">
                {data.first_trigger_time
                  ? toLocaleDateTimeString(
                      new Date(data.first_trigger_time * 1000).toString(),
                    )
                  : "-"}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="末次触发">
                {data.last_sent_time
                  ? toLocaleDateTimeString(
                      new Date(data.last_sent_time * 1000).toString(),
                    )
                  : "-"}
              </ProDescriptions.Item>
            </ProDescriptions>
          )}
        </div>
      </Modal>
      <StdStringDisplayModal
        title={`${data?.rule_name} - 事件`}
        open={viewEvents}
        onCancel={() => setViewEvents(false)}
        content={JSON.stringify(
          data?.events?.map((e) => ({ ...e, medata: JSON.parse(e.medata) })) ??
            [],
        )}
      />
    </>
  )
}
