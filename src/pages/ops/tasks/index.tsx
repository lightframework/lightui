import PageContainer from '@/components/ui/PageContainer';
import Table from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { taskPageListApiOpsTasks } from '@/services/ops/task';
import { ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';

export default function Task() {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer>
      <Table<API.TaskInfo>
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
            key: 'createAt',
            dataIndex: 'createAt',
            ellipsis: true,
            width: TABLE_USERNAME_WIDTH,
          },
          {
            title: '创建时间',
            key: 'createBy',
            dataIndex: 'createBy',
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
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            ellipsis: true,
            width: 80,
          },
          {
            title: 'message',
            key: 'message',
            dataIndex: 'message',
            ellipsis: true,
            width: TABLE_DESC_WIDTH,
          },
          {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark',
            ellipsis: true,
            width: TABLE_DESC_WIDTH,
          },
          {
            title: '操作',
            key: 'options',
            width: 80,
            fixed: 'right',
            render: (_, row) => {
              return (
                <div className="inline-flex flex-wrap gap-1.5">
                  <Button type="link" onClick={() => message.info('暂未实现')}>
                    查看详情
                  </Button>
                </div>
              );
            },
          },
        ]}
        request={taskPageListApiOpsTasks}
      />
    </PageContainer>
  );
}
