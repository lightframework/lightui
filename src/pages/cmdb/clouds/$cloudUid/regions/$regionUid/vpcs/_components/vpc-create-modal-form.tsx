import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { CIDR_BLOCK_REGEX, IPV4_REGEX } from '@/constants/regex';
import { VpcCreateApiCmdbVpcs } from '@/services/cmdb/vpc';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormList,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, Tooltip, message } from 'antd';
import { useMetaData } from '../../_lib/use-meta-data';

export default function VpcCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const { cloud, regionUid } = useMetaData();

  const button = (
    <Button
      type="primary"
      disabled={cloud?.SupportApi || !access.VpcCreateApiCmdbVpcs}
    >
      <PlusOutlined />
      新建
    </Button>
  );

  return (
    <ModalForm<CMDB.VpcCreateReq>
      title="新建VPC"
      name="zone-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        cloud?.SupportApi ? (
          <Tooltip title="该云商不支持手动添加VPC">{button}</Tooltip>
        ) : (
          button
        )
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await VpcCreateApiCmdbVpcs({
          ...formData,
          DnsServerSet: formData.DnsServerSet?.map((dns) => (dns as any).dns),
        });
        message.success('新建成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText name="RegionUid" initialValue={regionUid} hidden />
      <ProFormText
        label="ID"
        name="VpcId"
        placeholder=""
        rules={[{ required: true, message: '请输入VPCID' }]}
      />
      <ProFormText
        label="名称"
        name="VpcName"
        placeholder=""
        rules={[{ required: true, message: '请输入VPC名称' }]}
      />
      <ProFormText
        label="网段"
        name="CidrBlock"
        placeholder="如：172.29.18.0/24"
        rules={[
          { required: true, message: '请输入网段' },
          {
            pattern: CIDR_BLOCK_REGEX,
            message: '网段格式不正确，参考：172.29.18.0/24',
          },
        ]}
      />
      <ProFormSwitch label="是否默认" name="IsDefault" initialValue={false} />
      <ProFormList
        label="DNS列表"
        name="DnsServerSet"
        rules={[
          {
            message: '请输入DNS',
            validator: (_, value) => {
              if (Array.isArray(value) && value.length > 0) {
                return Promise.resolve();
              } else {
                return Promise.reject();
              }
            },
          },
        ]}
      >
        <ProFormText
          placeholder="如：183.60.83.19"
          name="dns"
          rules={[
            {
              pattern: IPV4_REGEX,
              message: 'IPv4地址格式不正确',
            },
          ]}
        />
      </ProFormList>
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
