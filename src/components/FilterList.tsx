import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Input, InputProps, List, ListProps } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function FilterList<T extends Record<string, any>>({
  items,
  filterKey,
  inputProps,
  listProps,
  className,
}: {
  items: T[];
  filterKey: keyof T;
  inputProps?: Omit<InputProps, 'value' | 'onChange'>;
  listProps?: Omit<ListProps<T>, 'dataSource'>;
  className?: string;
}) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div
      className={clsx(
        'space-y-2 border border-solid border-gray-100 p-1.5',
        className,
      )}
    >
      <Input
        placeholder="请输入"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trim())}
        suffix={<SearchOutlined className="text-gray-400" />}
        {...inputProps}
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
          className="h-[745px] overflow-y-auto"
          size="small"
          split={false}
          dataSource={filteredItems}
          {...listProps}
        />
      </ConfigProvider>
    </div>
  );
}
