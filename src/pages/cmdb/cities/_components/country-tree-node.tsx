import { countryDeleteApiCmdbCountrysByUid } from '@/services/cmdb/country';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useToken } from '@ant-design/pro-components';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useAccess, useLocation } from '@umijs/max';
import { Dropdown, message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import clsx from 'clsx';
import { useState } from 'react';
import CountryUpdateModalForm from './country-update-modal-form';

export function CountryTreeNode({
  country,
  searchTerm,
  continentUid,
}: {
  country: CMDB.PlaceCountry;
  searchTerm: string;
  continentUid: string;
}) {
  const [modal, contextHolder] = useModal();
  const access = useAccess();
  const { token } = useToken();
  const { search } = useLocation();

  const queryClient = useQueryClient();
  const refetch = () => queryClient.invalidateQueries(['continent-placement']);

  const to = `?countryUid=${country.Uid}`;
  const isActive = search ? search === to : to === '.';

  const [selectedCountryToUpdate, setSelectedCountryToUpdate] = useState<
    CMDB.PlaceCountry | undefined
  >();

  const showDeleteConfirm = () =>
    modal.confirm({
      title: '确定删除地区吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除地区 ${country.CountryNameCn}（${country.CountryId}）`,
      onOk: async () => {
        await countryDeleteApiCmdbCountrysByUid({ uid: country.Uid });
        message.success('删除成功');
        refetch();
      },
    });

  const title = `${country.CountryNameCn}(${country.Count})`;

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
              onClick: () => setSelectedCountryToUpdate(country),
              disabled: !access.countryUpdateApiCmdbCountrysByUid,
            },
            {
              label: '删除',
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => showDeleteConfirm(),
              disabled: !access.countryDeleteApiCmdbCountrysByUid,
            },
          ],
        }}
        trigger={['contextMenu']}
      >
        <Link
          to={to}
          className={clsx(
            'block w-full px-3 py-1.5 hover:bg-[#f1f4fe]',
            searchTerm && title.includes(searchTerm) && 'bg-[#f1f4fe]',
          )}
          style={
            isActive
              ? {
                  backgroundColor: token.colorPrimaryBg,
                  color: token.colorLink,
                }
              : {
                  color: token.colorText,
                }
          }
        >
          {title}
        </Link>
      </Dropdown>
      <CountryUpdateModalForm
        open={selectedCountryToUpdate !== undefined}
        onCancel={() => setSelectedCountryToUpdate(undefined)}
        country={selectedCountryToUpdate}
        continentUid={continentUid}
        onFinish={refetch}
      />
    </>
  );
}
