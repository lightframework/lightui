import FilterList from '@/components/ui/FilterList';
import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';
import {
  RoleListContextProvider,
  useAutoRouter,
  useRoleList,
} from '@/contexts/list-data-context';
import { useParams } from '@umijs/max';
import RoleCreateModalForm from './RoleCreateModalForm';

function Roles() {
  const { roleId } = useParams();

  const roleListData = useRoleList();
  useAutoRouter({
    ...roleListData,
    key: 'id',
    slug: roleId,
    to: 'members',
    slugType: 'number',
  });

  const {
    items: roles,
    refreshItems: refreshRoles,
    selectedItem: selectedRole,
    setSelectedItem: setSelectedRole,
  } = roleListData;

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<API.RoleOption>
        title="角色列表"
        filterKey="name"
        rowKey="id"
        items={roles || []}
        selectedItem={selectedRole}
        onItemSelected={setSelectedRole}
        extras={<RoleCreateModalForm onFinish={() => refreshRoles()} />}
      />

      <div className="w-full">
        <LinkTabs
          top
          withOutlet
          items={[
            { label: '角色成员', to: `${roleId}/members` },
            { label: '功能权限', to: `${roleId}/authorization` },
          ]}
        />
      </div>
    </PageContainer>
  );
}

export default function Page() {
  return (
    <RoleListContextProvider params={{}}>
      <Roles />
    </RoleListContextProvider>
  );
}
