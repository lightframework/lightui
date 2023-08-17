import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';

type SGCreateReq = {
  SGId: string;
  SGName: string;
  Tag: string;
  RegionUid: string;
};

export default function SecurityGroupCreateModalForm({
  regionUid,
  onFinish,
}: {
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<SGCreateReq>
      title="创建安全组"
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
          label: '安全组Id',
          name: 'SGId',
          required: true,
        },
        {
          fieldType: 'text',
          label: '安全组名称',
          name: 'SGName',
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
