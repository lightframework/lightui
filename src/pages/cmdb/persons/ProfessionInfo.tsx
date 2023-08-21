import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { professionReadOneApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { toLocaleDateTimeString } from '@/utils/func';
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
    <CollapseDescriptions
      title={profession.ProfessionName}
      column={4}
      toolBarRender={
        <>
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
        </>
      }
      items={[
        { label: 'id', children: profession.ProfessionId },
        { label: '备注', children: profession.Description, span: 3 },
        {
          label: '创建者',
          children: profession.createBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(profession.createAt),
        },
        {
          label: '更新者',
          children: profession.updateBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(profession.updateAt),
        },
      ]}
    />
  );
}
