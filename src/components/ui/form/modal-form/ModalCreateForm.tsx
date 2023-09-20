import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
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
      title={title}
      trigger={trigger}
      width={500}
      layout="horizontal"
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        const res = await request(data);
        if (res.msg === 'OK') {
          message.success('添加成功');
          onFinish?.();
          return true;
        } else {
          message.error(res.msg);
        }
      }}
      {...restProps}
    >
      {fields && renderFormFields(fields)}
      {children}
    </ModalForm>
  );
}

export function ModalCreateFormWithParams<
  FormData extends Record<string, any>,
  RequestParams extends Record<string, any>,
>({
  title,
  request,
  trigger = <Button type="primary">新增</Button>,
  onFinish,
  fields,
  children,
  requestParams,
  ...restProps
}: Omit<
  ModalFormProps<FormData>,
  'fields' | 'request' | 'onFinish' | 'children' | 'params'
> & {
  fields?: FormFields<FormData>;
  requestParams: RequestParams;
  request: (
    params: RequestParams,
    formData: FormData,
  ) => Promise<{
    msg?: string;
    code?: number;
    data?: any;
  }>;
  onFinish?: VoidFunction;
  children?: ReactNode;
}) {
  return (
    <ModalForm<FormData>
      title={title}
      trigger={trigger}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        const res = await request(requestParams, data);
        if (res.msg === 'OK') {
          message.success('添加成功');
          onFinish?.();
          return true;
        } else {
          message.error(res.msg);
        }
      }}
      {...restProps}
    >
      {fields && renderFormFields(fields)}
      {children}
    </ModalForm>
  );
}
