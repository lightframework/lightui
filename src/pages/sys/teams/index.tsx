import DebounceSelect from '@/components/ui/form/DebounceSelect';
import { rolePageListApiSysRoles } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';

export default function Teams() {
  rolePageListApiSysRoles({});

  return (
    <DebounceSelect<{
      label: string;
      value: number;
    }>
      mode="multiple"
      fetchOptions={async (username) => {
        const res = await userOptionsApiSysUsersOptions({ keywords: username });

        const d = res.data?.list
          ? res.data.list
              .filter((user) => user.username.includes(username))
              .map((user) => ({
                label: user.username,
                value: user.id,
              }))
          : [];

        return d;
      }}
    />
  );
}
