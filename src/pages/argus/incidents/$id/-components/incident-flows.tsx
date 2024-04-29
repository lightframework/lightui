import Loading from "@/components/loading"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentFlowsApiArgusIncidentsByIdflows } from "@/services/argus/incident"
import { BellOutlined, MessageOutlined, SyncOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import { Avatar, Timeline } from "antd"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Comment from "./comment"
import TopComment from "./top-comment"

dayjs.extend(relativeTime)

export interface IncidentFlowsProps {
  incidentId: number
  refetchInterval?: false | number
}

export default function IncidentFlows({
  incidentId,
  refetchInterval,
}: IncidentFlowsProps) {
  const access = useAccess()
  const { data, refetch } = useQuery({
    queryKey: ["incident-flows", incidentId],
    queryFn: () =>
      incidentFlowsApiArgusIncidentsByIdflows({ id: String(incidentId) }),
    refetchInterval,
  })

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  const flows = data?.data?.items ?? []

  if (!data) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    )
  }

  return (
    <Timeline
      className="my-3 px-2"
      items={(access.incidentCommentApiArgusIncidentsByIdcomments
        ? [
            {
              dot: (
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {currentUser?.username?.at(0)?.toUpperCase()}
                </Avatar>
              ),
              children: (
                <TopComment
                  incidentId={incidentId}
                  onFinish={() => refetch()}
                  grayBg
                />
              ),
            },
          ]
        : []
      ).concat(
        flows.map((flow) => ({
          dot: (
            <Avatar
              icon={
                flow.comment ? (
                  <MessageOutlined />
                ) : flow.notifications ? (
                  <BellOutlined />
                ) : (
                  <SyncOutlined />
                )
              }
            />
          ),
          children: (
            <div className="ml-3 min-h-[40px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Avatar
                      style={{ backgroundColor: "#87d068", fontSize: 10 }}
                      size="small"
                    >
                      {flow.operator.at(0)?.toUpperCase()}
                    </Avatar>
                    <span className="font-semibold">{flow.operator}</span>
                  </div>
                  <span>{flow.operation}</span>
                  {flow.object && (
                    <span className="font-semibold">{flow.object}</span>
                  )}
                  <span className="text-gray-400">
                    {dayjs(
                      toLocaleDateTimeString(
                        new Date(flow.timestamp * 1000).toString(),
                      ),
                    ).fromNow()}
                  </span>
                </div>
                <div>
                  {toLocaleDateTimeString(
                    new Date(flow.timestamp * 1000).toString(),
                  )}
                </div>
              </div>
              {flow.description && (
                <div className="my-2 rounded-md bg-gray-100 px-3 py-2">
                  {flow.description}
                </div>
              )}
              {flow.comment && (
                <div className="my-2 rounded-md bg-gray-100 px-3 py-2">
                  {flow.comment.map((c) => (
                    <Comment
                      key={c.id}
                      incidentId={incidentId}
                      rootAuthor={flow.operator}
                      comment={c}
                      onReplyFinish={() => refetch()}
                    />
                  ))}
                </div>
              )}
              {flow.notifications && flow.notifications.length > 0 && (
                <div className="my-2 space-y-1 rounded-md bg-gray-100 px-3 py-2">
                  {flow.notifications.map((notification, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-20 font-semibold">
                        {notification.way}
                      </span>
                      <span className="mr-2 text-gray-400">通知到</span>
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                          fontSize: 10,
                          marginRight: 4,
                        }}
                        size="small"
                      >
                        {notification.party.at(0)?.toUpperCase()}
                      </Avatar>
                      <span
                        className={
                          notification.result === "失败"
                            ? "text-gray-400"
                            : undefined
                        }
                      >
                        {notification.party}
                      </span>
                      {notification.result === "失败" && (
                        <span className="text-gray-400">
                          （{notification.result}）
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        })),
      )}
    />
  )
}
