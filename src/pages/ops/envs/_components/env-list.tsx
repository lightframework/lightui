import ResizableFilterList from '@/components/resizable-filter-list';
import { envDeleteApiCmdbEnvsByUid } from '@/services/cmdb/env';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { useState } from 'react';
import EnvCreateModalForm from './env-create-modal-form';
import EnvUpdateModalForm from './env-update-modal-form';

export default function EnvList({ envs }: { envs: CMDB.EnvOption[] }) {
  const access = useAccess();

  const [modal, contextHolder] = useModal();
  const queryClient = useQueryClient();

  const [selectedEnvToUpdate, setSelectedEnvToUpdate] = useState<
    CMDB.EnvOption | undefined
  >();

  const refetchEnvs = () => queryClient.invalidateQueries(['env-options']);

  const showDeleteConfirm = (env: CMDB.EnvOption) =>
    modal.confirm({
      title: '确定删除环境吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除环境 ${env.EnvName}（${env.EnvId}）`,
      onOk: async () => {
        await envDeleteApiCmdbEnvsByUid({ uid: env.Uid });
        message.success('删除成功');
        refetchEnvs();
      },
    });

  const items = envs.map((env) => ({
    label: env.EnvName,
    key: env.Uid,
    to: `/ops/envs/${env.Uid}`,
    contextMenuItems: [
      {
        label: '编辑',
        key: 'update',
        icon: <EditOutlined />,
        onClick: () => setSelectedEnvToUpdate(env),
        disabled: !access.envUpdateApiCmdbEnvsByUid,
      },
      {
        label: '删除',
        key: 'delete',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => showDeleteConfirm(env),
        disabled: !access.envDeleteApiCmdbEnvsByUid,
      },
    ],
  }));

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="env"
        title="环境列表"
        items={items}
        extras={<EnvCreateModalForm onFinish={refetchEnvs} />}
      />
      <EnvUpdateModalForm
        open={selectedEnvToUpdate !== undefined}
        onCancel={() => setSelectedEnvToUpdate(undefined)}
        env={selectedEnvToUpdate}
      />
    </>
  );
}
