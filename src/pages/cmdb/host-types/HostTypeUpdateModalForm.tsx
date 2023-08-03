import { hostTypeEditApiCmdbHosttypesByUid } from '@/services/cmdb/hostType';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, Form, message } from 'antd';

export default function HostTypeUpdateModalForm({
  uid,
  initialValues,
  onFinish,
}: {
  uid: string;
  initialValues?: API.HostTypeEditReq['data'];
  onFinish?: VoidFunction;
}) {
  const [form] = Form.useForm<API.HostTypeEditReq['data']>();

  return (
    <ModalForm<API.HostTypeEditReq['data']>
      title="编辑主机类型"
      trigger={<Button type="link">编辑</Button>}
      form={form}
      width={600}
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      layout="horizontal"
      onFinish={async (data) => {
        try {
          const res = await hostTypeEditApiCmdbHosttypesByUid(
            { uid },
            data as any,
          );
          if (res.msg === 'OK') {
            message.success('更新成功');
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
        name="HostType"
        label="主机类型"
        placeholder="请输入主机类型"
        rules={[
          {
            required: true,
            message: '请输入主机类型',
          },
        ]}
      />
      <ProFormText
        name="NamingRule"
        label="命名规则"
        placeholder="请输入命名规则"
        rules={[
          {
            required: true,
            message: '请输入命名规则',
          },
        ]}
      />
      <ProFormText
        name="RuleDefinition"
        label="规则定义"
        placeholder="请输入规则定义"
        rules={[
          {
            required: true,
            message: '请输入规则定义',
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
