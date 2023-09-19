import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { appCreateApiCmdbApps } from '@/services/cmdb/app';
import {
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function AppCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalCreateForm<API.AppCreateReq>
      title="创建应用"
      trigger={
        <Button type="primary" disabled={!(access as any).appCreateApiCmdbApps}>
          新增
        </Button>
      }
      onFinish={onFinish}
      request={appCreateApiCmdbApps}
    >
      <ProFormText
        label="应用名称"
        name="App"
        placeholder=""
        rules={[{ required: true, message: '请输入应用名称' }]}
      />
      <ProFormText
        label="应用类型"
        name="AppType"
        placeholder=""
        rules={[{ required: true, message: '请输入应用类型' }]}
      />
      <ProFormText
        label="版本"
        name="Version"
        placeholder=""
        rules={[{ required: true, message: '请输入应用版本' }]}
      />
      <ProFormDigit label="AnsibleId" name="AnsibleId" placeholder="" />
      <ProFormSwitch label="状态" name="Enabled" initialValue={false} />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalCreateForm>
  );
}
