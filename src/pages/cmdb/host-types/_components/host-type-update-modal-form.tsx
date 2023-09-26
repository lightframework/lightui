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
      onOpenChange={(v) => {
        if (!v) {
          onCancel();
        }
      }}
      initialValues={hostType}
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!hostType) return false;
        await hosttypeUpdateApiCmdbHosttypesByUid(
          { uid: hostType.Uid },
          formData,
        );
        message.success('更新成功');
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
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
