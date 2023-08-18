import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';

export default function VPCDeleteModalForm({
  vpcUid,
  vpcId,
  vpcName,
  onFinish,
}: {
  vpcUid: string;
  vpcId: string;
  vpcName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.vpcDeleteApiCmdbVpcsByUidParams>
      title="删除VPC"
      onFinish={onFinish}
      params={{ uid: vpcUid }}
      request={async () => {
        return { msg: '暂未实现', code: 5000 };
      }}
      hint={`${vpcName}（${vpcId}）`}
    />
  );
}
