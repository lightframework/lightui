import {
  phaseRunApiOpsByPhasesid,
  subTaskPhaseListApiOpsBySubtasksidphases,
} from '@/services/ops/task';
import { SearchOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Button, message } from 'antd';
import { useState } from 'react';
import JsonDisplayModal from './JsonDisplayModal';

export default function SubTaskPhaseInfo({ subTaskId }: { subTaskId: number }) {
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
    <div className="w-1/2 overflow-y-auto px-3 pb-3">
      {phases.map((phase, index) => (
        <ProDescriptions
          key={phase.id}
          title={`${index + 1}. ${phase.name}`}
          className="space-y-3"
          column={{
            md: 1,
            xl: 3,
          }}
          extra={
            phase.status !== 'Initial' &&
            phase.status !== 'Pending' &&
            phase.status !== 'Success' && (
              <Button
                type="primary"
                onClick={async () => {
                  const { msg } = await phaseRunApiOpsByPhasesid({
                    id: String(phase.id),
                  });

                  if (msg === 'OK') {
                    message.success('已重试');
                  } else {
                    message.error(msg);
                  }
                  refetch();
                }}
              >
                重试
              </Button>
            )
          }
        >
          <ProDescriptions.Item label="执行次数">
            {phase.runTimes}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="执行时间" valueType="dateTime">
            {phase.execAt}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="当前状态"
            contentStyle={{
              color: phase.status === 'Initial' ? 'gray' : undefined,
            }}
          >
            {phase.status}
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
      ))}

      {phases.every((phase) => phase.status === 'Success') && (
        <div className="text-green-400">已完成</div>
      )}

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
        title={`${selectedStdinPhase?.name} - 标准输出`}
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
