import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { useRequest } from '@umijs/max';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import RoleAuthorization from './RoleAuthriozation';
import RoleCreateModalForm from './RoleCreateModalForm';
import RoleMembers from './RoleMembers';

export default function Roles() {
  const [selectedRole, setSelectedRole] = useState<API.RoleOption>();

  const { data, refresh: refreshRole } = useRequest(
    roleOptionsApiSysRolesOptions,
  );

  const roles = data?.list;

  useEffect(() => {
    if (roles && !roles.find((item) => item.id === selectedRole?.id)) {
      setSelectedRole(roles.at(0));
    }
  }, [roles]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '角色成员',
      children: selectedRole && (
        <RoleMembers
          roleId={selectedRole.id}
          onRoleUpdateFinish={() => refreshRole()}
          onRoleDeleteFinish={() => refreshRole()}
        />
      ),
    },
    {
      key: '2',
      label: '功能权限',
      children: selectedRole && <RoleAuthorization roleId={selectedRole.id} />,
    },
  ];

  return (
    <PageContainer className="flex space-x-2">
      <FilterList<API.RoleOption>
        title="角色列表"
        filterKey="name"
        rowKey="id"
        items={roles || []}
        selectedItem={selectedRole}
        onItemSelected={setSelectedRole}
        extras={<RoleCreateModalForm onFinish={() => refreshRole()} />}
      />

      <div className="w-full">
        <Tabs
          className="-my-2"
          defaultActiveKey="1"
          items={items}
          destroyInactiveTabPane
        />
      </div>
    </PageContainer>
  );
}
