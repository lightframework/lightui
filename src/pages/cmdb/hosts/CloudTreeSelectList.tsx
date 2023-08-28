import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  List,
  MenuProps,
  Switch,
} from 'antd';
import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { ReactNode, useEffect, useMemo, useState } from 'react';

const MIN_WIDTH = 240;
const DEFAULT_WIDTH = 240;

function NodeItem({
  label,
  level,
  onClick,
  childrenList,
}: {
  label: string;
  level: '1' | '2' | '3';
  onClick?: VoidFunction;
  childrenList?: ReactNode;
}) {
  const [showChildrenList, setShowChildrenList] = useState(true);

  return (
    <>
      <div
        className={clsx(
          'flex h-8 w-full cursor-pointer items-center justify-between rounded-none px-3 text-left transition-colors',
          'hover:bg-black/[0.06] hover:text-black/[0.88] active:bg-black/[0.15] active:text-black/[0.88]',
          level === '1' && !label.includes('全部') && 'bg-black/[0.04]',
          level === '2' && 'bg-black/[0.02] pl-8',
          level === '3' && 'pl-12',
        )}
        onClick={onClick}
      >
        <span className="text-ellipsis">{label}</span>

        {level === '3' || label.includes('全部') ? null : (
          <Button
            type="text"
            shape="circle"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowChildrenList((prev) => !prev);
            }}
          >
            {showChildrenList ? <DownOutlined /> : <LeftOutlined />}
          </Button>
        )}
      </div>

      {showChildrenList ? childrenList : null}
    </>
  );
}

export default function CloudTreeSelectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hidden, setHidden] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [hiddenZeroNode, setHiddenZeroNode] = useState(false);

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

  useEffect(() => {
    const cachedWidth = localStorage.getItem('cloud-tree-select-width');
    if (cachedWidth !== null) {
      setWidth(Number.parseInt(cachedWidth));
    }
    const cachedHidden = localStorage.getItem('cloud-tree-select-hidden');
    if (cachedHidden !== null) {
      setHidden(cachedHidden === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cloud-tree-select-hidden', String(hidden));
  }, [hidden]);

  useEffect(() => {
    const cachedHidden = localStorage.getItem(
      'cloud-tree-select-hidden-zero-node',
    );
    if (cachedHidden !== null) {
      setHiddenZeroNode(cachedHidden === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cloud-tree-select-hidden-zero-node',
      String(hiddenZeroNode),
    );
  }, [hiddenZeroNode]);

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
    } else {
      document.getElementById('全部')?.scrollIntoView();
    }
  }, [searchTerm]);

  if (!data) return;

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className="flex w-52 items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <span>隐藏机器数量为0的节点</span>
          <Switch
            checked={hiddenZeroNode}
            onChange={(value) => setHiddenZeroNode(value)}
          />
        </div>
      ),
    },
  ];

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
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">云商区域列表</span>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            arrow
            trigger={['click']}
          >
            <Button type="text" shape="circle">
              <SettingOutlined />
            </Button>
          </Dropdown>
        </div>

        <div className="mt-3 flex h-[calc(100%-40px)] flex-col space-y-2 border border-solid border-gray-100 p-2">
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
              dataSource={
                hiddenZeroNode
                  ? data.filter((cloud) => cloud.Count !== 0)
                  : data
              }
              rowKey="Uid"
              renderItem={(item) => (
                <List.Item id={item.CloudName}>
                  <div className="w-full">
                    <NodeItem
                      label={`${item.CloudName}（${item.Count}）`}
                      level="1"
                      childrenList={
                        item.RegionSet.length !== 0 ? (
                          <List
                            size="small"
                            split={false}
                            dataSource={
                              hiddenZeroNode
                                ? item.RegionSet.filter(
                                    (region) => region.Count !== 0,
                                  )
                                : item.RegionSet
                            }
                            rowKey="Uid"
                            renderItem={(item) => (
                              <List.Item id={item.RegionName}>
                                <div className="w-full">
                                  <NodeItem
                                    label={`${item.RegionName}（${item.Count}）`}
                                    level="2"
                                    childrenList={
                                      item.ZoneSet.length !== 0 ? (
                                        <List
                                          size="small"
                                          split={false}
                                          dataSource={
                                            hiddenZeroNode
                                              ? item.ZoneSet.filter(
                                                  (zone) => zone.Count !== 0,
                                                )
                                              : item.ZoneSet
                                          }
                                          rowKey="Uid"
                                          renderItem={(item) => (
                                            <List.Item id={item.ZoneName}>
                                              <NodeItem
                                                label={`${item.ZoneName}（${item.Count}）`}
                                                level="3"
                                              />
                                            </List.Item>
                                          )}
                                        />
                                      ) : null
                                    }
                                  />
                                </div>
                              </List.Item>
                            )}
                          />
                        ) : null
                      }
                    />
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
