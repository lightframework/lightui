import { taskCreateApiOpsTasks } from '@/services/ops/task';
import { Button, message } from 'antd';
import ModalCreateForm from '../ui/form/modal-form/ModalCreateForm';

export default function AddHostSubmitModalForm({
  bills,
  onFinish,
}: {
  bills: API.InstanceTaskBill[];
  onFinish?: VoidFunction;
}) {
  if (bills.length === 0) {
    return (
      <Button
        type="primary"
        onClick={() => message.warning('请先配置并添加主机')}
      >
        提交
      </Button>
    );
  }

  return (
    <ModalCreateForm<API.TaskCreateReq>
      title="提交添加主机任务"
      trigger={<Button type="primary">提交</Button>}
      request={(data) => taskCreateApiOpsTasks({ ...data, bills })}
      onFinish={onFinish}
      fields={[
        {
          fieldType: 'text',
          label: '任务名称',
          name: 'taskName',
          required: true,
        },
        {
          fieldType: 'radio',
          label: 'dryRun',
          name: 'dryRun',
          initialValue: true,
          options: [
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ],
        },
        {
          fieldType: 'textarea',
          label: '备注',
          name: 'remark',
        },
      ]}
    />
  );
}
