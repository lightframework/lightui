import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  vpcReadOneApiCmdbVpcsByUid,
  vpcUpdateApiCmdbVpcsByUid,
} from '@/services/cmdb/vpc';
import { ProFormList, ProFormText } from '@ant-design/pro-components';
import clsx from 'clsx';
import { useCloud } from '../../contexts/cloud-context';

export default function VPCUpdateModalForm({
  vpcUid,
  regionUid,
  tagOptions,
  onFinish,
}: {
  vpcUid: string;
  regionUid: string;
  tagOptions: { label: string; value: API.CloudTagOption['Uid'] }[];
  onFinish?: VoidFunction;
}) {
  const { cloud } = useCloud();

  return (
    <ModalUpdateForm<
      API.VpcUpdateReq,
      API.vpcUpdateApiCmdbVpcsByUidParams,
      API.vpcReadOneApiCmdbVpcsByUidParams
    >
      title="编辑VPC"
      onFinish={onFinish}
      initialParams={{
        uid: vpcUid,
      }}
      initialRequest={vpcReadOneApiCmdbVpcsByUid}
      requestParams={{
        uid: vpcUid,
      }}
      request={vpcUpdateApiCmdbVpcsByUid}
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
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: 'VPC名称',
          name: 'VpcName',
          required: true,
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'text',
          label: 'CidrBlock',
          name: 'CidrBlock',
          hidden: cloud?.SupportApi,
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
          hidden: cloud?.SupportApi,
        },
        {
          fieldType: 'select',
          label: '标签',
          name: 'CloudTagIds',
          options: tagOptions,
          hidden: cloud?.SupportApi,
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
        className={clsx(cloud?.SupportApi && 'hidden')}
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: '添加',
        }}
        copyIconProps={false}
      >
        <ProFormText key="value" name="value" />
      </ProFormList>
    </ModalUpdateForm>
  );
}
