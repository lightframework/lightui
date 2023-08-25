import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Input, List } from 'antd';
import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { useEffect, useMemo, useState } from 'react';

const MIN_WIDTH = 240;
const DEFAULT_WIDTH = 240;

export default function CloudTreeSelectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hidden, setHidden] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  const { data } = useQuery({
    queryKey: ['cloud-tree-select'],
    queryFn: () =>
      cloudPlacementApiCmdbCloudsPlaces({}).then((res) => {
        const all: API.PlaceCloud = {
          Uid: '-1',
          CloudName: '全部',
          Cloud: 'all',
          RegionSet: [],
          Count: res.data?.Tree
            ? res.data.Tree.reduce((prev, curr) => prev + curr.Count, 0)
            : 0,
        };

        return [all, ...(res.data?.Tree ?? [])];
      }),
  });
  console.log(data);

  const names = useMemo(() => {
    const ret: string[] = [];

    data?.forEach((cloud) => {
      ret.push(cloud.CloudName);
      cloud.RegionSet.forEach((region) => {
        ret.push(region.RegionName);
        region.ZoneSet.forEach((zone) => {
          ret.push(zone.ZoneName);
        });
      });
    });

    return ret;
  }, [data]);

  useEffect(() => {
    if (searchTerm) {
      for (const name of names) {
        if (name.includes(searchTerm.trim())) {
          document.getElementById(name)?.scrollIntoView();
          return;
        }
      }
    }
  }, [searchTerm]);

  if (!data) return;

  return (
    <div className="sticky left-0 top-0 h-full shrink-0">
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
          localStorage.setItem(
            `cloud-tree-select-width`,
            String(width + d.width),
          );
          setWidth((prev) => prev + d.width);
        }}
        enable={{ right: true, bottom: false }}
        minWidth={MIN_WIDTH}
      >
        <div className="flex h-full flex-col space-y-2 border border-solid border-gray-100 p-2">
          <Input
            placeholder="请输入名称进行搜索"
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
              dataSource={data}
              rowKey="Uid"
              renderItem={(item) => (
                <List.Item id={item.CloudName}>
                  <div className="w-full">
                    <Button
                      type="text"
                      className={clsx(
                        'block w-full rounded-none text-left',
                        item.CloudName !== '全部' && 'bg-black/[0.04]',
                      )}
                    >
                      {item.CloudName}（{item.Count}）
                    </Button>
                    {item.RegionSet.length !== 0 ? (
                      <List
                        size="small"
                        split={false}
                        dataSource={item.RegionSet}
                        rowKey="Uid"
                        renderItem={(item) => (
                          <List.Item id={item.RegionName}>
                            <div className="w-full">
                              <Button
                                type="text"
                                className="block w-full rounded-none bg-black/[0.02] pl-8 text-left"
                              >
                                {item.RegionName}（{item.Count}）
                              </Button>
                              {item.ZoneSet.length !== 0 ? (
                                <List
                                  size="small"
                                  split={false}
                                  dataSource={item.ZoneSet}
                                  rowKey="Uid"
                                  renderItem={(item) => (
                                    <List.Item id={item.ZoneName}>
                                      <Button
                                        type="text"
                                        className="block w-full rounded-none pl-12 text-left"
                                      >
                                        {item.ZoneName}（{item.Count}）
                                      </Button>
                                    </List.Item>
                                  )}
                                />
                              ) : null}
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : null}
                  </div>
                </List.Item>
              )}
            />
          </ConfigProvider>
        </div>
      </Resizable>
    </div>
  );
}
