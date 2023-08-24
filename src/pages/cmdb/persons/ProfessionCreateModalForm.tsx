import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { professionCreateApiCmdbProfessions } from '@/services/cmdb/profession';
import { Button } from 'antd';

export default function ProfessionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.ProfessionCreateReq>
      title="创建人员类型"
      trigger={<Button type="link">新增</Button>}
      onFinish={onFinish}
      request={professionCreateApiCmdbProfessions}
      fields={[
        {
          fieldType: 'text',
          label: '人员类型Id',
          name: 'ProfessionId',
          required: true,
        },
        {
          fieldType: 'text',
          label: '人员类型名称',
          name: 'ProfessionName',
          required: true,
        },
        {
          fieldType: 'textarea',
          label: '备注',
          name: 'Description',
        },
      ]}
    />
  );
}
