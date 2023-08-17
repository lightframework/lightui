import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';

export default function SecurityGroupDeleteModalForm({
  sgUid,
  sgId,
  sgName,
  onFinish,
}: {
  sgUid: string;
  sgId: string;
  sgName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<{ sgUid: string }>
      title="删除安全组"
      onFinish={onFinish}
      params={{ sgUid }}
      request={async () => {
        return { msg: '暂未实现', code: 5000 };
      }}
      hint={`${sgName}（${sgId}）`}
    />
  );
}
