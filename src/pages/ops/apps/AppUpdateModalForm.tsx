import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  appReadOneApiCmdbAppsByUid,
  appUpdateApiCmdbAppsByUid,
} from '@/services/cmdb/app';
import {
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function AppUpdateModalForm({
  appUid,
  onFinish,
}: {
  appUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalUpdateForm<
      API.AppUpdateReq,
      API.appUpdateApiCmdbAppsByUidParams,
      API.appReadOneApiCmdbAppsByUidParams
    >
      title="编辑应用"
      trigger={
        <Button
          type="link"
          disabled={!(access as any).appUpdateApiCmdbAppsByUid}
        >
          编辑
        </Button>
      }
      onFinish={onFinish}
      initialParams={{ uid: appUid }}
      initialRequest={appReadOneApiCmdbAppsByUid}
      requestParams={{ uid: appUid }}
      request={appUpdateApiCmdbAppsByUid}
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
      <ProFormSwitch label="状态" name="Enabled" />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalUpdateForm>
  );
}
