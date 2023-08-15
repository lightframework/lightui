import { professionReadOneApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import ProfessionDeleteModalForm from './ProfessionDeleteModalForm';
import ProfessionUpdateModalForm from './ProfessionUpdateModalForm';

export default function ProfessionInfo({
  professionUid,
  onDeleteFinish,
  onUpdateFinish,
}: {
  professionUid: string;
  onDeleteFinish?: VoidFunction;
  onUpdateFinish?: VoidFunction;
}) {
  const { data: profession, refresh: refreshProfession } = useRequest(
    () => professionReadOneApiCmdbProfessionsByUid({ uid: professionUid }),
    {
      refreshDeps: [professionUid],
    },
  );

  if (!profession) {
    return;
  }

  return (
    <ProDescriptions<API.ProfessionInfo>
      title={profession?.ProfessionName}
      column={3}
      className="bg-[#fafafa] p-3"
      extra={
        <div>
          <ProfessionUpdateModalForm
            professionUid={profession.Uid!}
            onFinish={() => {
              refreshProfession();
              onUpdateFinish?.();
            }}
          />
          <ProfessionDeleteModalForm
            professionUid={profession.Uid!}
            professionName={profession.ProfessionName}
            professionId={profession.ProfessionId}
            onFinish={onDeleteFinish}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="创建人" valueType="text">
        {profession?.createBy}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间">
        {new Date(profession?.createAt ?? '').toLocaleString()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="备注" valueType="text">
        {profession?.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
