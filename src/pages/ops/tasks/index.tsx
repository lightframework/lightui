import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { taskPageListApiOpsTasks } from '@/services/ops/task';
import { ActionType } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useRef, useState } from 'react';
import TaskInfoModal from './TaskInfoModal';

export default function Tasks() {
  const [selectedViewTask, setSelectedViewTask] = useState<
    OPS.TaskInfo | undefined
  >(undefined);

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    updateBy: { show: false },
    id: { show: false },
  };

  const columns: TableColumns<OPS.TaskInfo> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '任务名称',
      key: 'name',
      dataIndex: 'name',
      width: 200,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '任务类型',
      key: 'type',
      dataIndex: 'type',
      width: 100,
      render: (_, row) =>
        row.type !== '' ? (
          <Tag color={row.type === 'CreateHost' ? '#87d068' : '#f50'}>
            {row.type === 'CreateHost'
              ? '创建主机'
              : row.type === 'DestroyHost'
              ? '销毁主机'
              : row.type}
          </Tag>
        ) : (
          '-'
        ),
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 100,
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
    {
      title: '操作',
      key: 'options',
      width: 80,
      fixed: 'right',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link" onClick={() => setSelectedViewTask(row)}>
              查看详情
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table<OPS.TaskInfo>
        title="tasks"
        actionRef={tableRef}
        rowKey="id"
        columns={columns}
        search="请输入任务名称搜索"
        request={taskPageListApiOpsTasks}
        columnsConfig={columnsConfig}
      />
      <TaskInfoModal
        open={selectedViewTask !== undefined}
        onCancel={() => setSelectedViewTask(undefined)}
        taskId={selectedViewTask?.id}
      />
    </PageContainer>
  );
}
