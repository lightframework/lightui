import FilterList from '@/components/FilterList';
import { Button, List } from 'antd';
import clsx from 'clsx';

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
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">环境列表</span>
        {/* <ProfessionCreateModalForm onFinish={onCreateFinish} /> */}
      </div>

      <FilterList
        items={items}
        filterKey="EnvId"
        listProps={{
          rowKey: 'Uid',
          renderItem: (env) => (
            <List.Item>
              <Button
                type="text"
                className={clsx(
                  'w-full rounded-none text-left',
                  selectedEnv?.Uid === env.Uid && 'bg-blue-50',
                )}
                onClick={() => onEnvSelected?.(env)}
              >
                {env.EnvName}
              </Button>
            </List.Item>
          ),
        }}
      />
    </div>
  );
}
