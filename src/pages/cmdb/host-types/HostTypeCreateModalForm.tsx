import { hosttypeCreateApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function HostTypeCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.HostTypeCreateReq>
      title="创建主机类型"
      trigger={<Button type="primary">新增</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await hosttypeCreateApiCmdbHosttypes(data);
          if (res.msg === 'OK') {
            message.success('添加成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          const data = (e as AxiosError).response?.data as any;
          const code = data.code;
          if (code === 5000) {
            message.error(data.msg);
          } else {
            message.error('服务器异常，添加失败');
          }
        }
      }}
    >
      <ProFormText
        name="HostTypeName"
        label="名称"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入主机类型名称',
          },
        ]}
      />
      <ProFormText
        name="RuleDefinition"
        label="命名规则"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入命名规则',
          },
        ]}
      />
      <ProFormTextArea name="Description" label="描述" placeholder="" />
    </ModalForm>
  );
}
