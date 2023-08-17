import RoleInfo from './RoleInfo';
import RoleMemberTable from './RoleMemberTable';

export default function RoleMembers() {
  return (
    <div className="space-y-3">
      <RoleInfo />
      <RoleMemberTable />
    </div>
  );
}
