import { Divider } from 'antd';

export default function VerticalDividedContent<T>({
  items,
  itemRender = (item: T) => String(item),
  emptyContent = '-',
}: {
  items: T[] | undefined | null;
  itemRender?: (item: T) => React.ReactNode;
  emptyContent?: string;
}) {
  return (
    <div className="flex items-center">
      {items?.map((item, index) => {
        return (
          <>
            <span>{itemRender(item)}</span>
            {index !== items.length - 1}
            <Divider type="vertical" />
          </>
        );
      }) ?? emptyContent}
    </div>
  );
}
