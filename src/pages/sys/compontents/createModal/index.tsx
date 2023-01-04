import { Modal, message, Button, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import UserForm from '../userForm';
// import AddUser from '../addUser';
import PasswordForm from '../passwordForm';
import * as userApi from '@/services/sys/user';

import { UserType, UserActionType } from '@/store/manageInterface';
import type { ModalProps } from '@/store/manageInterface';
import { useRef } from 'react';

const CreateModal: React.FC<ModalProps> = (props: ModalProps) => {
  const { t } = useTranslation();
  const { visible, onClose, action, width, userId, userType } = props;
  const isUserForm: boolean =
    (action === UserActionType.CreateUser || action === UserActionType.EditUser) &&
    userType === UserType.User
      ? true
      : false;
  const isPasswordForm: boolean = action === UserActionType.Reset ? true : false;
  // const isAddUser: boolean = action === UserActionType.AddUser ? true : false;
  const userRef = useRef(null as any);
  const passwordRef = useRef(null as any);

  const onOk = async () => {
    if (isUserForm) {
      const form = userRef.current.form;
      const values: API.UserAddReq = await form.validateFields();
      const editValues: API.UserEditReq = await form.validateFields();
      const contacts = {};
      const params = { ...values, contacts };
      const editParams = { ...editValues, contacts };

      if (action === UserActionType.CreateUser) {
        userApi.add(params).then(() => {
          message.success(t('用户创建成功'));
          onClose(true);
        });
      }

      if (action === UserActionType.EditUser && userId) {
        userApi.edit({ id: userId.toString() }, editParams).then(() => {
          message.success(t('用户信息修改成功'));
          onClose(true);
        });
      }
    } else if (isPasswordForm && userId) {
      const form = passwordRef.current.form;
      const values = await form.validateFields();
      const params = { ...values };
      userApi.resetPass({ id: userId.toString() }, params).then(() => {
        message.success(t('密码重置成功'));
        onClose();
      });
    }
  };
  const actionLabel = () => {
    if (action === UserActionType.CreateUser) {
      return t('创建用户');
    }
    if (action === UserActionType.CreateTeam) {
      return t('创建团队');
    }
    if (action === UserActionType.CreateBusiness) {
      return t('创建业务组');
    }
    if (action === UserActionType.AddBusinessMember) {
      return t('添加业务组成员');
    }
    if (action === UserActionType.EditBusiness) {
      return t('编辑业务组');
    }
    if (action === UserActionType.EditUser) {
      return t('编辑用户信息');
    }
    if (action === UserActionType.EditTeam) {
      return t('编辑团队信息');
    }
    if (action === UserActionType.Reset) {
      return t('重置密码');
    }
    if (action === UserActionType.Disable) {
      return t('禁用');
    }
    if (action === UserActionType.Undisable) {
      return t('启用');
    }
    if (action === UserActionType.AddUser) {
      return t('添加成员');
    }
    return t('非法参数');
  };

  return (
    <Modal
      title={actionLabel()}
      visible={visible}
      width={width ? width : 700}
      onCancel={onClose}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={onClose}>
          {t('取消')}
        </Button>,
        <Button key="submit" type="primary" onClick={() => onOk()}>
          {t('确定')}
        </Button>,
      ]}
    >
      <Divider />
      {isUserForm && <UserForm ref={userRef} userId={userId} />}
      {isPasswordForm && <PasswordForm ref={passwordRef} userId={userId} />}
      {/* {isAddUser && <AddUser teamId={teamId} onSelect={(val) => setSelectedUser(val)}></AddUser>} */}
      <Divider />
    </Modal>
  );
};

export default CreateModal;
