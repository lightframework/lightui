import FilterList from '@/components/FilterList';
import { Button, List } from 'antd';
import clsx from 'clsx';
import ProfessionCreateModalForm from './ProfessionCreateModalForm';

export default function ProfessionList({
  items,
  selectedProfessionUid,
  onProfessionSelected,
  onCreateFinish,
}: {
  items: API.ProfessionOption[];
  selectedProfessionUid?: string;
  onProfessionSelected?: (uid: string) => void;
  onCreateFinish?: VoidFunction;
}) {
  return (
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">人员类型</span>
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
                  selectedProfessionUid === profession.Uid && 'bg-blue-50',
                )}
                onClick={() => onProfessionSelected?.(profession.Uid)}
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
