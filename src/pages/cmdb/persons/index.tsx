import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import { personReadOneApiCmdbPersonsByUid } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import PersonTable from './PersonTable';
import ProfessionCreateModalForm from './ProfessionCreateModalForm';
import ProfessionInfo from './ProfessionInfo';

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
      setSelectedProfession(professions.at(0));
    }
  }, [professions]);

  return (
    <PageContainer className="flex space-x-2">
      <FilterList<API.ProfessionOption>
        title="人员类型"
        filterKey="ProfessionName"
        rowKey="Uid"
        items={professions || []}
        selectedItem={selectedProfession}
        onItemSelected={setSelectedProfession}
        extras={
          <ProfessionCreateModalForm onFinish={() => refreshProfessions()} />
        }
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
