import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { professionUpdateApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default function ProfessionUpdateModalForm({
  open,
  onCancel,
  profession,
  onFinish,
}: {
  open: boolean;
  onCancel: VoidFunction;
  profession?: CMDB.ProfessionOption;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<CMDB.ProfessionUpdateReq>
      title="更新人员类型"
      name="profession-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onCancel();
        }
      }}
      initialValues={profession}
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!profession) return false;

        await professionUpdateApiCmdbProfessionsByUid(
          { uid: profession.Uid },
          formData,
        );
        message.success('更新成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="类型ID"
        name="ProfessionId"
        placeholder=""
        rules={[{ required: true, message: '请输入人员类型ID' }]}
      />
      <ProFormText
        label="类型名称"
        name="ProfessionName"
        placeholder=""
        rules={[{ required: true, message: '请输入人员类型名称' }]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
