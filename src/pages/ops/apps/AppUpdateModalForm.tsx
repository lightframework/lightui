import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  appReadOneApiCmdbAppsByUid,
  appUpdateApiCmdbAppsByUid,
} from '@/services/cmdb/app';

export default function AppUpdateModalForm({
  appUid,
  onFinish,
}: {
  appUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.AppUpdateReq,
      API.appUpdateApiCmdbAppsByUidParams,
      API.appReadOneApiCmdbAppsByUidParams
    >
      title="编辑应用"
      onFinish={onFinish}
      initialParams={{ uid: appUid }}
      initialRequest={appReadOneApiCmdbAppsByUid}
      requestParams={{ uid: appUid }}
      request={appUpdateApiCmdbAppsByUid}
      fields={[
        {
          fieldType: 'text',
          name: 'App',
          label: '应用名称',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'AppType',
          label: '应用类型',
          required: true,
        },
        {
          fieldType: 'text',
          name: 'Version',
          label: '版本',
          required: true,
        },
        {
          fieldType: 'radio',
          name: 'Enabled',
          label: '状态',
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
          fieldType: 'textarea',
          name: 'Description',
          label: '描述',
        },
      ]}
    />
  );
}
