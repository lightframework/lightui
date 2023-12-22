import { toLocaleDateTimeString } from "@/lib/utils"
import { projectReadOneApiCmdbProjectsByUid } from "@/services/cmdb/project"
import { ProDescriptions } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Modal } from "antd"

export default function HostProjectInfoModal({
  open,
  onCancel,
  project,
}: {
  open: boolean
  onCancel: VoidFunction
  project?: CMDB.ProjectOption
}) {
  const { data } = useQuery({
    queryKey: ["project-info", project?.Uid],
    queryFn: () =>
      projectReadOneApiCmdbProjectsByUid({ uid: project!.Uid }).then(
        (res) => res.data as CMDB.ProjectInfo,
      ),
    enabled: !!project?.Uid,
  })

  return (
    <Modal
      title="项目详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
      width={800}
    >
      <div className="max-h-[600px] overflow-y-auto">
        {data && (
          <ProDescriptions title={data.ProjectName} column={2}>
            <ProDescriptions.Item label="项目名称" copyable span={2}>
              {data.ProjectName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="项目ID" copyable>
              {data.Project}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="CustomerID" copyable>
              {data.CusId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="最终客户" copyable>
              {data.Client}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="销售">
              {data.Sale}
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
          </ProDescriptions>
        )}
      </div>
    </Modal>
  )
}
