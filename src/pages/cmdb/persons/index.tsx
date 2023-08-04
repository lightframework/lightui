import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import PersonTable from './PersonTable';
import ProfessionInfo from './ProfessionInfo';
import ProfessionList from './ProfessionList';

export default function Persons() {
  const [selectedProfessionUid, setSelectedProfessionUid] = useState<string>();

  const { data: professions, refetch: refetchProfessions } = useQuery({
    queryKey: ['profession-list'],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list,
      ),
  });

  useEffect(() => {
    if (professions) {
      if (!selectedProfessionUid && professions.length !== 0) {
        setSelectedProfessionUid(professions[0].Uid);
      }
      if (!professions.find((item) => item.Uid === selectedProfessionUid)) {
        if (professions.length !== 0) {
          setSelectedProfessionUid(professions[0].Uid);
        } else {
          setSelectedProfessionUid(undefined);
        }
      }
    }
  }, [professions]);

  return (
    <div className="mt-5 flex bg-white">
      <ProfessionList
        items={professions || []}
        selectedProfessionUid={selectedProfessionUid}
        onProfessionSelected={setSelectedProfessionUid}
        onCreateFinish={refetchProfessions}
      />

      <div className="w-full">
        {selectedProfessionUid && (
          <>
            <ProfessionInfo
              professionUid={selectedProfessionUid}
              onUpdateFinish={refetchProfessions}
            />

            <PersonTable
              professionId={
                professions!.find((item) => item.Uid === selectedProfessionUid)!
                  .ProfessionId
              }
              professionUid={selectedProfessionUid}
            />
          </>
        )}
      </div>
    </div>
  );
}
