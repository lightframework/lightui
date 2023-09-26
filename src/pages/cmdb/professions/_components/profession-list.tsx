import ResizableFilterList from '@/components/resizable-filter-list';
import { professionDeleteApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
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
import ProfessionCreateModalForm from './profession-create-modal-form';
import ProfessionUpdateModalForm from './profession-update-modal-form';

export default function ProfessionList({
  professions,
}: {
  professions: CMDB.ProfessionOption[];
}) {
  const access = useAccess();
  const [modal, contextHolder] = useModal();
  const queryClient = useQueryClient();

  const [selectedProfessionToUpdate, setSelectedProfessionToUpdate] = useState<
    CMDB.ProfessionOption | undefined
  >();

  const refetchProfessions = () =>
    queryClient.invalidateQueries(['profession-options']);

  const showDeleteConfirm = (profession: CMDB.ProfessionOption) =>
    modal.confirm({
      title: '确定删除人员类型吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除人员类型 ${profession.ProfessionName}（${profession.ProfessionId}）`,
      onOk: async () => {
        await professionDeleteApiCmdbProfessionsByUid({ uid: profession.Uid });
        message.success('删除成功');
        refetchProfessions();
      },
    });

  const items = professions.map((profession) => ({
    label: profession.ProfessionName,
    key: profession.Uid,
    to: `/cmdb/professions/${profession.Uid}`,
    contextMenuItems: [
      {
        label: '编辑',
        key: 'update',
        icon: <EditOutlined />,
        onClick: () => setSelectedProfessionToUpdate(profession),
        disabled: !access.professionUpdateApiCmdbProfessionsByUid,
      },
      {
        label: '删除',
        key: 'delete',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => showDeleteConfirm(profession),
        disabled: !access.professionDeleteApiCmdbProfessionsByUid,
      },
    ],
  }));

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="profession"
        title="人员类型列表"
        items={items}
        extras={<ProfessionCreateModalForm onFinish={refetchProfessions} />}
      />
      <ProfessionUpdateModalForm
        open={selectedProfessionToUpdate !== undefined}
        onCancel={() => setSelectedProfessionToUpdate(undefined)}
        profession={selectedProfessionToUpdate}
        onFinish={refetchProfessions}
      />
    </>
  );
}
