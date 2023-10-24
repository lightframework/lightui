import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { hosttypeUpdateApiCmdbHosttypesByUid } from '@/services/cmdb/hosttype';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default function HostTypeUpdateModalForm({
  open,
  onCancel,
  hostType,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  hostType?: CMDB.HostTypeInfo;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<CMDB.HostTypeUpdateReq>
      title="更新主机类型"
      name="host-type-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={hostType}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!hostType) return false;
        await hosttypeUpdateApiCmdbHosttypesByUid(
          { uid: hostType.Uid },
          formData,
        );
        message.success('更新成功');
        onCancel();
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="类型名称"
        name="HostType"
        placeholder=""
        rules={[{ required: true, message: '请输入主机类型名称' }]}
      />
      <ProFormText
        label="命名规则"
        name="RuleDefinition"
        placeholder=""
        rules={[{ required: true, message: '请输入命名规则' }]}
      />
      <ProFormText
        label="VPC"
        name="VpcKeyword"
        placeholder="关键字，用于创建主机时检索VPC"
      />
      <ProFormText
        label="安全组"
        name="SecKeyword"
        placeholder="关键字，用于创建主机时检索安全组"
      />
      <ProFormText
        label="镜像"
        name="ImageKeyword"
        placeholder="关键字，用于创建主机时检索镜像"
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
