import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import ImageTable from "./_components/image-table"

export default function Images() {
  const access = useAccess()
  const { regionUid } = useParams()

  if (!access.imagePageListApiCmdbImages) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商镜像数据"
      />
    )
  }

  return <ImageTable regionUid={regionUid!} />
}
