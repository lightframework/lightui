import ErrorPage from '@/components/ui/ErrorPage';
import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import {
  ProfessionListContextProvider,
  useProfessionList,
} from '@/contexts/list-data-context';
import TeamCreateModalForm from './TeamCreateModalForm';
import TeamInfo from './TeamInfo';
import TeamMemberTable from './TeamMemberTable';

function Teams() {
  const {
    items: teams,
    refetchItems: refetchTeams,
    setSelectedItem: setSelectedTeam,
    selectedItem: selectedTeam,
  } = useProfessionList();

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<API.ProfessionOption>
        title="团队列表"
        filterKey="ProfessionName"
        rowKey="Uid"
        items={teams || []}
        selectedItem={selectedTeam}
        onItemSelected={setSelectedTeam}
        extras={<TeamCreateModalForm onFinish={() => refetchTeams()} />}
      />

      <div className="w-full space-y-3 overflow-x-auto">
        {!teams || teams.length === 0 ? (
          <ErrorPage>请先新增团队后添加团队成员</ErrorPage>
        ) : selectedTeam !== undefined ? (
          <>
            <TeamInfo teamUid={selectedTeam.Uid} />
            <TeamMemberTable teamUid={selectedTeam.Uid} />
          </>
        ) : null}
      </div>
    </PageContainer>
  );
}

export default function Page() {
  return <PageContainer>Teams</PageContainer>;

  return (
    <ProfessionListContextProvider params={{}}>
      <Teams />
    </ProfessionListContextProvider>
  );
}
