import Loading from "@/components/loading"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentFlowsApiArgusIncidentsByIdflows } from "@/services/argus/incident"
import { BellOutlined, MessageOutlined, SyncOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useModel } from "@umijs/max"
import { Avatar, Button, Form, Input, Timeline } from "antd"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const DEFAULT_AVATAR =
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"

export interface IncidentFlowsProps {
  incidentId: number
}

export default function IncidentFlows({ incidentId }: IncidentFlowsProps) {
  const { data } = useQuery({
    queryKey: ["incident-flows", incidentId],
    queryFn: () =>
      incidentFlowsApiArgusIncidentsByIdflows({ id: String(incidentId) }),
  })

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser
  const avatarSrc = currentUser?.avatar || DEFAULT_AVATAR

  const flows = data?.data?.items ?? [
    {
      Comment: "comment",
      Description: "description",
      OperateTime: 1713233779,
      Operation: "发起评论",
      Operator: "lightops",
      id: 4,
    },
    {
      Description: "description",
      OperateTime: 1713233579,
      Operation: "取消认领了该故障",
      Operator: "北京捷泰国际",
      id: 1,
    },
    {
      Description: "description1",
      OperateTime: 1713233279,
      Operation: "认领了该故障",
      Operator: "北京捷泰国际",
      id: 2,
    },
    {
      Description: "description3",
      Notifications: [
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
      OperateTime: 1713231579,
      Operation: "触发了通知，详情如下",
      Operator: "系统",
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
          dot: <Avatar src={avatarSrc} alt="用户头像" />,
          children: (
            <Form className="ml-3">
              <Form.Item name="comment" noStyle>
                <Input.TextArea
                  rows={4}
                  placeholder="点击编辑内容"
                  className="border-none bg-gray-100 outline-none hover:border-none hover:bg-gray-100 focus:border-none focus:bg-gray-100 focus:shadow-none focus:outline-none"
                />
              </Form.Item>
              <div className="mt-2 flex justify-end">
                <Button htmlType="submit" type="primary">
                  评论
                </Button>
              </div>
            </Form>
          ),
        },
        ...flows.map((flow) => ({
          dot: (
            <Avatar
              icon={
                flow.Comment ? (
                  <MessageOutlined />
                ) : flow.Notifications ? (
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
                      {flow.Operator.at(0)?.toUpperCase()}
                    </Avatar>
                    <span className="font-semibold">{flow.Operator}</span>
                  </div>
                  <span>{flow.Operation}</span>
                  {/* {flow.Object &&  <span className="font-semibold">{flow.Object}</span> } */}
                  <span className="text-gray-400">
                    {dayjs(
                      toLocaleDateTimeString(
                        new Date(flow.OperateTime * 1000).toString(),
                      ),
                    ).fromNow()}
                  </span>
                </div>
                <div>
                  {toLocaleDateTimeString(
                    new Date(flow.OperateTime * 1000).toString(),
                  )}
                </div>
              </div>
              {flow.Comment && (
                <div className="my-2 space-y-1 rounded-md bg-gray-100 px-3 py-2">
                  {flow.Comment}
                </div>
              )}
              {flow.Notifications && flow.Notifications.length > 0 && (
                <div className="my-2 space-y-1 rounded-md bg-gray-100 px-3 py-2">
                  {flow.Notifications.map((notification, index) => (
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
