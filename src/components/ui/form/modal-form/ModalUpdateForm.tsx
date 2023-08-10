import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';
import { ReactNode } from 'react';
import { FormFields, renderFormFields } from '../form-field';

export default function ModalUpdateForm<
  FormData extends Record<string, any>,
  RequestParams extends Record<string, any>,
  InitialParams extends Record<string, any> = object,
>({
  title,
  initialParams,
  initialRequest,
  requestParams,
  request,
  trigger = <Button type="link">编辑</Button>,
  onFinish,
  fields,
  children,
  ...restProps
}: Omit<
  ModalFormProps<FormData>,
  'fields' | 'request' | 'onFinish' | 'params' | 'children'
> & {
  fields?: FormFields<FormData>;
  initialParams?: InitialParams;
  initialRequest?: (params: InitialParams) => Promise<{
    msg?: string;
    code?: number;
    data?: any;
  }>;
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
    <ModalForm<FormData, InitialParams>
      title={`编辑${title}`}
      trigger={trigger}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      params={initialParams}
      request={
        initialRequest
          ? async (params) => {
              const res = await initialRequest(params);
              if (res.data) {
                return res.data;
              }
            }
          : undefined
      }
      onFinish={async (data) => {
        try {
          const res = await request(requestParams, data);
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
      {...restProps}
    >
      {fields && renderFormFields(fields)}
      {children}
    </ModalForm>
  );
}
