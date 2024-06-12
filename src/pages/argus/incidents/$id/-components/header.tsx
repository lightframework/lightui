import { dictGet, incidentProgressDict } from "@/constants/dict"
import { toLocaleDateTimeString } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { incidentClaimApiArgusIncidentsClaim } from "@/services/argus/incident"
import { ClockCircleOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRefreshIncident } from "../-hooks"
import IncidentRegionModalForm from "../../-components/incident-resign-modal-form"

dayjs.extend(relativeTime)

export interface HeaderProps {
  incident: ARGUS.Incident
}

export default function Header({ incident }: HeaderProps) {
  const [modal, contextHolder] = useModal()
  const access = useAccess()
  const refreshIncident = useRefreshIncident()

  const { data: progressOptions } = useQuery({
    queryKey: ["dict-entries", "incident_progress"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_progress",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: severityOptions } = useQuery({
    queryKey: ["dict-entries", "incident_severity_level"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_severity_level",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold">{incident.title}</div>
        <div className="mt-2 flex items-center gap-0.5">
          <Tag
            color={
              incident.severity === 1
                ? "red"
                : incident.severity === 2
                  ? "orange"
                  : "yellow"
            }
          >
            {severityOptions?.find(
              (item) => item.key === String(incident.severity),
            )?.value ?? incident.severity}
          </Tag>
          <Tag
            color={dictGet(incident.status, incidentProgressDict)?.color}
            icon={dictGet(incident.status, incidentProgressDict)?.icon}
          >
            {progressOptions?.find((item) => item.key === incident.status)
              ?.value ?? incident.status}
          </Tag>
          <Tag>
            <span className="mr-1 text-gray-400">ID</span>
            {incident.id}
          </Tag>
          <div className="flex items-center gap-1 text-[10px]">
            <ClockCircleOutlined style={{ fontSize: 10 }} />
            {dayjs(
              toLocaleDateTimeString(
                new Date(incident.created_time * 1000).toString(),
              ),
            ).fromNow()}
          </div>
        </div>
      </div>

      {contextHolder}

      <div className="flex items-center gap-2">
        <Button
          type="primary"
          disabled={!access.incidentClaimApiArgusIncidentsClaim}
          onClick={() => {
            modal.confirm({
              title: "确定要认领该故障吗？",
              onOk: async () => {
                await incidentClaimApiArgusIncidentsClaim({
                  ids: [incident.id],
                })
                message.success("认领成功")
                refreshIncident()
              },
            })
          }}
        >
          认领
        </Button>
        <IncidentRegionModalForm
          ids={[incident.id]}
          onFinish={() => {
            refreshIncident()
          }}
        />
      </div>
    </div>
  )
}
