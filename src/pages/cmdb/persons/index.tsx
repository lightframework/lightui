import ErrorPage from '@/components/ui/ErrorPage';
import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import {
  ProfessionListContextProvider,
  useProfessionList,
} from '@/contexts/list-data-context';
import { history, useAccess } from '@umijs/max';
import { Button, Result } from 'antd';
import PersonTable from './PersonTable';
import ProfessionCreateModalForm from './ProfessionCreateModalForm';
import ProfessionInfo from './ProfessionInfo';

function Persons() {
  const access = useAccess();
  const {
    items: professions,
    refetchItems: refetchProfessions,
    setSelectedItem: setSelectedProfession,
    selectedItem: selectedProfession,
  } = useProfessionList();

  if (!(access as any).professionOptionsApiCmdbProfessionsOptions) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问人员类型数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<API.ProfessionOption>
        title="人员类型"
        filterKey="ProfessionName"
        rowKey="Uid"
        items={professions || []}
        selectedItem={selectedProfession}
        onItemSelected={setSelectedProfession}
        extras={
          <ProfessionCreateModalForm onFinish={() => refetchProfessions()} />
        }
      />

      <div className="w-full space-y-3 overflow-x-auto">
        {!professions || professions.length === 0 ? (
          <ErrorPage>请先新增人员类型后添加人员</ErrorPage>
        ) : selectedProfession !== undefined ? (
          <>
            {(access as any).professionReadOneApiCmdbProfessionsByUid && (
              <ProfessionInfo professionUid={selectedProfession.Uid} />
            )}
            <PersonTable professionUid={selectedProfession.Uid} />
          </>
        ) : null}
      </div>
    </PageContainer>
  );
}

export default function Page() {
  return (
    <ProfessionListContextProvider params={{}}>
      <Persons />
    </ProfessionListContextProvider>
  );
}
