import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { professionCreateApiCmdbProfessions } from '@/services/cmdb/profession';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function ProfessionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalForm<CMDB.ProfessionCreateReq>
      title="创建人员类型"
      name="profession-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="link"
          disabled={!access.professionCreateApiCmdbProfessions}
        >
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await professionCreateApiCmdbProfessions(formData);
        message.success('创建成功');
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
