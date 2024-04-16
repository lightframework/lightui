import Loading from "@/components/loading"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentFlowsApiArgusIncidentsByIdflows } from "@/services/argus/incident"
import { BellOutlined, MessageOutlined, SyncOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useModel } from "@umijs/max"
import { Avatar, Timeline } from "antd"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Comment from "./comment"
import TopComment from "./top-comment"

dayjs.extend(relativeTime)

export interface IncidentFlowsProps {
  incidentId: number
}

export default function IncidentFlows({ incidentId }: IncidentFlowsProps) {
  const { data, refetch } = useQuery({
    queryKey: ["incident-flows", incidentId],
    queryFn: () =>
      incidentFlowsApiArgusIncidentsByIdflows({ id: String(incidentId) }),
  })

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  const flows = data?.data?.items ?? [
    {
      comment: [
        {
          author: "lightops",
          content: "1111",
          id: 1,
          parent_id: 0,
          replies: [
            {
              author: "test",
              content: "test1231",
              id: 3,
              parent_id: 1,
              replies: [
                {
                  author: "lightops",
                  content: "test12331212",
                  id: 5,
                  replies: [],
                  parent_id: 3,
                  timestamp: 1713233779,
                },
              ],
              timestamp: 1713233779,
            },
            {
              author: "test",
              content: "test1231",
              id: 4,
              parent_id: 1,
              replies: [],
              timestamp: 1713233779,
            },
          ],
          timestamp: 1713233779,
        },
        {
          author: "lightops",
          content: "2222",
          id: 2,
          parent_id: 0,
          replies: [],
          timestamp: 1713233789,
        },
      ],
      object: "",
      description: "description",
      operateTime: 1713233779,
      operation: "发起评论",
      operator: "lightops",
      id: 4,
    },
    {
      object: "",
      description: "description",
      operateTime: 1713233579,
      operation: "取消认领了该故障",
      operator: "北京捷泰国际",
      id: 1,
    },
    {
      object: "",
      description: "description1",
      operateTime: 1713233279,
      operation: "认领了该故障",
      operator: "北京捷泰国际",
      id: 2,
    },
    {
      object: "",
      description: "description3",
      notifications: [
        {
          way: "短信",
          party: "北京捷泰国际",
          times: 1,
          result: "成功",
          time: 1713231590,
        },
        {
          way: "邮件",
          party: "北京捷泰国际",
          times: 1,
          result: "失败",
          time: 1713231582,
        },
      ],
      operateTime: 1713231579,
      operation: "触发了通知，详情如下",
      operator: "系统",
      id: 3,
    },
  ]

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
      items={[
        {
          dot: (
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
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
        ...flows.map((flow) => ({
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
                        new Date(flow.operateTime * 1000).toString(),
                      ),
                    ).fromNow()}
                  </span>
                </div>
                <div>
                  {toLocaleDateTimeString(
                    new Date(flow.operateTime * 1000).toString(),
                  )}
                </div>
              </div>
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
      ]}
    />
  )
}
