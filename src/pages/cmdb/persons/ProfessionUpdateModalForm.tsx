import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  professionReadOneApiCmdbProfessionsByUid,
  professionUpdateApiCmdbProfessionsByUid,
} from '@/services/cmdb/profession';
import { EditOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function ProfessionUpdateModalForm({
  professionUid,
  onFinish,
}: {
  professionUid: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalUpdateForm<
      API.ProfessionUpdateReq,
      API.professionUpdateApiCmdbProfessionsByUidParams,
      API.professionReadOneApiCmdbProfessionsByUidParams
    >
      title="编辑人员类型"
      trigger={
        <Button
          type="text"
          shape="circle"
          disabled={!(access as any).professionUpdateApiCmdbProfessionsByUid}
          icon={
            <EditOutlined
              className={
                (access as any).professionUpdateApiCmdbProfessionsByUid
                  ? 'text-green-400'
                  : 'text-black/25'
              }
            />
          }
        />
      }
      onFinish={onFinish}
      initialParams={{
        uid: professionUid,
      }}
      initialRequest={professionReadOneApiCmdbProfessionsByUid}
      requestParams={{ uid: professionUid }}
      request={professionUpdateApiCmdbProfessionsByUid}
      fields={[
        {
          fieldType: 'text',
          label: '人员类型Id',
          name: 'ProfessionId',
          required: true,
        },
        {
          fieldType: 'text',
          label: '人员类型名称',
          name: 'ProfessionName',
          required: true,
        },
        {
          fieldType: 'textarea',
          label: '备注',
          name: 'Description',
        },
      ]}
    />
  );
}
