import { continentDeleteApiCmdbContinentsByUid } from '@/services/cmdb/continent';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useToken } from '@ant-design/pro-components';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useAccess, useLocation } from '@umijs/max';
import { Button, message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import clsx from 'clsx';
import { useState } from 'react';
import ContinentUpdateModalForm from './continent-update-modal-form';
import CountryCreateModalForm from './country-create-modal-form';

export function ContinentTreeNode({
  continent,
  searchTerm,
}: {
  continent: CMDB.PlaceContinent;
  searchTerm: string;
}) {
  const [modal, contextHolder] = useModal();
  const access = useAccess();
  const { token } = useToken();
  const { search } = useLocation();
  const [isHover, setIsHover] = useState(false);

  const queryClient = useQueryClient();
  const refetch = () => queryClient.invalidateQueries(['continent-placement']);

  const to = `?continentUid=${continent.Uid}`;
  const isActive = to === search;

  const [selectedContinentToUpdate, setSelectedContinentToUpdate] = useState<
    CMDB.PlaceContinent | undefined
  >();

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

  const title = `${continent.ContinentNameCn}(${continent.Count})`;

  return (
    <>
      {contextHolder}
      <Link
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={to}
        className={clsx(
          'flex h-[34px] w-full items-center justify-between pl-3 pr-1 hover:bg-[#f1f4fe]',
          searchTerm && title.includes(searchTerm) && 'bg-[#f1f4fe]',
        )}
        style={
          isActive
            ? {
                backgroundColor: token.colorPrimaryBg,
                color: token.colorLink,
              }
            : { color: token.colorText }
        }
      >
        {title}

        <div className={clsx('flex gap-x-1', !isHover && 'hidden')}>
          <CountryCreateModalForm
            continentUid={continent.Uid}
            onFinish={refetch}
          />
          <Button
            type="text"
            shape="circle"
            size="small"
            disabled={!access.countryUpdateApiCmdbCountrysByUid}
            onClick={(e) => {
              // 防止触发链接的点击事件
              e.preventDefault();

              setSelectedContinentToUpdate(continent);
            }}
            icon={<EditOutlined />}
          />

          <Button
            type="text"
            shape="circle"
            size="small"
            danger
            disabled={!access.countryDeleteApiCmdbCountrysByUid}
            onClick={(e) => {
              // 防止触发链接的点击事件
              e.preventDefault();

              showDeleteConfirm();
            }}
            icon={<DeleteOutlined />}
          />
        </div>
      </Link>

      <ContinentUpdateModalForm
        open={selectedContinentToUpdate !== undefined}
        onCancel={() => setSelectedContinentToUpdate(undefined)}
        continent={selectedContinentToUpdate}
        onFinish={refetch}
      />
    </>
  );
}
