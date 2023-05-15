import { Form, Input } from 'antd';
import type { ReactNode } from 'react';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { layout } from '../../const';

import * as userApi from '@/services/sys/user';
import { useTranslation } from 'react-i18next';

interface UserAndPasswordFormProps {
  userId?: number;
}

const UserForm = React.forwardRef<ReactNode, UserAndPasswordFormProps>((props, ref) => {
  const { t } = useTranslation();
  const { userId } = props;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<API.UserInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const getUserInfoDetail = (id: number) => {
    userApi.userInfoApiSysUsersById({ id: id.toString() }).then((d: API.UserInfoResp) => {
      setInitialValues(Object.assign({}, d.data, {}));
      setLoading(false);
    });
  };

  useImperativeHandle(ref, () => ({
    form: form,
  }));
  useEffect(() => {
    console.log('打印userid', userId);
    if (userId) {
      getUserInfoDetail(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  return !loading ? (
    <Form {...layout} form={form} initialValues={initialValues} preserve={false}>
      <Form.Item
        label={t('用户名')}
        name="username"
        rules={[
          {
            required: true,
            message: t('用户名不能为空！'),
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item label={t('显示名')} name="nickname">
        <Input />
      </Form.Item>
      {!userId && (
        <>
          <Form.Item
            name="password"
            label={t('密码')}
            rules={[
              {
                required: true,
                message: t('请输入密码!'),
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={t('确认密码')}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: t('请确认密码!'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      )}
      <Form.Item label={t('手机')} name="mobile">
        <Input />
      </Form.Item>
      <Form.Item label={t('邮箱')} name="email">
        <Input />
      </Form.Item>
    </Form>
  ) : null;
});
export default UserForm;
