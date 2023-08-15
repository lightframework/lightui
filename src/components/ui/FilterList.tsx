import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, List } from 'antd';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

export default function FilterList<T extends Record<string, any>>({
  title,
  items,
  filterKey,
  rowKey,
  selectedItem,
  onItemSelected,
  extras,
}: {
  title: string;
  items: T[];
  filterKey: keyof T;
  rowKey: keyof T;
  selectedItem?: T;
  onItemSelected?: (item: T) => void;
  extras?: ReactNode;
}) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setSearchTerm('');
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => {
        const value = item[filterKey];
        if (typeof value === 'string') {
          return value.includes(searchTerm);
        } else {
          return value === searchTerm;
        }
      }),
    );
  }, [searchTerm]);

  return (
    <div className="sticky left-0 top-0 shrink-0">
      <div
        className="absolute right-0 top-1/2 z-10 flex h-[50px] -translate-y-1/2 translate-x-full cursor-pointer items-center rounded-xl bg-[rgba(0,0,0,.08)] transition-colors hover:bg-[rgba(0,0,0,.06)]"
        onClick={() => setHidden((prev) => !prev)}
      >
        {hidden ? <RightOutlined /> : <LeftOutlined />}
      </div>

      <div className={clsx('h-full w-[240px] space-y-3', hidden && 'hidden')}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
          <ConfigProvider
            theme={{
              token: {
                paddingContentHorizontal: 0,
              },
            }}
          >
            {extras}
          </ConfigProvider>
        </div>

        <div className="flex h-[calc(100%-40px)] flex-col space-y-2 border border-solid border-gray-100 p-2">
          <Input
            placeholder=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.trim())}
            suffix={<SearchOutlined className="text-gray-400" />}
          />
          <ConfigProvider
            theme={{
              components: {
                List: {
                  itemPaddingSM: '0',
                },
              },
            }}
          >
            <List
              className="overflow-y-auto"
              size="small"
              split={false}
              dataSource={filteredItems}
              rowKey={rowKey}
              renderItem={(item) => (
                <List.Item>
                  <Button
                    type="text"
                    className={clsx(
                      'w-full rounded-none text-left',
                      selectedItem?.[rowKey] === item[rowKey] && 'bg-blue-50',
                    )}
                    onClick={() => onItemSelected?.(item)}
                  >
                    {item[filterKey]}
                  </Button>
                </List.Item>
              )}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
