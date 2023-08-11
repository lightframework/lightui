import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { professionDeleteApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function ProfessionDeleteModalForm({
  professionUid,
  professionName,
  professionId,
  onFinish,
}: {
  professionUid: string;
  professionName?: string;
  professionId?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.professionDeleteApiCmdbProfessionsByUidParams>
      title="删除人员类型"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      onFinish={onFinish}
      params={{
        uid: professionUid,
      }}
      request={professionDeleteApiCmdbProfessionsByUid}
      hint={`${professionName}（${professionId}）`}
    />
  );
}
