import FilterList from '@/components/FilterList';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { Button, List } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

export default function EnvsList({
  selectedEnvUid,
  onEnvSelected,
}: {
  selectedEnvUid?: string;
  onEnvSelected?: (env: API.EnvOption) => void;
}) {
  const [envs, setEnvs] = useState<API.EnvOption[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);

  const fetchEnvs = useCallback(async () => {
    const res = await envOptionsApiCmdbEnvsOptions({});
    if (res.msg === 'OK') {
      setEnvs(res.data?.list ? (res.data.list as any) : []);
      if (res.data?.list && res.data.list.length !== 0) {
        onEnvSelected?.(res.data.list[0] as any);
      }
    }
  }, []);

  useEffect(() => {
    fetchEnvs().then(() => setInitialFetch(true));
  }, []);

  return (
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">环境列表</span>
        {/* <RegionCreateModalForm cloudUid={cloudUid} onFinish={fetchRegions} /> */}
      </div>

      {initialFetch && (
        <FilterList
          items={envs}
          filterKey="EnvName"
          listProps={{
            renderItem: (item) => (
              <List.Item>
                <Button
                  type="text"
                  className={clsx(
                    'w-full rounded-none text-left',
                    selectedEnvUid === item.Uid && 'bg-blue-50',
                  )}
                  onClick={() => onEnvSelected?.(item)}
                >
                  {item.EnvName}
                </Button>
              </List.Item>
            ),
          }}
        />
      )}
    </div>
  );
}
