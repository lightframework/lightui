import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { useProfessionList } from '@/contexts/list-data-context';
import { PersonCreateApiCmdbPersons } from '@/services/cmdb/person';

export default function PersonCreateModalForm({
  professionUid,
  onFinish,
}: {
  professionUid: string;
  onFinish?: VoidFunction;
}) {
  const { items: professions } = useProfessionList();

  if (!professions) return;

  const professionOptions = professions.map((item) => ({
    label: item.ProfessionName,
    value: item.Uid,
  }));

  return (
    <ModalCreateForm<API.PersonCreateReq>
      title="添加人员"
      onFinish={onFinish}
      request={PersonCreateApiCmdbPersons}
      fields={[
        {
          fieldType: 'text',
          name: 'PersonId',
          label: '人员Id',
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
          rules: [
            {
              type: 'email',
              message: '请输入正确的邮箱',
            },
          ],
        },
        {
          fieldType: 'text',
          name: 'Mobile',
          label: '电话',
          required: true,
          rules: [
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ],
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
