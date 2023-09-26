import Centered from '@/components/centered';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { useQuery } from '@tanstack/react-query';
import { Outlet, history, useAccess, useLocation, useParams } from '@umijs/max';
import { Result, Segmented, Spin } from 'antd';
import { useEffect } from 'react';
import RoleList from './_components/role-list';

function Roles() {
  const { roleId } = useParams();
  const { pathname } = useLocation();

  const { data: roleOptions, status: roleOptionsFetchStatus } = useQuery({
    queryKey: ['role-options'],
    queryFn: () =>
      roleOptionsApiSysRolesOptions({}).then((res) => res.data?.list ?? []),
  });

  useEffect(() => {
    if (
      pathname.endsWith('/roles') &&
      roleOptions &&
      roleOptions.length !== 0
    ) {
      history.replace(`/sys/roles/${roleOptions[0].id}/members`);
    }
  }, [roleOptions, pathname]);

  if (roleOptionsFetchStatus === 'loading') {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  if (roleOptionsFetchStatus === 'error') {
    return <Result status="500" title="抱歉，请求角色资源失败" />;
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <RoleList roles={roleOptions} />

      {roleOptions.length === 0 ? (
        <Result title="暂无任何角色信息" subTitle="请先添加角色" />
      ) : roleId ? (
        roleOptions.find((role) => String(role.id) === roleId) ? (
          <div className="h-full w-full space-y-3 overflow-x-auto">
            <Segmented
              block
              defaultValue={pathname.split('/').at(-1)}
              options={[
                {
                  label: '角色成员',
                  value: 'members',
                },
                { label: '角色权限', value: 'authorizations' },
              ]}
              onChange={(v) => {
                const segments = pathname.split('/');
                segments[segments.length - 1] = String(v);
                history.replace(segments.join('/'));
              }}
            />

            <Outlet />
          </div>
        ) : (
          <Result
            status="404"
            title="404"
            subTitle={`抱歉，未找到角色：${roleId}`}
          />
        )
      ) : null}
    </div>
  );
}

export default function AuthRole() {
  const access = useAccess();

  if (!access.roleOptionsApiSysRolesOptions) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问角色数据" />
    );
  }

  return <Roles />;
}
