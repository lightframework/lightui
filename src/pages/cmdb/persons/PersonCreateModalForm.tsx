import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { PersonCreateApiCmdbPersons } from '@/services/cmdb/person';

export default function PersonCreateModalForm({
  professionUid,
  professionOptions,
  onFinish,
}: {
  professionUid: string;
  professionOptions: { label: string; value: string }[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.PersonCreateReq>
      title="人员"
      onFinish={onFinish}
      request={PersonCreateApiCmdbPersons}
      fields={[
        {
          fieldType: 'text',
          name: 'PersonId',
          label: '人员ID',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'PersonName',
          label: '人员姓名',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'Email',
          label: '邮箱',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'Mobile',
          label: '电话',
          required: true,
        },
        {
          fieldType: 'radio',
          label: '状态',
          name: 'Enabled',
          initialValue: false,
          options: [
            {
              label: '可用',
              value: true,
            },
            {
              label: '禁用',
              value: false,
            },
          ],
        },
        {
          fieldType: 'select',
          label: '人员类型',
          name: 'ProfessionIds',
          options: professionOptions,
          initialValue: [professionUid],
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
