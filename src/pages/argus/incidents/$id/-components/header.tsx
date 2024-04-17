import { dictGet, incidentProgressDict } from "@/constants/dict"
import { toLocaleDateTimeString } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { ClockCircleOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Button, Tag } from "antd"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export interface HeaderProps {
  incident: ARGUS.Incident
}

export default function Header({ incident }: HeaderProps) {
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
            color={dictGet(incident.progress, incidentProgressDict)?.color}
            icon={dictGet(incident.progress, incidentProgressDict)?.icon}
          >
            {progressOptions?.find((item) => item.key === incident.progress)
              ?.value ?? incident.progress}
          </Tag>
          <Tag>
            <span className="mr-1 text-gray-400">ID</span>
            {incident.id}
          </Tag>
          <div className="flex items-center gap-1 text-[10px]">
            <ClockCircleOutlined style={{ fontSize: 10 }} />
            {dayjs(
              toLocaleDateTimeString(
                new Date(incident.start_time * 1000).toString(),
              ),
            ).fromNow()}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="primary">认领</Button>
        <Button type="primary">关闭</Button>
        <Button>暂缓</Button>
        <Button>升级</Button>
        <Button>重新分派</Button>
        <Button>更多操作</Button>
      </div>
    </div>
  )
}
