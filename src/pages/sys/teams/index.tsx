import ErrorPage from '@/components/ui/ErrorPage';
import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import {
  TeamListContextProvider,
  useTeamList,
} from '@/contexts/list-data-context';
import TeamCreateModalForm from './TeamCreateModalForm';
import TeamInfo from './TeamInfo';
import TeamMemberTable from './TeamMemberTable';

export type TeamOption = {
  TeamId: string;
  TeamName: string;
  Uid: string;
};

export const tmpTeams: TeamOption[] = [];

function Teams() {
  const {
    items: teams,
    refetchItems: refetchTeams,
    setSelectedItem: setSelectedTeam,
    selectedItem: selectedTeam,
  } = useTeamList();

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<TeamOption>
        title="团队列表"
        filterKey="TeamName"
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
  return (
    <TeamListContextProvider params={{}}>
      <Teams />
    </TeamListContextProvider>
  );
}
