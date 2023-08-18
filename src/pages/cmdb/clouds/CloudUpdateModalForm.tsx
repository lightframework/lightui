import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  cloudReadOneApiCmdbCloudsByUid,
  cloudUpdateApiCmdbCloudsByUid,
} from '@/services/cmdb/cloud';

export default function CloudUpdateModalForm({
  cloudUid,
  onFinish,
}: {
  cloudUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.CloudUpdateReq,
      API.cloudUpdateApiCmdbCloudsByUidParams,
      API.cloudReadOneApiCmdbCloudsByUidParams
    >
      title="编辑云商"
      onFinish={onFinish}
      initialParams={{
        uid: cloudUid,
      }}
      initialRequest={cloudReadOneApiCmdbCloudsByUid}
      requestParams={{
        uid: cloudUid,
      }}
      request={cloudUpdateApiCmdbCloudsByUid}
      fields={[
        {
          fieldType: 'text',
          label: '云商ID',
          name: 'Cloud',
          required: true,
        },
        {
          fieldType: 'text',
          label: '云商名称',
          name: 'CloudName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '官网链接',
          name: 'Website',
        },
        {
          fieldType: 'text',
          label: '云商API',
          name: 'ApiDomain',
        },
        {
          fieldType: 'radio',
          label: '支持API',
          name: 'SupportApi',
          initialValue: false,
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
          fieldType: 'text',
          label: 'SecretId',
          name: 'SecretId',
        },
        {
          fieldType: 'text',
          label: 'SecretKey',
          name: 'SecretKey',
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
