import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';

type SGUpdateReq = {
  SGId: string;
  SGName: string;
  Tag: string;
  RegionUid: string;
};

type SGUpdateParams = {
  sgUid: string;
};

type SGReadOneParams = {
  sgUid: string;
};

export default function SecurityGroupUpdateModalForm({
  sgUid,
  regionUid,
  onFinish,
}: {
  sgUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<SGUpdateReq, SGUpdateParams, SGReadOneParams>
      title="编辑安全组"
      onFinish={onFinish}
      initialParams={{
        sgUid,
      }}
      initialRequest={async () => {
        return {
          msg: 'OK',
          code: 2000,
          data: {
            SGId: 'sec_id_1',
            SGName: '客户端访问',
            Tag: '客户端',
          },
        };
      }}
      requestParams={{
        sgUid,
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
