import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  personReadOneApiCmdbPersonsByUid,
  personUpdateApiCmdbPersonsByUid,
} from '@/services/cmdb/person';

export default function PersonUpdateModalForm({
  personUid,
  professionOptions,
  onFinish,
}: {
  personUid: string;
  professionOptions: { label: string; value: string }[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.PersonUpdateReq,
      API.personUpdateApiCmdbPersonsByUidParams,
      API.personReadOneApiCmdbPersonsByUidParams
    >
      title="人员"
      onFinish={onFinish}
      initialParams={{ uid: personUid }}
      initialRequest={personReadOneApiCmdbPersonsByUid}
      requestParams={{ uid: personUid }}
      request={personUpdateApiCmdbPersonsByUid}
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
