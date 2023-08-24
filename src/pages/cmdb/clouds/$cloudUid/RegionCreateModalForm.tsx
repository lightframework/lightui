import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { RegionCreateApiCmdbRegions } from '@/services/cmdb/region';
import { Button } from 'antd';
import { useCloud } from './contexts/cloud-context';

export default function RegionCreateModalForm({
  cloudUid,
  onFinish,
}: {
  cloudUid: string;

  onFinish?: VoidFunction;
}) {
  const { cloud } = useCloud();

  return (
    <ModalCreateForm<API.RegionCreateReq>
      title="创建区域"
      trigger={
        <Button type="link" disabled={cloud?.SupportApi}>
          新增
        </Button>
      }
      onFinish={onFinish}
      request={RegionCreateApiCmdbRegions}
      fields={[
        {
          fieldType: 'text',
          name: 'CloudUid',
          initialValue: cloudUid,
          hidden: true,
        },
        {
          fieldType: 'text',
          label: '区域Id',
          name: 'Region',
          required: true,
        },
        {
          fieldType: 'text',
          label: '区域名称',
          name: 'RegionName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '区域状态',
          name: 'RegionState',
        },
      ]}
    />
  );
}
