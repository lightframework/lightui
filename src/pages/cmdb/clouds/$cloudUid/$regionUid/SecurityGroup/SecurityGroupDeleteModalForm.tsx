import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { securitygroupDeleteApiCmdbSecuritygroupsByUid } from '@/services/cmdb/securitygroup';

export default function SecurityGroupDeleteModalForm({
  securityGroupUid,
  securityGroupId,
  securityGroupName,
  onFinish,
}: {
  securityGroupUid: string;
  securityGroupId: string;
  securityGroupName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.securitygroupDeleteApiCmdbSecuritygroupsByUidParams>
      title="删除安全组"
      onFinish={onFinish}
      params={{ uid: securityGroupUid }}
      request={securitygroupDeleteApiCmdbSecuritygroupsByUid}
      hint={`${securityGroupName}（${securityGroupId}）`}
    />
  );
}
