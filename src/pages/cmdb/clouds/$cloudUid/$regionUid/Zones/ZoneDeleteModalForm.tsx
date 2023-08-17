import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { zoneDeleteApiCmdbZonesByUid } from '@/services/cmdb/zone';

export default function ZoneDeleteModalForm({
  zoneUid,
  zone,
  zoneName,
  onFinish,
}: {
  zoneUid: string;
  zone?: string;
  zoneName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.zoneDeleteApiCmdbZonesByUidParams>
      title="删除可用区"
      onFinish={onFinish}
      params={{
        uid: zoneUid,
      }}
      request={zoneDeleteApiCmdbZonesByUid}
      hint={`${zoneName}（${zone}）`}
    />
  );
}
