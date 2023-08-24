import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { Button } from 'antd';

export default function TeamCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm
      title="创建团队"
      trigger={<Button type="link">新增</Button>}
      onFinish={onFinish}
      request={async () => ({
        msg: '暂未实现',
        code: 5000,
      })}
      fields={[
        {
          fieldType: 'text',
          name: 'name',
          label: '团队名称',
          required: true,
        },
        {
          fieldType: 'textarea',
          name: 'info',
          label: '描述',
        },
      ]}
    />
  );
}
