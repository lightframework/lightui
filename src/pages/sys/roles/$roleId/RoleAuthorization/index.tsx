import apis from '@/constants/menu2api.json';
import { useRoleList } from '@/contexts/list-data-context';
import {
  roleAuthEditApiSysRolesByIdauth,
  roleAuthListApiSysRolesByIdauth,
} from '@/services/sys/role';
import { useQuery } from '@tanstack/react-query';
import { history, useAccess } from '@umijs/max';
import { Button, Checkbox, Result, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

type DataType = (typeof apis)[number];

export default function RoleAuthorization() {
  const access = useAccess();
  const [menuIds, setMenuIds] = useState<Set<string>>(new Set());
  const [apiIds, setApiIds] = useState<Set<string>>(new Set());

  const { selectedItem: role } = useRoleList();

  const { data } = useQuery({
    queryKey: ['auth', String(role?.id)],
    queryFn: () =>
      roleAuthListApiSysRolesByIdauth({ id: String(role?.id) }).then(
        (res) => res.data,
      ),
    enabled: role !== undefined,
  });

  useEffect(() => {
    if (data) {
      setMenuIds(new Set(data.menuIds ?? []));
      setApiIds(new Set(data.apiIds ?? []));
    }
  }, [data]);

  const save = async () => {
    await roleAuthEditApiSysRolesByIdauth(
      { id: String(role?.id) },
      { menuIds: Array.from(menuIds), apiIds: Array.from(apiIds) },
    );
    message.success('保存成功');
  };

  const reset = async () => {
    if (data) {
      setMenuIds(new Set(data.menuIds ?? []));
      setApiIds(new Set(data.apiIds ?? []));
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '菜单',
      key: 'menu',
      render: (_, row) => (
        <Checkbox
          disabled={!(access as any).roleAuthEditApiSysRolesByIdauth}
          checked={menuIds.has(row.menu.value)}
          onChange={(e) => {
            if (e.target.checked) {
              const newMenuIds = new Set(menuIds);
              newMenuIds.add(row.menu.value);
              setMenuIds(newMenuIds);

              const newApiIds = new Set(apiIds);
              for (const api of row.apis) {
                newApiIds.add(api.value);
              }
              setApiIds(newApiIds);
            } else {
              const newMenuIds = new Set(menuIds);
              newMenuIds.delete(row.menu.value);
              setMenuIds(newMenuIds);
              const newApiIds = new Set(apiIds);
              for (const api of row.apis) {
                newApiIds.delete(api.value);
              }
              setApiIds(newApiIds);
            }
          }}
        >
          {row.menu.label}
        </Checkbox>
      ),
      width: 200,
    },
    {
      title: '操作',
      key: 'options',
      render: (_, row) => (
        <Checkbox.Group
          disabled={!(access as any).roleAuthEditApiSysRolesByIdauth}
          options={row.apis}
          value={Array.from(apiIds)}
          onChange={(v) => {
            const newApiIds = new Set(apiIds);
            for (const api of row.apis) {
              newApiIds.delete(api.value);
            }
            for (const api of v) {
              newApiIds.add(api as string);
            }
            setApiIds(newApiIds);
          }}
        />
      ),
      width: 1000,
    },
  ];

  if (!(access as any).roleAuthListApiSysRolesByIdauth) {
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你无权访问角色权限数据"
      extra={
        <Button type="primary" onClick={() => history.replace('/')}>
          返回首页
        </Button>
      }
    />;
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-x-2">
        <h1 className="mb-0 text-sm font-semibold">权限配置</h1>

        <div className="flex gap-x-2">
          <Button
            type="primary"
            onClick={save}
            disabled={!(access as any).roleAuthEditApiSysRolesByIdauth}
          >
            保存
          </Button>
          <Button type="default" onClick={reset}>
            重置
          </Button>
        </div>
      </div>

      <Table
        loading={data === undefined}
        dataSource={apis}
        rowKey={(row) => row.menu.key}
        columns={columns}
        pagination={{ defaultPageSize: 20, size: 'small' }}
      />
    </>
  );
}
