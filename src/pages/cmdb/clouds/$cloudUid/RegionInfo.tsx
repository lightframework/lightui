import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { CopyOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionUpdateModalForm from './RegionUpdateModalForm';

function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}

async function copyContent(id: string) {
  const text = document.getElementById(id)?.innerHTML;

  if (text) {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      } else {
        unsecuredCopyToClipboard(text);
      }
      message.success('复制成功');
    } catch (err) {
      message.error('复制失败');
    }
  }
}

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
          <ProDescriptions.Item label="区域ID" valueType="text">
            <div className="inline-flex items-center gap-x-2">
              <span id="region-info-id">{region.Region}</span>
              <CopyOutlined
                className="text-blue-400"
                onClick={() => copyContent('region-info-id')}
              />
            </div>
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
