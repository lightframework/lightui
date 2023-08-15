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
      <ProDescriptions.Item label="创建时间">
        {profession?.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建人" valueType="text" span={2}>
        {profession?.createBy}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="备注" valueType="text" span={3}>
        {profession?.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
