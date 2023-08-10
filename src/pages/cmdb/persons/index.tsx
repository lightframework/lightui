import PageContainer from '@/components/ui/PageContainer';
import { personReadOneApiCmdbPersonsByUid } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import PersonTable from './PersonTable';
import ProfessionInfo from './ProfessionInfo';
import ProfessionList from './ProfessionList';

export default function Persons() {
  const [selectedProfession, setSelectedProfession] =
    useState<API.ProfessionOption>();

  const { data, refresh: refreshProfessions } = useRequest(
    professionOptionsApiCmdbProfessionsOptions,
  );

  personReadOneApiCmdbPersonsByUid({ uid: '0x75c4' });

  const professions = data?.list;

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
    <PageContainer className="flex space-x-2">
      <ProfessionList
        items={professions || []}
        selectedProfession={selectedProfession}
        onProfessionSelected={setSelectedProfession}
        onCreateFinish={refreshProfessions}
      />

      <div className="w-full space-y-2">
        {selectedProfession && (
          <>
            <ProfessionInfo
              professionUid={selectedProfession.Uid}
              onUpdateFinish={refreshProfessions}
              onDeleteFinish={() => {
                setSelectedProfession(undefined);
                refreshProfessions();
              }}
            />

            <PersonTable
              professionUid={selectedProfession.Uid}
              professionOptions={
                professions?.map((item) => ({
                  label: item.ProfessionName,
                  value: item.Uid,
                })) ?? []
              }
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}
