import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { professionCreateApiCmdbProfessions } from '@/services/cmdb/profession';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function ProfessionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalCreateForm<API.ProfessionCreateReq>
      title="创建人员类型"
      trigger={
        <Button
          type="link"
          disabled={!(access as any).professionCreateApiCmdbProfessions}
        >
          新增
        </Button>
      }
      onFinish={onFinish}
      request={professionCreateApiCmdbProfessions}
      fields={[
        {
          fieldType: 'text',
          label: '类型Id',
          name: 'ProfessionId',
          required: true,
        },
        {
          fieldType: 'text',
          label: '类型名称',
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
