import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';

type VPCCreateReq = {
  VpcId: string;
  VpcName: string;
  Tag: string;
  RegionUid: string;
};

export default function VPCCreateModalForm({
  regionUid,
  onFinish,
}: {
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<VPCCreateReq>
      title="创建VPC"
      onFinish={onFinish}
      request={async () => {
        return { msg: '暂未实现', code: 5000 };
      }}
      fields={[
        {
          fieldType: 'text',
          name: 'RegionUid',
          hidden: true,
          initialValue: regionUid,
        },
        {
          fieldType: 'text',
          label: 'VPCId',
          name: 'VpcId',
          required: true,
        },
        {
          fieldType: 'text',
          label: 'VPC名称',
          name: 'VpcName',
          required: true,
        },
        {
          fieldType: 'text',
          label: '标签',
          name: 'Tag',
        },
      ]}
    />
  );
}
