import { useLocalStorageState } from '@/lib/hooks/use-local-storage-state';
import { useToken } from '@/lib/hooks/use-token';
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { NavLink } from '@umijs/max';
import { Button, Input, List } from 'antd';
import clsx from 'clsx';
import { Resizable } from 're-resizable';
import React, { useMemo, useState } from 'react';

const MIN_WIDTH = 200;
const DEFAULT_WIDTH = 200;

export interface FilterListItem {
  key: React.Key;
  label: string;
  to: string;
  disabled?: boolean;
  onEditClick?: VoidFunction;
  onRemoveClick?: VoidFunction;
}

function ListItemLink({ item }: { item: FilterListItem }) {
  const { token } = useToken();
  const [isHover, setIsHover] = useState(false);

  return (
    <NavLink
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      to={item.to}
      className="flex h-[34px] w-full items-center justify-between pl-3 pr-1 hover:bg-[#f1f4fe]"
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: token.colorPrimaryBg,
              color: token.colorLink,
            }
          : { color: token.colorText }
      }
    >
      {item.label}

      <div className={clsx('flex gap-x-1', !isHover && 'hidden')}>
        <Button
          type="text"
          shape="circle"
          size="small"
          disabled={!item.onEditClick}
          onClick={(e) => {
            // 防止触发链接的点击事件
            e.preventDefault();

            item.onEditClick?.();
          }}
          icon={<EditOutlined />}
        />

        <Button
          type="text"
          shape="circle"
          size="small"
          danger
          disabled={!item.onRemoveClick}
          onClick={(e) => {
            // 防止触发链接的点击事件
            e.preventDefault();

            item.onRemoveClick?.();
          }}
          icon={<DeleteOutlined />}
        />
      </div>
    </NavLink>
  );
}

export default function ResizableFilterList({
  name,
  title,
  extras,
  items,
}: {
  name: string;
  title: string;
  extras?: React.ReactNode;
  items: FilterListItem[];
}) {
  const { token } = useToken();

  const [hidden, setHidden] = useLocalStorageState(
    `${name}-list-hidden`,
    false,
  );
  const [width, setWidth] = useLocalStorageState(
    `${name}-list-width`,
    DEFAULT_WIDTH,
  );

  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = useMemo(
    () => items.filter((item) => item.label.includes(searchTerm.trim())),
    [items, searchTerm],
  );

  return (
    <div
      className="relative h-full shrink-0 rounded-sm"
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <Button
        size="small"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-full"
        style={{ width: 'auto', height: 40 }}
        icon={hidden ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setHidden((hidden) => !hidden)}
      />

      <Resizable
        className={clsx(hidden && 'hidden', 'flex flex-col p-2')}
        size={{ width, height: '100%' }}
        onResizeStop={(_, __, ___, d) => setWidth((width) => width + d.width)}
        enable={{ right: true, bottom: false }}
        minWidth={MIN_WIDTH}
      >
        <div className="flex items-center justify-between">
          <div className="font-semibold">{title}</div>

          <div className="flex gap-x-1">{extras}</div>
        </div>

        <Input
          className="my-1.5"
          suffix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <List
          className="h-full overflow-y-auto"
          size="small"
          split={false}
          dataSource={filteredItems}
          renderItem={(item) => (
            <List.Item>
              <ListItemLink item={item} />
            </List.Item>
          )}
        />
      </Resizable>
    </div>
  );
}
