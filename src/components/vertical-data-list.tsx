import { List, ListProps } from 'antd';
import React from 'react';

export default function VerticalDataList<T>({
  items,
  rowKey,
  renderItem,
  empty = '-',
}: {
  items: T[] | null | undefined;
  rowKey?: ListProps<T>['rowKey'];
  renderItem: (item: T, index: number) => React.ReactNode;
  empty?: React.ReactNode;
}) {
  if (!items || items.length === 0) return empty;

  return (
    <List
      dataSource={items}
      rowKey={rowKey}
      split={false}
      renderItem={(item, index) => (
        <List.Item>{renderItem(item, index)}</List.Item>
      )}
    />
  );
}
