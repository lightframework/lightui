import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  zoneReadOneApiCmdbZonesByUid,
  zoneUpdateApiCmdbZonesByUid,
} from '@/services/cmdb/zone';

export default function ZoneUpdateModalForm({
  zoneUid,
  regionUid,
  onFinish,
}: {
  zoneUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.ZoneUpdateReq,
      API.zoneUpdateApiCmdbZonesByUidParams,
      API.zoneReadOneApiCmdbZonesByUidParams
    >
      title="编辑可用区"
      onFinish={onFinish}
      initialParams={{
        uid: zoneUid,
      }}
      initialRequest={zoneReadOneApiCmdbZonesByUid}
      requestParams={{
        uid: zoneUid,
      }}
      request={zoneUpdateApiCmdbZonesByUid}
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
