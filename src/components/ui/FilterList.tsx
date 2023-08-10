import { SearchOutlined } from '@ant-design/icons';
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
    <div className="sticky left-0 top-0 w-[300px] shrink-0 space-y-2">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        {extras}
      </div>

      <div className="flex h-[calc(100%-40px)] flex-col space-y-2 border border-solid border-gray-100 p-1.5">
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
  );
}
