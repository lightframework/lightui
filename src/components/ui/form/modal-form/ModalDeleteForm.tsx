import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

export default function ModalDeleteForm<
  RequestParams extends Record<string, any>,
>({
  title,
  trigger = (
    <Button type="link" danger>
      删除
    </Button>
  ),
  params,
  request,
  onFinish,
  hint,
  ...restProps
}: Omit<ModalFormProps, 'request' | 'onFinish' | 'params'> & {
  hint: string;
  params: RequestParams;
  request: (params: RequestParams) => Promise<{
    msg?: string;
    code?: number;
  }>;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm
      {...restProps}
      title={title}
      trigger={trigger}
      width={500}
      onFinish={async () => {
        try {
          const res = await request(params);
          if (res.msg === 'OK') {
            message.success('删除成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          message.error('服务器异常，删除失败');
        }
      }}
    >
      <Typography.Paragraph style={{ marginTop: 24 }}>
        您确定{title}{' '}
        <span style={{ color: 'red', fontWeight: 700 }}>{hint}</span> ？
      </Typography.Paragraph>
    </ModalForm>
  );
}
