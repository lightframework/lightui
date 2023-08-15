import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';

type VPCUpdateReq = {
  VpcId: string;
  VpcName: string;
  Tag: string;
  RegionUid: string;
};

type VPCUpdateParams = {
  vpcUid: string;
};

type VPCReadOneParams = {
  vpcUid: string;
};

export default function VPCUpdateModalForm({
  vpcUid,
  regionUid,
  onFinish,
}: {
  vpcUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<VPCUpdateReq, VPCUpdateParams, VPCReadOneParams>
      title="编辑VPC"
      onFinish={onFinish}
      initialParams={{
        vpcUid,
      }}
      initialRequest={async () => {
        return {
          msg: 'OK',
          code: 2000,
          data: {
            VpcId: 'orch-pop-id',
            VpcName: 'orch-pop通信',
            Tag: 'orch pop',
          },
        };
      }}
      requestParams={{
        vpcUid,
      }}
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
