import FilterList from '@/components/FilterList';
import { Button, List } from 'antd';
import clsx from 'clsx';
import EnvCreateModalForm from './EnvCreateModalForm';

export default function EnvList({
  items,
  selectedEnv,
  onEnvSelected,
  onCreateFinish,
}: {
  items: API.EnvOption[];
  selectedEnv?: API.EnvOption;
  onEnvSelected?: (env: API.EnvOption) => void;
  onCreateFinish?: VoidFunction;
}) {
  return (
    <div className="sticky left-0 top-0 w-[300px] shrink-0 space-y-2">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-sm font-semibold">环境列表</span>
        <EnvCreateModalForm onFinish={onCreateFinish} />
      </div>

      <FilterList
        items={items}
        filterKey="EnvName"
        listProps={{
          rowKey: 'Uid',
          renderItem: (emv) => (
            <List.Item>
              <Button
                type="text"
                className={clsx(
                  'w-full rounded-none text-left',
                  selectedEnv?.Uid === emv.Uid && 'bg-blue-50',
                )}
                onClick={() => onEnvSelected?.(emv)}
              >
                {emv.EnvName}
              </Button>
            </List.Item>
          ),
        }}
      />
    </div>
  );
}
