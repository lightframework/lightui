import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';
import { ReactNode } from 'react';
import { FormFields, renderFormFields } from '../form-field';

export default function ModalCreateForm<FormData extends Record<string, any>>({
  title,
  request,
  trigger = <Button type="primary">新增</Button>,
  onFinish,
  fields,
  children,
  ...restProps
}: Omit<
  ModalFormProps<FormData>,
  'fields' | 'request' | 'onFinish' | 'children'
> & {
  fields?: FormFields<FormData>;
  request: (formData: FormData) => Promise<{
    msg?: string;
    code?: number;
    data?: any;
  }>;
  onFinish?: VoidFunction;
  children?: ReactNode;
}) {
  return (
    <ModalForm<FormData>
      title={`创建${title}`}
      trigger={trigger}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await request(data);
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
      {...restProps}
    >
      {fields && renderFormFields(fields)}
      {children}
    </ModalForm>
  );
}
