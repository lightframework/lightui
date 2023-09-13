import { subTaskListApiOpsByTasksidsubtasks } from '@/services/ops/task';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import SubTaskPhaseInfo from './SubTaskPhaseInfo';
import SubTaskTable from './SubTaskTable';

export default function TaskInfoModal({
  open,
  onCancel,
  taskId,
}: {
  open: boolean;
  onCancel: VoidFunction;
  taskId?: number;
}) {
  const { data } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => subTaskListApiOpsByTasksidsubtasks({ id: String(taskId) }),
    enabled: taskId !== undefined,
  });

  const subTasks = data?.data?.list ?? [];
  const [selectedSubTask, setSelectedSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >(undefined);

  useEffect(() => {
    if (open) {
    } else {
      setSelectedSubTask(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (subTasks.length > 0 && selectedSubTask === undefined) {
      setSelectedSubTask(subTasks[0]);
    }
  }, [subTasks]);

  return (
    <Modal
      className="add-host-modal"
      open={open}
      title="任务详情"
      width="80%"
      bodyStyle={{
        paddingTop: 12,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
      onCancel={onCancel}
      footer={[
        <Button key="back" type="default" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {taskId ? (
        <div className="flex h-[calc(100vh-200px)] gap-3">
          <SubTaskTable
            tasks={subTasks}
            selectedSubTaskId={selectedSubTask?.id}
            onRowClick={setSelectedSubTask}
          />
          {selectedSubTask ? (
            <SubTaskPhaseInfo subTaskId={selectedSubTask.id} />
          ) : (
            <p className="w-full py-6 text-center text-base text-black/[0.45]">
              请先选择子任务
            </p>
          )}
        </div>
      ) : null}
    </Modal>
  );
}
