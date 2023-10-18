import apis from '@/constants/menu2api.json';
import {
  roleAuthEditApiSysRolesByIdauth,
  roleAuthListApiSysRolesByIdauth,
} from '@/services/sys/role';
import { useQuery } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Button, Checkbox, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

type DataType = (typeof apis)[number];

export default function AuthorizationTable({ roleId }: { roleId: number }) {
  const access = useAccess();
  const [menuIds, setMenuIds] = useState<Set<string>>(new Set());
  const [apiIds, setApiIds] = useState<Set<string>>(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ['auth', roleId],
    queryFn: () =>
      roleAuthListApiSysRolesByIdauth({ id: String(roleId) }).then(
        (res) => res.data ?? {},
      ),
  });

  useEffect(() => {
    if (data) {
      const allMenus = apis.map((item) => item.menu.value);
      const allApis = apis.flatMap((item) => item.apis.map((api) => api.value));

      setMenuIds(
        new Set((data.menuIds ?? []).filter((menu) => allMenus.includes(menu))),
      );
      setApiIds(
        new Set((data.apiIds ?? []).filter((api) => allApis.includes(api))),
      );
    }
  }, [data]);

  const save = async () => {
    await roleAuthEditApiSysRolesByIdauth(
      { id: String(roleId) },
      { menuIds: Array.from(menuIds), apiIds: Array.from(apiIds) },
      { menuIds: [], apiIds: [] },
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
          checked={menuIds.has(row.menu.value)}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
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
      width: 240,
    },
    {
      title: '操作',
      key: 'options',
      render: (_, row) => (
        <Checkbox.Group
          options={row.apis}
          value={Array.from(apiIds)}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
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

  return (
    <div className="space-y-3 rounded bg-white p-3">
      <div className="flex items-center justify-between space-x-2">
        <h1 className="mb-0 text-xs font-semibold">权限配置</h1>

        <div className="flex gap-x-2">
          <Button
            type="primary"
            onClick={save}
            disabled={!access.roleAuthEditApiSysRolesByIdauth}
          >
            保存
          </Button>
          <Button type="default" onClick={reset}>
            重置
          </Button>
        </div>
      </div>

      <Table
        size="middle"
        dataSource={apis}
        rowKey={(row) => row.menu.key}
        columns={columns}
        pagination={{ defaultPageSize: 20, size: 'small' }}
        loading={isLoading}
      />
    </div>
  );
}
