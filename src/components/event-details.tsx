import { toLocaleDateTimeString } from "@/lib/utils"
import { eventRequestReadOneApiArgusEventByRequestsid } from "@/services/argus/event"
import { useQuery } from "@tanstack/react-query"
import { Descriptions } from "antd"
import SyntaxHighlighter from "./syntax-highlighter"

export interface EventDetailsProps {
  id: number
}

export default function EventDetails({ id }: EventDetailsProps) {
  const { data } = useQuery({
    queryKey: ["event-details", id],
    queryFn: () =>
      eventRequestReadOneApiArgusEventByRequestsid({ id: String(id) }).then(
        (res) => res.data,
      ),
  })

  if (!data) return null

  return (
    <div>
      <Descriptions
        column={2}
        items={[
          {
            key: "id",
            label: "ID",
            children: data.id,
          },
          {
            key: "data_source_type",
            label: "数据源类型",
            children: data.data_source_type,
          },
          {
            key: "data_source",
            label: "数据源",
            children: data.data_source,
          },
          {
            key: "event_type",
            label: "事件类型",
            children: data.event_type,
          },
          {
            key: "time",
            label: "推送时间",
            children: data.timestamp
              ? toLocaleDateTimeString(
                  new Date(data.timestamp * 1000).toString(),
                )
              : "-",
          },
        ]}
      />
      {data.body && (
        <SyntaxHighlighter
          language="json"
          customStyle={{
            maxHeight: "60dvh",
          }}
          wrapLongLines
        >
          {data.body}
        </SyntaxHighlighter>
      )}
    </div>
  )
}
