import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { ZoneCreateApiCmdbZones } from '@/services/cmdb/zone';

export default function ZoneCreateModalForm({
  regionUid,
  onFinish,
}: {
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.ZoneCreateReq>
      title="创建可用区"
      onFinish={onFinish}
      request={ZoneCreateApiCmdbZones}
      fields={[
        {
          fieldType: 'text',
          name: 'RegionUid',
          hidden: true,
          initialValue: regionUid,
        },
        {
          fieldType: 'text',
          label: '可用区ID',
          name: 'Zone',
          required: true,
        },
        {
          fieldType: 'text',
          label: '可用区名称',
          name: 'ZoneName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '可用区状态',
          name: 'ZoneState',
        },
      ]}
    />
  );
}
