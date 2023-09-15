import ErrorPage from '@/components/ui/ErrorPage';
import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import { isObjectEqual } from '@/utils/func';
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from '@umijs/max';
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
import { PlacementInfo } from '.';

const MIN_WIDTH = 300;
const DEFAULT_WIDTH = 300;

function NodeItem({
  label,
  level,
  onClick,
  selected = false,
  childrenList,
}: {
  label: string;
  level: '1' | '2' | '3';
  onClick?: VoidFunction;
  selected?: boolean;
  childrenList?: ReactNode;
}) {
  const [showChildrenList, setShowChildrenList] = useState(false);

  return (
    <>
      <div
        className={clsx(
          'flex h-8 w-full cursor-pointer items-center justify-between rounded-none px-3 text-left transition-colors hover:!bg-[#eaf1fe] hover:!text-[#1677ff]',
          level === '2' && 'pl-8',
          level === '3' && 'pl-12',
          selected && 'bg-[#eaf1fe] text-[#1677ff]',
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
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const cloudUid = searchParams.get('cloudUid') ?? undefined;
  const regionUid = searchParams.get('regionUid') ?? undefined;
  const zoneUid = searchParams.get('zoneUid') ?? undefined;
  const currentPlace: PlacementInfo = {
    cloudUid,
    regionUid,
    zoneUid,
  };

  const { data, isFetching } = useQuery({
    queryKey: ['cloud-tree-select'],
    queryFn: () =>
      cloudPlacementApiCmdbCloudsPlaces({}).then((res) => {
        const all: API.PlaceCloud = {
          Uid: '-1',
          ResourceGroup: '全部',
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

    if (Array.isArray(data)) {
      data.forEach((cloud) => {
        ret.push(cloud.ResourceGroup);
        if (Array.isArray(cloud.RegionSet)) {
          cloud.RegionSet.forEach((region) => {
            ret.push(region.RegionName);
            if (Array.isArray(region.ZoneSet)) {
              region.ZoneSet.forEach((zone) => {
                ret.push(zone.ZoneName);
              });
            }
          });
        }
      });
    }

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

  if (!isFetching && !data) return <ErrorPage>暂无云商</ErrorPage>;

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
          <span className="text-sm font-semibold">云商列表</span>
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
                  ? data?.filter((cloud) => cloud.Count !== 0)
                  : data
              }
              rowKey="Uid"
              renderItem={(cloud) => (
                <List.Item id={cloud.Cloud}>
                  <div className="w-full">
                    <NodeItem
                      label={`${cloud.ResourceGroup}（${cloud.Count}）`}
                      level="1"
                      selected={
                        cloud.Uid === '-1'
                          ? isObjectEqual(currentPlace, {
                              cloudUid: undefined,
                              regionUid: undefined,
                              zoneUid: undefined,
                            })
                          : isObjectEqual(currentPlace, {
                              cloudUid: cloud.Uid,
                              regionUid: undefined,
                              zoneUid: undefined,
                            })
                      }
                      onClick={
                        cloud.Uid === '-1'
                          ? () => navigate('')
                          : () => navigate(`?cloudUid=${cloud.Uid}`)
                      }
                      childrenList={
                        Array.isArray(cloud.RegionSet) &&
                        cloud.RegionSet.length !== 0 ? (
                          <List
                            size="small"
                            split={false}
                            dataSource={
                              hiddenZeroNode
                                ? cloud.RegionSet.filter(
                                    (region) => region.Count !== 0,
                                  )
                                : cloud.RegionSet
                            }
                            rowKey="Uid"
                            renderItem={(region) => (
                              <List.Item id={region.RegionName}>
                                <div className="w-full">
                                  <NodeItem
                                    label={`${region.RegionName}（${region.Count}）`}
                                    level="2"
                                    selected={isObjectEqual(currentPlace, {
                                      cloudUid: cloud.Uid,
                                      regionUid: region.Uid,
                                      zoneUid: undefined,
                                    })}
                                    onClick={() =>
                                      navigate(
                                        `?cloudUid=${cloud.Uid}&regionUid=${region.Uid}`,
                                      )
                                    }
                                    childrenList={
                                      Array.isArray(region.ZoneSet) &&
                                      region.ZoneSet.length !== 0 ? (
                                        <List
                                          size="small"
                                          split={false}
                                          dataSource={
                                            hiddenZeroNode
                                              ? region.ZoneSet.filter(
                                                  (zone) => zone.Count !== 0,
                                                )
                                              : region.ZoneSet
                                          }
                                          rowKey="Uid"
                                          renderItem={(zone) => (
                                            <List.Item id={zone.ZoneName}>
                                              <NodeItem
                                                label={`${zone.ZoneName}（${zone.Count}）`}
                                                level="3"
                                                selected={isObjectEqual(
                                                  currentPlace,
                                                  {
                                                    cloudUid: cloud.Uid,
                                                    regionUid: region.Uid,
                                                    zoneUid: zone.Uid,
                                                  },
                                                )}
                                                onClick={() =>
                                                  navigate(
                                                    `?cloudUid=${cloud.Uid}&regionUid=${region.Uid}&zoneUid=${zone.Uid}`,
                                                  )
                                                }
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
