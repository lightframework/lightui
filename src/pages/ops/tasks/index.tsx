import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { taskStatusDict, taskTypeDict } from '@/constants/enums';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { taskPageListApiOpsTasks } from '@/services/ops/task';
import { ActionType } from '@ant-design/pro-components';
import { history, useAccess } from '@umijs/max';
import { Button, Result, Select, Tag } from 'antd';
import { useRef, useState } from 'react';
import TaskInfoModal from './TaskInfoModal';

function TaskTypeSelect({ onChange }: { onChange: (type: string) => void }) {
  return (
    <Select
      allowClear
      placeholder="选择类型"
      style={{ width: 150 }}
      options={Object.entries(taskTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      onChange={onChange}
    />
  );
}

function TaskStatusSelect({ onChange }: { onChange: (type: string) => void }) {
  return (
    <Select
      allowClear
      placeholder="选择状态"
      style={{ width: 150 }}
      options={Object.entries(taskStatusDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      onChange={onChange}
    />
  );
}

export default function Tasks() {
  const [selectedViewTask, setSelectedViewTask] = useState<
    OPS.TaskInfo | undefined
  >(undefined);
  const access = useAccess();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    updateBy: { show: false },
    id: { show: false },
    message: { show: false },
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
      width: 80,
      renderText: (text) => taskStatusDict[text] ?? text,
    },
    {
      title: '进度',
      key: 'progress',
      width: 220,
      render: (_, row) => (
        <div>
          <span>成功：{row.success}，</span>
          <span>失败：{row.failed}，</span>
          <span>总计：{row.count}</span>
        </div>
      ),
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
      title: '消息',
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
      width: 100,
      fixed: 'right',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={() => setSelectedViewTask(row)}
              disabled={!(access as any).subTaskListApiOpsByTasksidsubtasks}
            >
              查看详情
            </Button>
          </div>
        );
      },
    },
  ];

  if (!(access as any).taskPageListApiOpsTasks) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问任务数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <PageContainer>
      <Table<OPS.TaskInfo, OPS.taskPageListApiOpsTasksParams>
        title="tasks"
        actionRef={tableRef}
        rowKey="id"
        columns={columns}
        params={{
          type: selectedType,
          status: selectedStatus,
        }}
        search="请输入任务名称搜索"
        request={taskPageListApiOpsTasks}
        columnsConfig={columnsConfig}
        extraSearchRender={
          <div className="flex gap-x-1">
            <TaskTypeSelect onChange={setSelectedType} />
            <TaskStatusSelect onChange={setSelectedStatus} />
          </div>
        }
      />
      <TaskInfoModal
        open={selectedViewTask !== undefined}
        onCancel={() => setSelectedViewTask(undefined)}
        taskId={selectedViewTask?.id}
      />
    </PageContainer>
  );
}
