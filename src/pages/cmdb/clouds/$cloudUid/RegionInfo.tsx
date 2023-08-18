import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionUpdateModalForm from './RegionUpdateModalForm';

export default function RegionInfo({
  regionUid,
  onUpdateFinish,
  onDeleteFinish,
}: {
  regionUid: string;
  onUpdateFinish?: VoidFunction;
  onDeleteFinish?: VoidFunction;
}) {
  const { data: region, refresh: refreshRegion } = useRequest(
    () => regionReadOneApiCmdbRegionsByUid({ uid: regionUid }),
    {
      refreshDeps: [regionUid],
    },
  );

  const [showDetails, setShowDetails] = useState(false);

  if (!region) {
    return;
  }

  return (
    <ProDescriptions
      title={
        <div className="flex items-center gap-x-2">
          <span>{region.RegionName}</span>{' '}
          <div className="translate-y-0.5">
            <RegionUpdateModalForm
              regionUid={region.Uid!}
              onFinish={() => {
                refreshRegion();
                onUpdateFinish?.();
              }}
            />
            <RegionDeleteModalForm
              regionUid={region.Uid!}
              region={region.Region}
              regionName={region.RegionName}
              onFinish={onDeleteFinish}
            />
          </div>
        </div>
      }
      column={4}
      className={clsx('bg-[#fafafa] p-3', showDetails && 'space-y-3')}
      extra={
        <Button
          shape="circle"
          type="text"
          icon={showDetails ? <UpOutlined /> : <DownOutlined />}
          onClick={() => setShowDetails((prev) => !prev)}
        />
      }
    >
      {showDetails ? (
        <>
          <ProDescriptions.Item label="区域ID" valueType="text" copyable>
            {region.Region}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="区域状态" valueType="text">
            {region.RegionState}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="备注" valueType="text" span={2}>
            {region.Description}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间" valueType="dateTime">
            {region.createAt}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建者" valueType="text">
            {region.createBy}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="更新时间" valueType="dateTime">
            {region.updateAt}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建者" valueType="text">
            {region.updateBy}
          </ProDescriptions.Item>
        </>
      ) : null}
    </ProDescriptions>
  );
}
