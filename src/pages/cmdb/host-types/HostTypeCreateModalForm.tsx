import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { hosttypeCreateApiCmdbHosttypes } from '@/services/cmdb/hosttype';

export default function HostTypeCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.HostTypeCreateReq>
      title="创建主机类型"
      request={hosttypeCreateApiCmdbHosttypes}
      onFinish={onFinish}
      fields={[
        {
          fieldType: 'text',
          label: '类型名称',
          name: 'HostType',
          required: true,
        },
        {
          fieldType: 'text',
          label: '规则定义',
          name: 'RuleDefinition',
          required: true,
        },
        {
          fieldType: 'textarea',
          label: '描述',
          name: 'Description',
        },
      ]}
    />
  );
}
