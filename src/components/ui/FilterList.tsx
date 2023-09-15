import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, List } from 'antd';
import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { ReactNode, useEffect, useState } from 'react';

const MIN_WIDTH = 200;
const DEFAULT_WIDTH = 200;

export default function FilterList<T extends Record<string, any>>({
  title,
  items,
  filterKey,
  rowKey,
  selectedItem,
  disabledFn,
  onItemSelected,
  extras,
}: {
  title: string;
  items: T[];
  filterKey: keyof T;
  rowKey: keyof T;
  disabledFn?: (item: T) => boolean;
  selectedItem?: T;
  onItemSelected?: (item: T) => void;
  extras?: ReactNode;
}) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [hidden, setHidden] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const cachedWidth = localStorage.getItem(`${title}-width`);
    if (cachedWidth !== null) {
      setWidth(Number.parseInt(cachedWidth));
    }
    const cachedHidden = localStorage.getItem(`${title}-hidden`);
    if (cachedHidden !== null) {
      setHidden(cachedHidden === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${title}-hidden`, String(hidden));
  }, [hidden]);

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

      <Resizable
        className={clsx('flex flex-col', hidden && 'hidden')}
        size={{
          width,
          height: '100%',
        }}
        onResizeStop={(_, __, ___, d) => {
          localStorage.setItem(`${title}-width`, String(width + d.width));
          setWidth((prev) => prev + d.width);
        }}
        enable={{ right: true, bottom: false }}
        minWidth={MIN_WIDTH}
      >
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

        <div className="mt-3 flex h-[calc(100%-40px)] flex-col space-y-2 border border-solid border-gray-100 p-2">
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
                      'w-full rounded-none text-left hover:!bg-[#eaf1fe] hover:!text-[#1677ff] disabled:bg-[#fafafa]',
                      selectedItem?.[rowKey] === item[rowKey] &&
                        'bg-[#eaf1fe] text-[#1677ff]',
                    )}
                    onClick={() => onItemSelected?.(item)}
                    disabled={disabledFn ? disabledFn(item) : undefined}
                  >
                    {item[filterKey]}
                  </Button>
                </List.Item>
              )}
            />
          </ConfigProvider>
        </div>
      </Resizable>
    </div>
  );
}
