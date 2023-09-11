import { TableColumns } from '@/components/ui/Table';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import JsonDisplayModal from './JsonDisplayModal';

export default function SubTaskTable({
  tasks,
  selectedSubTaskId,
  onRowClick,
}: {
  tasks: OPS.SubTaskInfo[];
  selectedSubTaskId?: number;
  onRowClick: (task: OPS.SubTaskInfo) => void;
}) {
  const [selectedStdinTask, setSelectedStdinTask] = useState<
    OPS.SubTaskInfo | undefined
  >(undefined);
  const [selectedStdoutTask, setSelectedStdoutTask] = useState<
    OPS.SubTaskInfo | undefined
  >(undefined);

  const columns: TableColumns<OPS.SubTaskInfo> = [
    {
      title: 'uuid',
      key: 'uuid',
      dataIndex: 'uuid',
      width: 250,
    },
    { title: ' id', key: 'id', dataIndex: 'id', width: 100 },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    { title: '状态', key: 'status', dataIndex: 'status', width: 100 },
    {
      title: '消息',
      key: 'message',
      dataIndex: 'message',
      width: 250,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'options',
      width: 200,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStdinTask(row);
              }}
            >
              标准输入
            </Button>
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStdoutTask(row);
              }}
            >
              标准输出
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-1/2 shrink-0">
      <ProTable
        className="env-add-host-table"
        columns={columns}
        rowKey="id"
        dataSource={tasks}
        onRow={(row) => ({
          onClick: () => onRowClick(row),
        })}
        rowClassName={(row) =>
          row.id === selectedSubTaskId
            ? 'selected-host-row cursor-pointer'
            : 'cursor-pointer'
        }
        columnsState={{ value: { uuid: { show: false }, id: { show: false } } }}
      />

      <JsonDisplayModal
        title={`${selectedStdinTask?.name} - 标准输入`}
        open={selectedStdinTask !== undefined}
        onCancel={() => setSelectedStdinTask(undefined)}
        content={
          typeof selectedStdinTask?.stdin === 'string' &&
          selectedStdinTask.stdin !== ''
            ? JSON.parse(selectedStdinTask.stdin)
            : {}
        }
      />

      <JsonDisplayModal
        title={`${selectedStdoutTask?.name} - 标准输出`}
        open={selectedStdoutTask !== undefined}
        onCancel={() => setSelectedStdoutTask(undefined)}
        content={
          typeof selectedStdoutTask?.stdout === 'string' &&
          selectedStdoutTask.stdout !== ''
            ? JSON.parse(selectedStdoutTask.stdout)
            : {}
        }
      />
    </div>
  );
}
