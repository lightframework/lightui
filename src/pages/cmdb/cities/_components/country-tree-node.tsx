import { countryDeleteApiCmdbCountrysByUid } from '@/services/cmdb/country';
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
  const [isHover, setIsHover] = useState(false);

  const queryClient = useQueryClient();
  const refetch = () => queryClient.invalidateQueries(['continent-placement']);

  const to = `?countryUid=${country.Uid}`;
  const isActive = to === search;

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

  console.log(country.CountryNameCn, isActive ? 'true' : 'false');

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
          <Button
            type="text"
            shape="circle"
            size="small"
            disabled={!access.countryUpdateApiCmdbCountrysByUid}
            onClick={(e) => {
              // 防止触发链接的点击事件
              e.preventDefault();

              setSelectedCountryToUpdate(country);
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
