import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { Button } from 'antd';

type TeamCreateReq = {
  TeamId: string;
  TeamName: string;
  Description?: string;
};

export default function TeamCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<TeamCreateReq>
      title="创建团队"
      trigger={<Button type="link">新增</Button>}
      onFinish={onFinish}
      request={async () => ({
        msg: '暂未实现',
        code: 5000,
      })}
      fields={[
        { fieldType: 'text', name: 'TeamId', label: ' 团队Id', required: true },
        {
          fieldType: 'text',
          name: 'TeamName',
          label: '团队名称',
          required: true,
        },
        {
          fieldType: 'textarea',
          name: 'Description',
          label: '备注',
        },
      ]}
    />
  );
}
