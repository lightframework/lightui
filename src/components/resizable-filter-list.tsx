import { useLocalStorageState } from '@/lib/hooks/use-local-storage-state';
import { useToken } from '@/lib/hooks/use-token';
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { NavLink } from '@umijs/max';
import { Button, Dropdown, Input, List, MenuProps } from 'antd';
import clsx from 'clsx';
import { Resizable } from 're-resizable';
import React, { useMemo, useState } from 'react';

const MIN_WIDTH = 200;
const DEFAULT_WIDTH = 200;

export default function ResizableFilterList({
  name,
  title,
  extras,
  items,
}: {
  name: string;
  title: string;
  extras?: React.ReactNode;
  items: {
    key: React.Key;
    label: string;
    to: string;
    contextMenuItems?: MenuProps['items'];
    disabled?: boolean;
  }[];
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
              {item.contextMenuItems ? (
                <Dropdown
                  menu={{
                    items: item.contextMenuItems,
                  }}
                  trigger={['contextMenu']}
                >
                  <NavLink
                    to={item.to}
                    className="w-full px-3 py-1.5 hover:bg-[#f1f4fe]"
                    style={({ isActive }) =>
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
                    {item.label}
                  </NavLink>
                </Dropdown>
              ) : (
                <NavLink
                  to={item.to}
                  className="w-full px-3 py-1.5 hover:bg-[#f1f4fe]"
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
                </NavLink>
              )}
            </List.Item>
          )}
        />
      </Resizable>
    </div>
  );
}
