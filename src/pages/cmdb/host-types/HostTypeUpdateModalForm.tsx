import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  hosttypeReadOneApiCmdbHosttypesByUid,
  hosttypeUpdateApiCmdbHosttypesByUid,
} from '@/services/cmdb/hosttype';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function HostTypeUpdateModalForm({
  hostTypeUid,
  onFinish,
}: {
  hostTypeUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalUpdateForm<
      API.HostTypeUpdateReq,
      API.hosttypeUpdateApiCmdbHosttypesByUidParams,
      API.hosttypeReadOneApiCmdbHosttypesByUidParams
    >
      title="编辑主机类型"
      onFinish={onFinish}
      initialParams={{
        uid: hostTypeUid,
      }}
      requestParams={{
        uid: hostTypeUid,
      }}
      trigger={
        <Button
          type="link"
          disabled={!(access as any).hosttypeUpdateApiCmdbHosttypesByUid}
        >
          编辑
        </Button>
      }
      initialRequest={hosttypeReadOneApiCmdbHosttypesByUid}
      request={hosttypeUpdateApiCmdbHosttypesByUid}
      fields={[
        {
          fieldType: 'text',
          label: '类型名称',
          name: 'HostType',
          required: true,
        },
        {
          fieldType: 'text',
          label: '规则定义',
          name: 'RuleDefinition',
          required: true,
        },
        {
          fieldType: 'textarea',
          label: '描述',
          name: 'Description',
        },
      ]}
    />
  );
}
