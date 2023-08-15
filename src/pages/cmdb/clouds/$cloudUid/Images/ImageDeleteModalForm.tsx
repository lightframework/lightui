import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';

export default function ImageDeleteModalForm({
  imageUid,
  imageId,
  imageName,
  onFinish,
}: {
  imageUid: string;
  imageId: string;
  imageName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<{ imageUid: string }>
      title="删除安全组"
      onFinish={onFinish}
      params={{ imageUid }}
      request={async () => {
        return { msg: '暂未实现', code: 5000 };
      }}
      hint={`${imageName}（${imageId}）`}
    />
  );
}
