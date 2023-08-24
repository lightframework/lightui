import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { useProfessionList } from '@/contexts/list-data-context';
import { professionReadOneApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { toLocaleDateTimeString } from '@/utils/func';
import { useQuery } from '@tanstack/react-query';
import ProfessionDeleteModalForm from './ProfessionDeleteModalForm';
import ProfessionUpdateModalForm from './ProfessionUpdateModalForm';

export default function ProfessionInfo({
  professionUid,
}: {
  professionUid: string;
}) {
  const { refetchItems: refetchProfessions } = useProfessionList();

  const { data: profession, refetch: refetchProfession } = useQuery({
    queryKey: ['profession', professionUid],
    queryFn: () =>
      professionReadOneApiCmdbProfessionsByUid({ uid: professionUid }).then(
        (res) => res.data,
      ),
  });

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
              refetchProfession();
              refetchProfessions();
            }}
          />
          <ProfessionDeleteModalForm
            professionUid={profession.Uid!}
            professionName={profession.ProfessionName}
            professionId={profession.ProfessionId}
            onFinish={refetchProfessions}
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
          label: '更新时间',
          children: toLocaleDateTimeString(profession.updateAt),
        },
      ]}
    />
  );
}
