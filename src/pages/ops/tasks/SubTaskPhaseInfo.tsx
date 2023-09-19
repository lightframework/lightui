import {
  phaseRunApiOpsByPhasesid,
  subTaskPhaseListApiOpsBySubtasksidphases,
} from '@/services/ops/task';
import {
  ExclamationCircleFilled,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Button, Modal, Tag, Timeline, Tooltip, message } from 'antd';
import { useState } from 'react';
import JsonDisplayModal from './JsonDisplayModal';

export default function SubTaskPhaseInfo({ subTaskId }: { subTaskId: number }) {
  const access = useAccess();
  const [modal, contextHolder] = Modal.useModal();

  const { data: phases, refetch } = useQuery({
    queryKey: ['sub-task-phase', subTaskId],
    queryFn: () =>
      subTaskPhaseListApiOpsBySubtasksidphases({ id: String(subTaskId) }).then(
        (res) => res.data?.list,
      ),
  });

  const [selectedStdinPhase, setSelectedStdinPhase] = useState<
    OPS.PhaseInfo | undefined
  >(undefined);
  const [selectedStdoutPhase, setSelectedStdoutPhase] = useState<
    OPS.PhaseInfo | undefined
  >(undefined);

  if (!phases) return null;

  return (
    <div className="relative w-1/2 overflow-y-auto px-3 pb-3">
      <div className="sticky top-0 z-50 mb-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-x-3">
          <h3 className="mb-0 text-sm font-semibold">子任务执行步骤 </h3>

          {phases.every((phase) => phase.status === 'Success') && (
            <Tag color="#87d068">已完成</Tag>
          )}
        </div>

        <Tooltip title="刷新">
          <Button
            type="default"
            icon={<RedoOutlined className="-rotate-90" />}
            onClick={async () => {
              await refetch();
              message.success('刷新成功');
            }}
          />
        </Tooltip>
      </div>

      <Timeline
        items={phases.map((phase, index) => ({
          color:
            phase.status === 'Compleated'
              ? 'green'
              : phase.status === 'Failed'
              ? 'red'
              : 'blue',
          children: (
            <ProDescriptions
              key={phase.id}
              title={`${index + 1}. ${phase.name}`}
              className="space-y-3"
              column={{
                md: 1,
                xl: 2,
              }}
              extra={
                <div className="flex gap-x-1">
                  {contextHolder}
                  {phase.retry && (
                    <Button
                      type="primary"
                      disabled={!(access as any).phaseRunApiOpsByPhasesid}
                      onClick={() => {
                        modal.confirm({
                          title: `确定要重试${phase.name}？`,
                          icon: <ExclamationCircleFilled />,
                          onOk: async () => {
                            const { msg } = await phaseRunApiOpsByPhasesid({
                              id: String(phase.id),
                            });

                            if (msg === 'OK') {
                              message.success('已重试');
                            } else {
                              message.error(msg);
                            }
                            refetch();
                          },
                        });
                      }}
                    >
                      重试
                    </Button>
                  )}

                  {phase.confirm && (
                    <Button
                      type="primary"
                      onClick={() => message.info('暂未实现')}
                    >
                      确认
                    </Button>
                  )}
                </div>
              }
            >
              <ProDescriptions.Item label="执行次数">
                {phase.runTimes}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="当前状态"
                contentStyle={{
                  color: phase.status === 'Initial' ? 'gray' : undefined,
                }}
              >
                {phase.status}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="开始时间" valueType="dateTime">
                {phase.started}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="结束时间" valueType="dateTime">
                {phase.finished}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="标准输入">
                <Button
                  type="link"
                  className="!h-auto !p-0"
                  onClick={() => setSelectedStdinPhase(phase)}
                >
                  <span>查看</span>
                  <SearchOutlined />
                </Button>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="标准输出" span={2}>
                <Button
                  type="link"
                  className="!h-auto !p-0"
                  onClick={() => setSelectedStdoutPhase(phase)}
                >
                  <span>查看</span>
                  <SearchOutlined />
                </Button>
              </ProDescriptions.Item>
              {phase.message !== '' && (
                <ProDescriptions.Item
                  label="消息"
                  contentStyle={{ color: 'red' }}
                  span={3}
                >
                  {phase.message}
                </ProDescriptions.Item>
              )}
            </ProDescriptions>
          ),
        }))}
      />

      <JsonDisplayModal
        title={`${selectedStdinPhase?.name} - 标准输入`}
        open={selectedStdinPhase !== undefined}
        onCancel={() => setSelectedStdinPhase(undefined)}
        content={
          typeof selectedStdinPhase?.stdin === 'string' &&
          selectedStdinPhase.stdin !== ''
            ? JSON.parse(selectedStdinPhase.stdin)
            : {}
        }
      />

      <JsonDisplayModal
        title={`${selectedStdoutPhase?.name} - 标准输出`}
        open={selectedStdoutPhase !== undefined}
        onCancel={() => setSelectedStdoutPhase(undefined)}
        content={
          typeof selectedStdoutPhase?.stdout === 'string' &&
          selectedStdoutPhase.stdout !== ''
            ? JSON.parse(selectedStdoutPhase.stdout)
            : {}
        }
      />
    </div>
  );
}
