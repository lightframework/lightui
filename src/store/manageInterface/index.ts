export interface Contacts {
  key: string;
  value: string;
}
export interface UserList {
  list: API.User[];
  total: number;
}
export interface TeamList {
  list: API.User[];
  total: number;
}
export enum UserType {
  User = '用户',
  Team = '团队',
}
export interface TeamInfo {
  teams?: API.User;
  team?: API.User;
  users: API.User[];
}
export enum UserActionType {
  CreateUser = '创建用户',
  CreateTeam = '创建团队',
  CreateBusiness = '创建业务组',
  AddBusinessMember = '添加业务组成员',
  EditBusiness = '编辑业务组',
  EditUser = '编辑用户信息',
  EditTeam = '编辑团队信息',
  Reset = '重置密码',
  Disable = '禁用',
  Undisable = '启用',
  AddUser = '添加成员',
}
export enum RoleType {
  Admin = '管理员',
  Standard = '普通用户',
  Guest = '游客',
}
export interface Title {
  create: string;
  edit: string;
  disabled: string;
  reset: string;
}
export type TitleKey = keyof Title;

export interface ModalProps {
  visible: boolean;
  userType?: string;
  onClose?: any;
  action: UserActionType;
  userId?: number;
  // teamId?: string;
  // memberId?: string;
  onSearch?: any;
  width?: number;
}
export interface TeamProps {
  onClose?: any;
  teamId?: string;
  businessId?: string;
  onSelect?: any;
  action?: UserActionType;
}
export interface UserAndPasswordFormProps {
  userId?: string;
}
export interface ContactsItem {
  key: string;
  label: string;
}
export interface PopoverProps {
  userId?: string;
  teamId?: string;
  memberId?: string;
  onClose: any;
  userType: string;
  isIcon?: boolean;
}
