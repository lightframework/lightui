import { hostDeleteApiOpsHosts } from '@/services/ops/host';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';

export default function DeleteHostsModal({
  disabled,
  instanceIds,
  onFinish,
}: {
  disabled?: boolean;
  instanceIds: string[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<OPS.HostDeleteReq>
      title="删除主机"
      trigger={
        <Button type="primary" danger disabled={disabled}>
          删除主机
        </Button>
      }
      width={500}
      layout="horizontal"
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        const res = await hostDeleteApiOpsHosts({
          ...data,
          instanceIds,
        });
        if (res.msg === 'OK') {
          message.success('删除成功');
          onFinish?.();
          return true;
        } else {
          message.error(res.msg);
        }
      }}
    >
      <ProFormText
        label="任务名称"
        key="topic"
        name="topic"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入任务名称',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="remark" placeholder="" />
    </ModalForm>
  );
}
