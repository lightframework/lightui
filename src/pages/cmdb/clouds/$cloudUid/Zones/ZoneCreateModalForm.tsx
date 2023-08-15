import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { ZoneCreateApiCmdbZones } from '@/services/cmdb/zone';
import { Button } from 'antd';

export default function ZoneCreateModalForm({
  regionUid,
  disabled = false,
  onFinish,
}: {
  regionUid: string;
  disabled?: boolean;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.ZoneCreateReq>
      title="创建可用区"
      onFinish={onFinish}
      trigger={
        <Button type="primary" disabled={disabled}>
          新增
        </Button>
      }
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
