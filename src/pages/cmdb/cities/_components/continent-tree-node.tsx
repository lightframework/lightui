import { continentDeleteApiCmdbContinentsByUid } from '@/services/cmdb/continent';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Dropdown, message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { useState } from 'react';
import ContinentUpdateModalForm from './continent-update-modal-form';
import CountryCreateModalForm from './country-create-modal-form';

export function ContinentTreeNode({
  continent,
}: {
  continent: CMDB.PlaceContinent;
}) {
  const [modal, contextHolder] = useModal();
  const access = useAccess();

  const queryClient = useQueryClient();
  const refetch = () => queryClient.invalidateQueries(['continent-placement']);

  const [selectedContinentToUpdate, setSelectedContinentToUpdate] = useState<
    CMDB.PlaceContinent | undefined
  >();

  const title = `${continent.ContinentNameCn}(${continent.Count})`;

  const showDeleteConfirm = () =>
    modal.confirm({
      title: '确定删除大洲吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除大洲 ${continent.ContinentNameCn}（${continent.ContinentId}）`,
      onOk: async () => {
        await continentDeleteApiCmdbContinentsByUid({ uid: continent.Uid });
        message.success('删除成功');
        refetch();
      },
    });

  if (continent.ContinentId === 'all') {
    return (
      <div className="flex h-[34px] w-full items-center justify-between pl-3 pr-1">
        {title}
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{
          items: [
            {
              label: '编辑',
              key: 'update',
              icon: <EditOutlined />,
              onClick: () => setSelectedContinentToUpdate(continent),
              disabled: !access.continentUpdateApiCmdbContinentsByUid,
            },
            {
              label: '删除',
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => showDeleteConfirm(),
              disabled: !access.continentDeleteApiCmdbContinentsByUid,
            },
          ],
        }}
        trigger={['contextMenu']}
      >
        <div className="flex h-[34px] w-full items-center justify-between pl-3 pr-1">
          {title}

          <CountryCreateModalForm
            continentUid={continent.Uid}
            onFinish={refetch}
          />
        </div>
      </Dropdown>
      <ContinentUpdateModalForm
        open={selectedContinentToUpdate !== undefined}
        onCancel={() => setSelectedContinentToUpdate(undefined)}
        continent={continent}
        onFinish={refetch}
      />
    </>
  );
}
