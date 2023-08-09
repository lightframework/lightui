import FilterList from '@/components/FilterList';
import { Button, List } from 'antd';
import clsx from 'clsx';
import ProfessionCreateModalForm from './ProfessionCreateModalForm';

export default function ProfessionList({
  items,
  selectedProfession,
  onProfessionSelected,
  onCreateFinish,
}: {
  items: API.ProfessionOption[];
  selectedProfession?: API.ProfessionOption;
  onProfessionSelected?: (profession: API.ProfessionOption) => void;
  onCreateFinish?: VoidFunction;
}) {
  return (
    <div className="sticky left-0 top-0 w-[300px] shrink-0 space-y-2">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-sm font-semibold">人员类型</span>
        <ProfessionCreateModalForm onFinish={onCreateFinish} />
      </div>

      <FilterList
        items={items}
        filterKey="ProfessionName"
        listProps={{
          rowKey: 'Uid',
          renderItem: (profession) => (
            <List.Item>
              <Button
                type="text"
                className={clsx(
                  'w-full rounded-none text-left',
                  selectedProfession?.Uid === profession.Uid && 'bg-blue-50',
                )}
                onClick={() => onProfessionSelected?.(profession)}
              >
                {profession.ProfessionName}
              </Button>
            </List.Item>
          ),
        }}
      />
    </div>
  );
}
