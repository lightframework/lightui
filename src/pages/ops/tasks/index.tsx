import PageContainer from '@/components/ui/PageContainer';
import Table from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { taskPageListApiOpsTasks } from '@/services/ops/task';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';

export default function Task() {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer>
      <Table<API.InstanceTaskInfo>
        title="tmp-task"
        actionRef={tableRef}
        rowKey="id"
        search="请输入任务名称搜索"
        columns={[
          {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
            copyable: true,
            width: 100,
          },
          {
            title: '任务名称',
            key: 'taskName',
            dataIndex: 'taskName',
            copyable: true,
            width: 200,
          },
          {
            title: '创建者',
            key: 'createBy',
            dataIndex: 'createBy',
            ellipsis: true,
            width: TABLE_USERNAME_WIDTH,
          },
          {
            title: '创建时间',
            key: 'createdAt',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            width: TABLE_DATETIME_WIDTH,
          },
          {
            title: '更新者',
            key: 'updateBy',
            dataIndex: 'updateBy',
            ellipsis: true,
            width: TABLE_USERNAME_WIDTH,
          },
          {
            title: '更新时间',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            width: TABLE_DATETIME_WIDTH,
          },
          {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark',
            ellipsis: true,
            width: TABLE_DESC_WIDTH,
          },
        ]}
        request={taskPageListApiOpsTasks}
      />
    </PageContainer>
  );
}
