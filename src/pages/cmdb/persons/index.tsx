import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import PersonTable from './PersonTable';
import ProfessionInfo from './ProfessionInfo';
import ProfessionList from './ProfessionList';

export default function Persons() {
  const [selectedProfession, setSelectedProfession] =
    useState<API.ProfessionOption>();

  const { data: professions, refetch: refetchProfessions } = useQuery({
    queryKey: ['profession-list'],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list,
      ),
  });

  useEffect(() => {
    if (
      professions &&
      !professions.find((item) => item.Uid === selectedProfession?.Uid)
    ) {
      if (professions.length !== 0) {
        setSelectedProfession(professions[0]);
      } else {
        setSelectedProfession(undefined);
      }
    }
  }, [professions]);

  return (
    <div className="mt-5 flex bg-white">
      <ProfessionList
        items={professions || []}
        selectedProfession={selectedProfession}
        onProfessionSelected={setSelectedProfession}
        onCreateFinish={refetchProfessions}
      />

      <div className="w-full">
        {selectedProfession && (
          <>
            <ProfessionInfo
              professionUid={selectedProfession.Uid}
              onUpdateFinish={refetchProfessions}
              onDeleteFinish={() => {
                setSelectedProfession(undefined);
                refetchProfessions();
              }}
            />

            <PersonTable
              professionId={selectedProfession.ProfessionId}
              professionUid={selectedProfession.Uid}
            />
          </>
        )}
      </div>
    </div>
  );
}
