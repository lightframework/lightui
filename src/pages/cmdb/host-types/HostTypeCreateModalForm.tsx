import { hosttypeCreateApiCmdbHosttypes } from '@/services/cmdb/hosttype';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function HostTypeCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.HostTypeCreateReq>();

  return (
    <ModalForm<API.HostTypeCreateReq>
      title="添加主机类型"
      trigger={<Button type="primary">添加</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      layout="horizontal"
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
        placeholder="请输入主机类型名称"
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
        placeholder="请输入命名规则"
        rules={[
          {
            required: true,
            message: '请输入命名规则',
          },
        ]}
      />
      <ProFormTextArea
        name="Description"
        label="描述"
        placeholder="请输入描述"
        rules={[
          {
            max: 128,
          },
        ]}
      />
    </ModalForm>
  );
}
