import { toLocaleDateTimeString } from "@/lib/utils"
import { MessageOutlined } from "@ant-design/icons"
import { useAccess } from "@umijs/max"
import { Avatar, Button, Tooltip } from "antd"
import clsx from "clsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState } from "react"
import TopComment from "./top-comment"

dayjs.extend(relativeTime)

export interface CommentProps {
  incidentId: number
  rootAuthor: string
  comment: ARGUS.Comment
  onReplyFinish?: VoidFunction
}

export default function Comment({
  incidentId,
  rootAuthor,
  comment,
  onReplyFinish,
}: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const access = useAccess()

  return (
    <div
      key={comment.id}
      className={clsx("mb-2 space-y-2", comment.parent_id && "ml-6")}
    >
      <div className="flex items-center gap-2">
        <Avatar
          size="small"
          style={
            rootAuthor === comment.author
              ? { backgroundColor: "#fde3cf", color: "#f56a00" }
              : { backgroundColor: "#87d068" }
          }
        >
          {comment.author.at(0)?.toUpperCase()}
        </Avatar>
        <span>{comment.author}</span>

        <span className="text-gray-400">
          {toLocaleDateTimeString(
            new Date(comment.timestamp * 1000).toString(),
          )}
          （
          {dayjs(
            toLocaleDateTimeString(
              new Date(comment.timestamp * 1000).toString(),
            ),
          ).fromNow()}
          ）
        </span>
        {!!comment.parent_id && comment.author === rootAuthor && (
          <span>回复</span>
        )}
        <Tooltip title="回复">
          <Button
            icon={<MessageOutlined />}
            type="text"
            className="text-gray-400"
            disabled={!access.incidentCommentApiArgusIncidentsByIdcomments}
            onClick={() => setShowReplyForm((prev) => !prev)}
          />
        </Tooltip>
      </div>
      <div className="ml-7">{comment.content}</div>
      {showReplyForm && (
        <TopComment
          incidentId={incidentId}
          onFinish={() => {
            onReplyFinish?.()
            setShowReplyForm(false)
          }}
          onClose={() => setShowReplyForm(false)}
          parentId={comment.id}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              rootAuthor={rootAuthor}
              incidentId={incidentId}
              onReplyFinish={onReplyFinish}
              comment={reply}
            />
          ))}
        </div>
      )}
    </div>
  )
}
