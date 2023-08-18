import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { ProFormList, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCloud } from '../../contexts/cloud-context';

export default function VPCCreateModalForm({
  regionUid,
  tagOptions,
  onFinish,
}: {
  regionUid: string;
  tagOptions: { label: string; value: API.CloudTagOption['Uid'] }[];
  onFinish?: VoidFunction;
}) {
  const { cloud } = useCloud();

  return (
    <ModalCreateForm<API.VpcCreateReq>
      title="创建VPC"
      onFinish={onFinish}
      trigger={
        <Button type="primary" disabled={cloud?.SupportApi}>
          新增
        </Button>
      }
      request={async (data) => {
        console.log({
          ...data,
          DnsServerSet: data.DnsServerSet?.map(
            (item) => (item as unknown as { value: string }).value,
          ),
        });
        return { msg: 'test', code: 2000 };
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
          label: 'CidrBlock',
          name: 'CidrBlock',
        },
        {
          fieldType: 'radio',
          label: 'IsDefault',
          name: 'IsDefault',
          initialValue: false,
          options: [
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ],
        },
        {
          fieldType: 'select',
          label: '标签',
          name: 'CloudTagIds',
          options: tagOptions,
        },
        {
          fieldType: 'textarea',
          label: '备注',
          name: 'Description',
        },
      ]}
    >
      <ProFormList
        label="DnsServerSet"
        name="DnsServerSet"
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: '添加',
        }}
        copyIconProps={false}
      >
        <ProFormText key="value" name="value" />
      </ProFormList>
    </ModalCreateForm>
  );
}
